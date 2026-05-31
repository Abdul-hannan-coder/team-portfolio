import projectsJson from "@/data/projects.json";
import type { Project } from "@/lib/project-data";
import { DEFAULT_PROJECTS } from "@/lib/default-projects";

interface JsonProjectClient {
  name: string;
  feedback?: string;
}

interface JsonProjectItem {
  slug: string;
  platform?: string;
  featured?: boolean;
  rating?: number;
  title: string;
  category: string;
  date?: string;
  client?: JsonProjectClient;
  tags?: string[];
  description: string;
  cardDescription?: string;
  detailedDescription?: string;
  objectives?: string[];
  userJourney?: string[];
  highlights?: string[];
  image?: string[];
  technologies?: string[];
  video?: string | null;
  liveUrl?: string | null;
  domain?: string;
  duration?: string;
}

interface JsonProjectsFile {
  items: JsonProjectItem[];
  archivedItems?: JsonProjectItem[];
}

export interface JsonTestimonial {
  text: string;
  author: string;
  rating: number;
  platform: string;
  country: string;
  link: string;
}

const FALLBACK_IMAGE = "/hero-section2.png";

function mapItemToProject(item: JsonProjectItem, index: number): Project {
  const images = (item.image ?? []).filter(Boolean);
  const cover = images[0] ?? FALLBACK_IMAGE;
  const media = images.map((url) => ({ type: "image" as const, url }));

  return {
    id: index + 1,
    slug: item.slug,
    title: item.title,
    category: item.category,
    description: item.cardDescription ?? item.description,
    fullDescription: item.detailedDescription ?? item.description,
    image: cover,
    media,
    features: item.highlights ?? [],
    duration: item.duration ?? item.date ?? "",
    tech: item.technologies ?? [],
    featured: item.featured ?? false,
    results: item.objectives ?? [],
    client: item.client?.name,
    feedback: item.client?.feedback,
    video: item.video ?? null,
    liveLink: item.liveUrl ?? undefined,
  };
}

/** All projects mapped from src/data/projects.json. */
export function getJsonProjects(): Project[] {
  const data = projectsJson as JsonProjectsFile;
  return (data.items ?? []).map(mapItemToProject);
}

/**
 * Look up a single project by slug. Searches the JSON source first, then falls
 * back to the built-in defaults (e.g. the flagship "postsiva" case study).
 */
export function getJsonProjectBySlug(slug: string): Project | null {
  return (
    getJsonProjects().find((p) => p.slug === slug) ??
    DEFAULT_PROJECTS.find((p) => p.slug === slug) ??
    null
  );
}

/**
 * Real client testimonials pulled from every project's `client.feedback`
 * (active + archived). Identical quotes are de-duplicated.
 */
export function getJsonTestimonials(): JsonTestimonial[] {
  const data = projectsJson as JsonProjectsFile;
  const all = [...(data.items ?? []), ...(data.archivedItems ?? [])];
  const seen = new Set<string>();
  const testimonials: JsonTestimonial[] = [];

  for (const item of all) {
    const feedback = item.client?.feedback?.trim();
    if (!feedback || seen.has(feedback)) continue;
    seen.add(feedback);

    const name = item.client?.name ?? "Verified Client";
    const location = name.match(/\(([^)]+)\)/)?.[1];
    const author = name.replace(/\s*\([^)]*\)\s*/, "").trim() || name;

    testimonials.push({
      text: feedback,
      author,
      rating: Math.round(item.rating ?? 5),
      platform: item.platform ?? item.title,
      country: location ?? item.category,
      link: item.liveUrl ?? "#",
    });
  }

  return testimonials;
}
