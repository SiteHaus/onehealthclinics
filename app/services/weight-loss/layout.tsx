import type { Metadata } from "next";

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Medical Weight Loss Program",
  description:
    "Medically supervised weight loss using Semaglutide (GLP-1) and Tirzepatide in St. George, Utah.",
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
  title: "Medical Weight Loss Program in St. George, UT",
  description:
    "Medically supervised weight loss with Semaglutide and Tirzepatide at OneHealth Clinics in St. George, Utah. GLP-1 programs guided by your primary care provider.",
  alternates: {
    canonical: "https://onehealthclinics.com/services/weight-loss",
  },
  openGraph: {
    title: "Medical Weight Loss Program in St. George, UT | OneHealth Clinics",
    description:
      "Semaglutide and Tirzepatide weight loss programs in St. George, Utah — managed by your primary care provider at OneHealth Clinics.",
    url: "https://onehealthclinics.com/services/weight-loss",
  },
};

export default function WeightLossLayout({
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
