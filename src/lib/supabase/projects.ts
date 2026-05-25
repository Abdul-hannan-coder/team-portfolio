import { DEFAULT_PROJECTS } from "@/lib/default-projects";
import { supabase } from "./client";
import type { Project } from "@/lib/project-data";

interface ProjectRow {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  full_description: string;
  image: string;
  media: { type: "image" | "video"; url: string }[];
  features: string[];
  duration: string;
  tech: string[];
  featured: boolean;
  results: string[];
  client: string | null;
  live_link: string | null;
  github_link: string | null;
  owner_id: string | null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    fullDescription: row.full_description,
    image: row.image,
    media: row.media ?? [],
    features: row.features ?? [],
    duration: row.duration,
    tech: row.tech ?? [],
    featured: row.featured ?? false,
    results: row.results ?? [],
    client: row.client ?? undefined,
    liveLink: row.live_link ?? undefined,
    githubLink: row.github_link ?? undefined,
    ownerId: row.owner_id ?? undefined,
  };
}

function projectToRow(project: Project): Omit<ProjectRow, "id"> {
  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    description: project.description,
    full_description: project.fullDescription,
    image: project.image,
    media: project.media ?? [],
    features: project.features ?? [],
    duration: project.duration,
    tech: project.tech ?? [],
    featured: project.featured ?? false,
    results: project.results ?? [],
    client: project.client ?? null,
    live_link: project.liveLink ?? null,
    github_link: project.githubLink ?? null,
    owner_id: project.ownerId ?? null,
  };
}

/** For public site: all projects. For dashboard: pass options to filter by owner (team member) or show all (admin). */
export async function getProjects(options?: {
  userId?: string;
  role?: string;
  /** When true, return [] if DB is empty/unavailable (dashboard). */
  noFallback?: boolean;
}): Promise<Project[]> {
  if (!supabase) {
    return options?.noFallback ? [] : DEFAULT_PROJECTS;
  }
  let q = supabase.from("projects").select("*").order("id", { ascending: true });
  if (options?.role === "team_member" && options?.userId) {
    q = q.eq("owner_id", options.userId);
  }
  const { data, error } = await q;
  if (error) {
    console.error("[getProjects]", error.message);
    return options?.noFallback ? [] : DEFAULT_PROJECTS;
  }
  let projects = (data ?? []).map(rowToProject);
  if (projects.length === 0 && !options?.noFallback) {
    return DEFAULT_PROJECTS;
  }
  if (!options?.noFallback) {
    projects = mergePostsivaUnifiedProject(projects);
  }
  return projects;
}

/** Keep flagship Postsiva unified product visible with up-to-date copy and imagery. */
function mergePostsivaUnifiedProject(projects: Project[]): Project[] {
  const flagship = DEFAULT_PROJECTS.find((p) => p.slug === "postsiva");
  if (!flagship) return projects;

  const idx = projects.findIndex((p) => p.slug === "postsiva");
  if (idx === -1) {
    return [flagship, ...projects];
  }

  const merged: Project = {
    ...flagship,
    id: projects[idx].id,
    ownerId: projects[idx].ownerId,
  };
  const rest = projects.filter((_, i) => i !== idx);
  return [merged, ...rest];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) {
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[getProjectBySlug]", error.message);
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
  if (data) return rowToProject(data as ProjectRow);
  return DEFAULT_PROJECTS.find((p) => p.slug === slug) ?? null;
}

/** Create a project. Slug is derived from title if not set. ownerId: set for team member (required for RLS). */
export async function createProject(input: {
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  image: string;
  media: { type: "image" | "video"; url: string }[];
  features?: string[];
  duration: string;
  tech: string[];
  featured?: boolean;
  results?: string[];
  client?: string;
  liveLink?: string;
  githubLink?: string;
  slug?: string;
  ownerId?: string | null;
}): Promise<Project> {
  if (!supabase) throw new Error("Supabase not configured");
  const slug = input.slug ?? slugify(input.title);
  const row = {
    slug,
    title: input.title,
    category: input.category,
    description: input.description,
    full_description: input.fullDescription ?? input.description,
    image: input.image,
    media: input.media ?? [],
    features: input.features ?? [],
    duration: input.duration,
    tech: input.tech ?? [],
    featured: input.featured ?? false,
    results: input.results ?? [],
    client: input.client ?? null,
    live_link: input.liveLink ?? null,
    github_link: input.githubLink ?? null,
    owner_id: input.ownerId ?? null,
  };
  const { data, error } = await supabase.from("projects").insert(row).select().single();
  if (error) throw error;
  return rowToProject(data as ProjectRow);
}

/** Update an existing project by id. */
export async function updateProject(project: Project): Promise<Project> {
  if (!supabase) throw new Error("Supabase not configured");
  const { id, ...rest } = project;
  const row = projectToRow({ ...rest, id });
  const { data, error } = await supabase
    .from("projects")
    .update({ ...row, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return rowToProject(data as ProjectRow);
}

/** Delete a project by id. */
export async function deleteProject(id: number): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
