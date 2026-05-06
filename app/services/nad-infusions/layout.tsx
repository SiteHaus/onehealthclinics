import type { Metadata } from "next";

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "NAD+ Infusions",
  description:
    "NAD+ IV infusion therapy for cellular energy, longevity, and brain health in St. George, Utah.",
  procedureType: "IV Infusion",
  provider: {
    "@type": "MedicalClinic",
    name: "OneHealth Clinics",
    url: "https://onehealthclinics.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "292 S 1470 E #200",
      addressLocality: "St. George",
      addressRegion: "UT",
      postalCode: "84790",
      addressCountry: "US",
    },
  },
});

export const metadata: Metadata = {
  title: "NAD+ Infusions in St. George, UT",
  description:
    "NAD+ IV infusion therapy at OneHealth Clinics in St. George, Utah. Boost cellular energy, support DNA repair, and improve mental clarity.",
  alternates: {
    canonical: "https://onehealthclinics.com/services/nad-infusions",
  },
  openGraph: {
    title: "NAD+ Infusions in St. George, UT | OneHealth Clinics",
    description:
      "NAD+ IV therapy in St. George, Utah. Cellular energy, longevity support, and brain health — at OneHealth Clinics.",
    url: "https://onehealthclinics.com/services/nad-infusions",
  },
};

export default function NadInfusionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceSchema }} // Safe: static hardcoded object, not user input
      />
      {children}
    </div>
  );
}
