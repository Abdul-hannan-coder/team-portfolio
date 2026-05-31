import { Navbar } from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import { Services } from "@/components/sections/Services";
import { ServicesPortfolioShell } from "@/components/sections/ServicesPortfolioShell";
import { TechStack } from "@/components/sections/TechStack";
import { Team } from "@/components/sections/Team";
import { Portfolio } from "@/components/sections/Portfolio";
import { Certificates } from "@/components/sections/Certificates";
import { TestimonialsAndFAQ } from "@/components/sections/TestimonialsAndFAQ";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";
import { getJsonProjects } from "@/lib/json-projects";
import { getAllMembersCertificates } from "@/lib/landing-data";

export default async function Home() {
  const [projects, certificates] = await Promise.all([
    Promise.resolve(getJsonProjects()),
    getAllMembersCertificates(),
  ]);
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ServicesPortfolioShell>
          <Services />
          <Portfolio projects={projects} limit={6} />
        </ServicesPortfolioShell>
        <TechStack />
        <Team />
        <Certificates certificates={certificates} />
        <TestimonialsAndFAQ />
      </div>
      <div className="relative z-10 w-full bg-[#030303]">
        <ContactAndFooter />
      </div>
    </main>
  );
}
