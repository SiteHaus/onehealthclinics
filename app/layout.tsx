import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navigation/Navbar";
import { NavbarLinkType } from "@/components/shared/navigation/NavbarLink";
import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";

const funnel_display = Funnel_Display({
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = "https://onehealthclinics.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OneHealth Clinics | Primary Care in St. George, Utah",
    template: "%s | OneHealth Clinics",
  },
  description:
    "OneHealth Clinics offers same-day primary care appointments in St. George, Utah. New patients always welcome. Most insurance accepted. Call 435-688-0759.",
  keywords: [
    "primary care St. George Utah",
    "family medicine St. George",
    "same-day appointments",
    "pediatrics St. George Utah",
    "urgent care St. George",
    "OneHealth Clinics",
    "family doctor St. George",
  ],
  authors: [{ name: "OneHealth Clinics" }],
  creator: "OneHealth Clinics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "OneHealth Clinics",
    title: "OneHealth Clinics | Primary Care in St. George, Utah",
    description:
      "Same-day primary care, pediatrics, dermatology, women's health, and more in St. George, Utah. New patients always welcome.",
    images: [
      {
        url: "/office.jpg",
        width: 1200,
        height: 630,
        alt: "OneHealth Clinics office in St. George, Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneHealth Clinics | Primary Care in St. George, Utah",
    description:
      "Same-day primary care, pediatrics, and specialty services in St. George, Utah.",
    images: ["/office.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const mainLinks: NavbarLinkType[] = [
  { name: "Home", target: "/" },
  { name: "About Us", target: "/about" },
  { name: "Shop", target: "/shop" },
  { name: "Pediatrics", target: "/pediatrics" },
  { name: "Services", target: "/services" },
  { name: "Contact", target: "/contact" },
];

// Static hardcoded object — no user input, no XSS risk
const localBusinessSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "OneHealth Clinics",
  url: siteUrl,
  telephone: "+1-435-688-0759",
  image: `${siteUrl}/office.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "St. George",
    addressRegion: "UT",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.0965,
    longitude: -113.5684,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  medicalSpecialty: [
    "Family Medicine",
    "Pediatrics",
    "Dermatology",
    "Women's Health",
  ],
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/onehealthclinics",
    "https://www.instagram.com/onehealthclinics",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // Safe: content is a static hardcoded object, not user input
          dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
        />
      </head>
      <body className={`${funnel_display.className} antialiased`}>
        <Navbar links={mainLinks} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
