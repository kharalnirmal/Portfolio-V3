import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import { CinematicFooter } from "@/components/footer/motion-footer";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Preloader from "@/components/preloader/Preloader";
import LogoCloudBlock from "@/components/ui/logo-cloud-3";
import Work from "@/components/work/Work";
import {
  profileUrls,
  siteDescription,
  siteName,
  siteRole,
  siteUrl,
} from "./seo";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}/profile/NirmalKHaral.jpg`,
      jobTitle: siteRole,
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Lumbini",
        addressCountry: "Nepal",
      },
      sameAs: [
        profileUrls.github,
        profileUrls.linkedin,
        profileUrls.instagram,
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Full-stack development",
        "Frontend development",
        "Backend development",
        "Authentication",
        "Database design",
        "Deployment",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      inLanguage: "en",
      publisher: { "@id": personId },
      creator: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: siteName,
      mainEntity: { "@id": personId },
      isPartOf: { "@id": websiteId },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <Preloader />

      <div className="relative">
        <Hero />
        <About />
      </div>
      <LogoCloudBlock />
      <Work />
      <Experience />

      <CinematicFooter />
    </main>
  );
}
