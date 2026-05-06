import type { Metadata } from "next";

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Hormone Replacement Therapy",
  description:
    "Bioidentical hormone replacement therapy and pellet therapy in St. George, Utah.",
  relevantSpecialty: "Endocrinology",
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
  title: "Hormone Replacement Therapy in St. George, UT",
  description:
    "Bioidentical hormone replacement therapy and pellet therapy at OneHealth Clinics in St. George, Utah. Relieve fatigue, mood changes, low libido, and weight gain.",
  alternates: {
    canonical: "https://onehealthclinics.com/services/hormone-therapy",
  },
  openGraph: {
    title: "Hormone Replacement Therapy in St. George, UT | OneHealth Clinics",
    description:
      "Bioidentical HRT and pellet therapy in St. George, Utah. Restore hormonal balance with personalized care at OneHealth Clinics.",
    url: "https://onehealthclinics.com/services/hormone-therapy",
  },
};

export default function HormoneTherapyLayout({
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
