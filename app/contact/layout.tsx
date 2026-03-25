import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact OneHealth Clinics in St. George, Utah. Call us at 435-688-0759 or send a message online. Same-day appointments available.",
  alternates: {
    canonical: "https://onehealthclinics.com/contact",
  },
  openGraph: {
    title: "Contact Us | OneHealth Clinics",
    description:
      "Get in touch with OneHealth Clinics in St. George, Utah. Call 435-688-0759 or reach out online.",
    url: "https://onehealthclinics.com/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-auto">{children}</div>;
}
