import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pediatrics",
  description:
    "Expert pediatric care for children of all ages at OneHealth Clinics in St. George, Utah. Well-child visits, immunizations, sports physicals, and developmental care.",
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
    title: "Pediatrics | OneHealth Clinics",
    description:
      "Trusted pediatric care in St. George, Utah. Well-child exams, vaccines, sports physicals, and developmental support for children of all ages.",
    url: "https://onehealthclinics.com/pediatrics",
  },
};

export default function PediatricsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-auto">{children}</div>;
}
