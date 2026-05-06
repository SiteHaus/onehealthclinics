import type { Metadata } from "next";

const siteUrl = "https://onehealthclinics.com";

const worksFor = {
  "@type": "MedicalClinic",
  name: "OneHealth Clinics",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "292 S 1470 E #200",
    addressLocality: "St. George",
    addressRegion: "UT",
    postalCode: "84790",
    addressCountry: "US",
  },
};

const providersSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      name: "Grace Paradela, M.D.",
      medicalSpecialty: ["Internal Medicine", "Acupuncture", "Obesity Medicine"],
      areaServed: "St. George, UT",
      image: `${siteUrl}/grace.png`,
      worksFor,
      url: `${siteUrl}/about#grace-paradela`,
    },
    {
      "@type": "Physician",
      name: "Jonathan Baza, DO",
      medicalSpecialty: ["Family Medicine", "Sports Medicine", "Dermatology", "Women's Health"],
      areaServed: "St. George, UT",
      image: `${siteUrl}/baza.png`,
      worksFor,
      url: `${siteUrl}/about#jonathan-baza`,
    },
    {
      "@type": "Physician",
      name: "Carl Turner, DO",
      medicalSpecialty: ["Family Medicine", "Pediatrics"],
      areaServed: "St. George, UT",
      image: `${siteUrl}/turner.png`,
      worksFor,
      url: `${siteUrl}/about#carl-turner`,
    },
    {
      "@type": "Physician",
      name: "Stacy Sumpter, DNP-C",
      medicalSpecialty: ["Women's Health", "Hormone Replacement Therapy"],
      areaServed: "St. George, UT",
      image: `${siteUrl}/sumpter.png`,
      worksFor,
      url: `${siteUrl}/about#stacy-sumpter`,
    },
    {
      "@type": "Physician",
      name: "Adam Dye, FNP-C",
      medicalSpecialty: "Family Medicine",
      areaServed: "St. George, UT",
      image: `${siteUrl}/dye.png`,
      worksFor,
      url: `${siteUrl}/about#adam-dye`,
    },
    {
      "@type": "Physician",
      name: "Jacob Ewell, DNP-FNP",
      medicalSpecialty: "Family Medicine",
      areaServed: "St. George, UT",
      image: `${siteUrl}/ewell.png`,
      worksFor,
      url: `${siteUrl}/about#jacob-ewell`,
    },
    {
      "@type": "Physician",
      name: "Noah Yoshida, PA-C",
      medicalSpecialty: ["Dermatology", "Cardiology", "Oncology"],
      areaServed: "St. George, UT",
      image: `${siteUrl}/yoshida.png`,
      worksFor,
      url: `${siteUrl}/about#noah-yoshida`,
    },
  ],
});

export const metadata: Metadata = {
  title: "Our Medical Team in St. George, UT",
  description:
    "Meet the providers at OneHealth Clinics in St. George, Utah — Dr. Grace Paradela, Dr. Jonathan Baza, Dr. Carl Turner, Stacy Sumpter DNP-C, Adam Dye FNP-C, Jacob Ewell DNP-FNP, and Noah Yoshida PA-C.",
  alternates: {
    canonical: "https://onehealthclinics.com/about",
  },
  openGraph: {
    title: "Our Medical Team in St. George, UT | OneHealth Clinics",
    description:
      "Meet our team of experienced providers in St. George, Utah — from family medicine to pediatrics, internal medicine, and specialty care.",
    url: "https://onehealthclinics.com/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: providersSchema }} // Safe: static hardcoded object, not user input
      />
      {children}
    </div>
  );
}
