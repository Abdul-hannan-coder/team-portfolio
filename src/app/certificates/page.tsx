import { Navbar } from "@/components/sections/Navbar";
import { Certificates } from "@/components/sections/Certificates";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";
import { getAllMembersCertificates } from "@/lib/landing-data";

export const metadata = {
  title: "All Certifications | Postsiva Tech",
  description: "Browse all our team certifications.",
};

export default async function CertificatesPage() {
  const certificates = await getAllMembersCertificates();
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="relative z-10">
        <Navbar />
        <Certificates certificates={certificates} fullPage />
      </div>
      <div className="relative z-10 w-full bg-[#030303]">
        <ContactAndFooter />
      </div>
    </main>
  );
}
