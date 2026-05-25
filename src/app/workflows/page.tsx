import { Navbar } from "@/components/sections/Navbar";
import { N8nWorkflows } from "@/components/sections/N8nWorkflows";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";

export const metadata = {
  title: "All n8n Workflows | Postsiva Tech",
  description: "Browse all our n8n workflow automations.",
};

export default function WorkflowsPage() {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="relative z-10">
        <Navbar />
        <N8nWorkflows fullPage />
      </div>
      <div className="relative z-10 w-full bg-[#030303]">
        <ContactAndFooter />
      </div>
    </main>
  );
}
