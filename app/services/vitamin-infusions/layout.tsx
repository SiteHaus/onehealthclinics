import type { Metadata } from "next";

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "IV Vitamin Infusions",
  description:
    "IV vitamin infusion therapy for immune support, hydration, and energy in St. George, Utah.",
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
  title: "IV Vitamin Infusions in St. George, UT",
  description:
    "IV vitamin infusion therapy at OneHealth Clinics in St. George, Utah. Boost immunity, reduce inflammation, increase energy, and hydrate fast.",
  alternates: {
    canonical: "https://onehealthclinics.com/services/vitamin-infusions",
  },
  openGraph: {
    title: "IV Vitamin Infusions in St. George, UT | OneHealth Clinics",
    description:
      "IV therapy in St. George, Utah. Immune support, deep hydration, and energy — customized by your primary care provider at OneHealth Clinics.",
    url: "https://onehealthclinics.com/services/vitamin-infusions",
  },
};

export default function VitaminInfusionsLayout({
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
