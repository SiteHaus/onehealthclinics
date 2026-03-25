import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "OneHealth Clinics offers primary care, dermatology, women's health, men's health, weight loss, hormone replacement therapy, NAD+ infusions, and more in St. George, Utah.",
  keywords: [
    "primary care St. George",
    "dermatology St. George Utah",
    "women's health St. George",
    "men's health St. George",
    "weight loss clinic St. George",
    "hormone replacement therapy Utah",
    "NAD+ infusions St. George",
    "vitamin infusions St. George",
    "PRP injections St. George",
  ],
  alternates: {
    canonical: "https://onehealthclinics.com/services",
  },
  openGraph: {
    title: "Services | OneHealth Clinics",
    description:
      "Comprehensive clinic and specialty services in St. George, Utah — primary care, dermatology, women's health, weight loss, HRT, infusions, and more.",
    url: "https://onehealthclinics.com/services",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-auto">{children}</div>;
}
