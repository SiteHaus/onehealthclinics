import type { Metadata } from "next";

const physicianSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Carl Turner, DO",
  medicalSpecialty: "Pediatrics",
  areaServed: "St. George, UT",
  worksFor: {
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
  url: "https://onehealthclinics.com/pediatrics",
});

export const metadata: Metadata = {
  title: "Pediatric Care in St. George, UT",
  description:
    "Formerly Dixie Primary Care (Dixie Pediatrics) — now OneHealth Clinics. Expert pediatric care in St. George, Utah. Well-child visits, immunizations, sports physicals, and same-day urgent care for kids.",
  keywords: [
    "pediatrics St. George Utah",
    "child doctor St. George",
    "well-child visits",
    "kids doctor St. George Utah",
    "pediatrician St. George",
    "children's health St. George",
    "immunizations St. George",
    "sports physicals St. George",
  ],
  alternates: {
    canonical: "https://onehealthclinics.com/pediatrics",
  },
  openGraph: {
    title: "Pediatric Care in St. George, UT | OneHealth Clinics",
    description:
      "Trusted pediatric care in St. George, Utah. Well-child exams, vaccines, sports physicals, and developmental support for children of all ages.",
    url: "https://onehealthclinics.com/pediatrics",
  },
};

export default function PediatricsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: physicianSchema }} // Safe: static hardcoded object, not user input
      />
      {children}
    </div>
  );
}
