export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  media: { type: "image" | "video"; url: string }[];
  features: string[];
  duration: string;
  tech: string[];
  featured?: boolean;
  results: string[];
  client?: string;
  /** Client testimonial / feedback quote. */
  feedback?: string;
  /** Demo video — an embed URL, or raw HTML embed (e.g. an <iframe> block). */
  video?: string | null;
  liveLink?: string;
  githubLink?: string;
  /** Set when project is owned by a team member; null for legacy or admin-created. */
  ownerId?: string | null;
};
