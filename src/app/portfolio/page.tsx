import { Navbar } from "@/components/sections/Navbar";
import { Portfolio } from "@/components/sections/Portfolio";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";
import { getProjects } from "@/lib/supabase/projects";

export const metadata = {
  title: "All Projects | Portfolio",
  description: "Browse all our projects and case studies.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="relative z-10">
        <Navbar />
        <Portfolio projects={projects} fullPage />
      </div>
      <div className="relative z-10 w-full bg-[#030303]">
        <ContactAndFooter />
      </div>
    </main>
  );
}
