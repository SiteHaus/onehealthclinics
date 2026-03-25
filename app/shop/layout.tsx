import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop supplements and wellness products recommended by the providers at OneHealth Clinics in St. George, Utah.",
  alternates: {
    canonical: "https://onehealthclinics.com/shop",
  },
  openGraph: {
    title: "Shop | OneHealth Clinics",
    description:
      "Browse provider-recommended supplements and wellness products from OneHealth Clinics.",
    url: "https://onehealthclinics.com/shop",
  },
};

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-auto">{children}</div>;
}
