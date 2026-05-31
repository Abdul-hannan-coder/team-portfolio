import type { Project } from "@/lib/project-data";

/** Shown when Supabase is not configured or the projects table is empty */
export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    slug: "postsiva",
    title: "Postsiva — Unified Social OS",
    category: "SaaS · Social Automation",
    description:
      "Publish everywhere from one canvas—LinkedIn, Meta, TikTok, calendar, inbox, AI toolkit, WhatsApp, and MCP.",
    fullDescription:
      "Postsiva is a unified social media operating system: connect accounts once, compose with live network previews, schedule on a shared calendar, and manage comments from one inbox. Teams run drafts and approvals over WhatsApp, use the mobile app on the go, and extend workflows via ChatGPT Apps and MCP—while AI personas stay grounded in each workspace.",
    image: "/projects/postsiva-unified.png",
    media: [
      { type: "image", url: "/projects/postsiva-unified.png" },
      { type: "image", url: "https://storage.postsiva.com/uploads/6999af498d36c_1771679561.png" },
    ],
    features: [
      "10+ social channels from one composer",
      "Live previews per network before publish",
      "Workspace-per-brand with roles and permissions",
      "Unified inbox and auto-commenting",
      "WhatsApp bridge for drafts and approvals",
      "ChatGPT Apps + MCP for agent workflows",
      "Piva AI agent inside each workspace",
    ],
    duration: "Ongoing",
    tech: ["Next.js", "FastAPI", "Python", "PostgreSQL", "AI", "MCP", "WhatsApp API"],
    featured: true,
    results: [
      "Single cockpit replaces multi-tab native posting",
      "OAuth-scoped tokens per workspace and network",
      "AI-assisted compose with per-channel crops and copy",
    ],
    video: "https://www.youtube.com/embed/RPD0jyw-NpY?si=2b9pz_vTeaZ1H97D",
    liveLink: "https://postsiva.com/",
  },
  {
    id: 2,
    slug: "postsiva-facebook-automation",
    title: "Postsiva – Facebook Automation",
    category: "Backend Development",
    description:
      "Facebook automation for smarter growth—engagement, targeting, and analytics.",
    fullDescription:
      "Next-generation Facebook automation platform for faster, smarter growth.",
    image: "https://storage.postsiva.com/uploads/6999af50e9d95_1771679568.jpeg",
    media: [{ type: "image", url: "https://storage.postsiva.com/uploads/6999af50e9d95_1771679568.jpeg" }],
    features: [],
    duration: "",
    tech: ["FastAPI", "Python", "Next.js", "AI"],
    featured: true,
    results: [],
    liveLink: "https://facebook.postsiva.com/",
  },
  {
    id: 3,
    slug: "postsiva-youtube-automation",
    title: "Postsiva – YouTube Automation",
    category: "Backend Development",
    description:
      "YouTube automation with AI titles, descriptions, thumbnails, and scheduling.",
    fullDescription:
      "YouTube automation platform that streamlines content creation and channel growth.",
    image: "https://storage.postsiva.com/uploads/6999af5200c07_1771679570.jpeg",
    media: [{ type: "image", url: "https://storage.postsiva.com/uploads/6999af5200c07_1771679570.jpeg" }],
    features: [],
    duration: "",
    tech: ["FastAPI", "Python", "Next.js", "AI"],
    featured: true,
    results: [],
    liveLink: "https://youtube.postsiva.com/",
    githubLink: "https://github.com/muhammad-uzair-yasin/",
  },
  {
    id: 4,
    slug: "postsiva-linkedin-automation",
    title: "Postsiva – LinkedIn Automation",
    category: "Backend Development",
    description:
      "LinkedIn growth platform with AI content for profiles and company pages.",
    fullDescription:
      "LinkedIn automation and growth platform to grow presence faster and smarter.",
    image: "https://storage.postsiva.com/uploads/6999af53709dd_1771679571.png",
    media: [{ type: "image", url: "https://storage.postsiva.com/uploads/6999af53709dd_1771679571.png" }],
    features: [],
    duration: "",
    tech: ["FastAPI", "Python", "LinkedIn API", "AI"],
    featured: true,
    results: [],
    liveLink: "https://linkedin.postsiva.com/",
  },
  {
    id: 5,
    slug: "agentia-ai-base-website",
    title: "Agentia (AI base website)",
    category: "Web Development",
    description:
      "AI tools showcase with Gemini integration, Python backend, and Tailwind UI.",
    fullDescription:
      "A complete website featuring AI tools and projects with GeminiAI integration.",
    image: "https://storage.postsiva.com/uploads/6999af451d02e_1771679557.png",
    media: [{ type: "image", url: "https://storage.postsiva.com/uploads/6999af451d02e_1771679557.png" }],
    features: [],
    duration: "",
    tech: ["GeminiAI", "Python", "Tailwind CSS"],
    featured: false,
    results: [],
    liveLink: "https://uzair-devops.github.io/Agentia/",
    githubLink: "https://github.com/Uzair-DeVops/Agentia",
  },
  {
    id: 6,
    slug: "mobocheck-platform",
    title: "MoboCheck Platform",
    category: "Web Development",
    description:
      "Enterprise multi-role dashboard with React, TypeScript, and Casbin permissions.",
    fullDescription:
      "Full-stack, multi-role enterprise dashboard built with React and TypeScript.",
    image: "https://storage.postsiva.com/uploads/6999af550ac7c_1771679573.png",
    media: [{ type: "image", url: "https://storage.postsiva.com/uploads/6999af550ac7c_1771679573.png" }],
    features: [],
    duration: "",
    tech: ["React", "Node.js", "MySQL", "Casbin"],
    featured: false,
    results: [],
    liveLink: "https://mobocheck.com",
  },
];
