import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the dedicated providers at OneHealth Clinics in St. George, Utah — committed to compassionate, accessible care for every patient.",
  alternates: {
    canonical: "https://onehealthclinics.com/about",
  },
  openGraph: {
    title: "About Us | OneHealth Clinics",
    description:
      "Meet our team of experienced providers in St. George, Utah — from family medicine to pediatrics and specialty care.",
    url: "https://onehealthclinics.com/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-auto">{children}</div>;
}
