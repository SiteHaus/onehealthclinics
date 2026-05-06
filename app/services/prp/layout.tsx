import type { Metadata } from "next";

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "PRP & Hyaluronic Acid Joint Injections",
  description:
    "Platelet-rich plasma and hyaluronic acid joint injections for pain relief and tissue regeneration in St. George, Utah.",
  procedureType: "Injection",
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
  title: "PRP & Joint Injections in St. George, UT",
  description:
    "Platelet-rich plasma (PRP) and hyaluronic acid joint injections at OneHealth Clinics in St. George, Utah. Treat arthritis, tendinitis, and joint pain naturally.",
  alternates: {
    canonical: "https://onehealthclinics.com/services/prp",
  },
  openGraph: {
    title: "PRP & Joint Injections in St. George, UT | OneHealth Clinics",
    description:
      "PRP and hyaluronic acid injections in St. George, Utah. Natural pain relief for joint pain, tendinitis, and osteoarthritis at OneHealth Clinics.",
    url: "https://onehealthclinics.com/services/prp",
  },
};

export default function PrpLayout({
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
