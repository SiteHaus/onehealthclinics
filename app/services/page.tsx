"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ─── Data ────────────────────────────────────────────────────────────────────

const clinicServices = [
  {
    id: "primary-care",
    title: "Primary Care",
    label: "Clinic Services",
    image: "/doctor-body.jpg",
    imageAlt: "Primary care services",
    description:
      "We are specially trained to solve puzzling diagnostic problems and manage everything from simple acute illnesses to complex chronic conditions. We provide comprehensive primary care for patients from newborn through senior years, specializing in diabetes, high blood pressure, heart disease, anxiety and depression, weight management, thyroid disorders, arthritis, autoimmune diseases, and osteoporosis. Our philosophy emphasizes patient education and wellness through proper nutrition, exercise, and lifestyle changes.",
  },
  {
    id: "dermatology",
    title: "Office Dermatology",
    label: "Clinic Services",
    image: "/magglass.jpg",
    imageAlt: "Dermatology services",
    description:
      "We diagnose and manage a wide range of dermatological concerns right in our practice — from routine skin checks to treating common skin conditions, without the need for lengthy specialist referrals. We treat pre-cancerous skin lesions with liquid nitrogen and perform minor procedures such as skin biopsies, mole removals, and cyst excisions, along with cancer surveillance and prevention screening.",
  },
  {
    id: "womens-health",
    title: "Women's Health",
    label: "Clinic Services",
    image: "/huzzah.jpg",
    imageAlt: "Women's health services",
    description:
      "We provide complete women's health services from adolescence through menopause and beyond, focusing on prevention, early detection, and personalized treatment. Services include mammograms, Pap smears, skin cancer checks, routine gynecological care, breast health monitoring, osteoporosis screening, and heart disease prevention. We offer comprehensive hormone replacement therapy for menopause symptoms and support everything from contraception and fertility planning to managing menopause naturally or with hormone therapy.",
  },
  {
    id: "mens-health",
    title: "Men's Health",
    label: "Clinic Services",
    image: "/guy-smiling.jpg",
    imageAlt: "Men's health services",
    description:
      "We provide complete men's health services focused on keeping you strong, active, and feeling your best throughout every stage of life. Our program specializes in musculoskeletal care — treating back pain, joint stiffness, sports injuries, and arthritis — as well as testosterone replacement therapy for men experiencing low energy, decreased muscle mass, low libido, mood changes, or difficulty concentrating. We make it easy to address both acute problems and long-term health optimization in a practical, no-nonsense environment.",
  },
  {
    id: "birth-control",
    title: "Birth Control Options",
    label: "Clinic Services",
    image: "/bc.png",
    imageAlt: "Birth control options",
    description:
      "We specialize in providing and managing Long-Acting Reversible Contraceptives (LARCs), among the most effective forms of birth control available. Options include Liletta IUD (up to 8 years), Kyleena IUD (up to 5 years), and the Nexplanon contraceptive implant (up to 4 years). We're dedicated to helping you find a safe and effective option that aligns with your health needs and lifestyle, with thorough counseling at every step.",
  },
];

const specialtyServices = [
  {
    id: "weight-loss",
    title: "Weight Loss Program",
    label: "Specialty Services",
    image: "/weight.png",
    imageAlt: "Weight loss program",
    description:
      "As your primary care provider, we guide your weight loss journey with full knowledge of your medical history and current medications. We offer Semaglutide (GLP-1 RA) and Tirzepatide (dual GIP/GLP-1 agonist) to reduce appetite, slow gastric emptying, and improve insulin sensitivity. We also offer Lipo Mino injections alongside these medications — a lipotropics and B-vitamin blend to further boost fat burning and energy levels.",
  },
  {
    id: "hrt",
    title: "Hormone Pellet / Replacement Therapy",
    label: "Specialty Services",
    image: "/zen.jpg",
    imageAlt: "Hormone replacement therapy",
    description:
      "We have completed additional training in bioidentical hormone replacement therapy and pellet therapy. HRT helps restore hormonal balance when your body's natural production declines, relieving symptoms such as fatigue, mood changes, weight gain, sleep disturbances, and low libido. Available in topical, oral, injectable, and pellet forms, HRT supports improved energy, mental clarity, and overall well-being.",
  },
  {
    id: "nad-infusions",
    title: "NAD+ Infusions",
    label: "Specialty Services",
    image: "/nad.png",
    imageAlt: "NAD+ infusions",
    description:
      "NAD+ is a vital coenzyme found in every cell, playing a central role in energy production and cellular health. It assists mitochondria in converting nutrients into ATP and supports DNA repair by activating sirtuins — proteins that regulate metabolism, cell survival, and inflammation. NAD+ also helps regulate gene expression, modulate neurotransmitters, and control inflammation, making it a key component for cellular longevity.",
  },
  {
    id: "vitamin-infusions",
    title: "Vitamin Infusions",
    label: "Specialty Services",
    image: "/vitinf.jpg",
    imageAlt: "IV vitamin infusion therapy",
    description:
      "We offer a wide range of IV Therapy services to boost your immune system, reduce toxin load and inflammation, increase energy, and allow fast, deep hydration. Each treatment contains a unique combination of nutrients crafted to promote overall wellness. As your primary care provider, we determine which treatment is best for you and ensure it won't interact with your current medications.",
  },
  {
    id: "vitamin-injections",
    title: "Vitamin Injections",
    label: "Specialty Services",
    image: "/vitinj.png",
    imageAlt: "Vitamin injections",
    description:
      "Our intramuscular injections are crafted to target a spectrum of wellness concerns. Options include Vitamin D3 (mood, hormone balance, bone health), Pure Beauty (hair, skin, and nails), Lipo-Mino (fat breakdown and energy), Immune Defense (reduce illness duration), and Detox (supports breakdown of sugars, carbs, and fats while aiding mood and cognitive function).",
  },
  {
    id: "prp",
    title: "PRP & Hyaluronic Acid Joint Injections",
    label: "Specialty Services",
    image: "prp.webp",
    imageAlt: "PRP joint injections",
    description:
      "Platelet-rich plasma (PRP) injections accelerate healing, reduce pain, and enhance tissue regeneration by concentrating platelets loaded with growth factors. Combined with hyaluronic acid, these injections improve tendinitis, osteoarthritis, joint pain, muscle strains, and ligament injuries — offering a natural path to restored mobility that can help avoid or delay surgery.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionAccent() {
  return <div className="w-10 h-1 bg-heading rounded-full mb-4" />;
}

function ServiceCard({
  service,
  imageLeft,
}: {
  service: (typeof clinicServices)[0];
  imageLeft: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${
        imageLeft ? "md:flex-row" : "md:flex-row-reverse"
      } gap-10 items-center`}
    >
      {/* Image */}
      <div className="w-full md:w-2/5 rounded-2xl overflow-hidden shadow-md aspect-[4/3] flex-shrink-0">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {service.label}
        </p>
        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {service.description}
        </p>
      </div>
    </div>
  );
}

function SpecialtyCard({
  service,
}: {
  service: (typeof specialtyServices)[0];
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <div className="aspect-video overflow-hidden">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {service.label}
        </p>
        <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {service.description}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="w-full text-white">
      {/* ── Hero ── */}
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
            What We Offer
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">
            Our Services
          </h1>
          <p className="max-w-2xl text-white/80 text-lg leading-relaxed">
            From everyday primary care to advanced specialty treatments, One
            Health Clinic provides comprehensive, personalized care for every
            stage of life — all under one roof.
          </p>
        </div>
      </section>

      {/* ── Quick Nav ── */}
      <section className="bg-white border-b border-gray-100 px-6 py-6 sticky top-16 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3">
          {[
            { label: "Primary Care", href: "#primary-care" },
            { label: "Dermatology", href: "#dermatology" },
            { label: "Women's Health", href: "#womens-health" },
            { label: "Men's Health", href: "#mens-health" },
            { label: "Birth Control", href: "#birth-control" },
            { label: "Weight Loss", href: "#weight-loss" },
            { label: "Hormone Therapy", href: "#hrt" },
            { label: "NAD+ Infusions", href: "#nad-infusions" },
            { label: "Vitamin Infusions", href: "#vitamin-infusions" },
            { label: "Vitamin Injections", href: "#vitamin-injections" },
            { label: "PRP Injections", href: "#prp" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── Clinic Services ── */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-20">
          <div>
            <SectionAccent />
            <h2 className="text-2xl font-bold">Clinic Services</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Comprehensive primary and preventive care for patients of every
              age, from newborns through seniors.
            </p>
          </div>

          {clinicServices.map((service, i) => (
            <div key={service.id} id={service.id}>
              <ServiceCard service={service} imageLeft={i % 2 === 0} />
              {i < clinicServices.length - 1 && (
                <div className="border-b border-gray-100 mt-20" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider Banner ── */}
      <section className="bg-hero-bg py-16 px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-4">
          <SectionAccent />
          <h2 className="text-2xl font-bold text-white">Specialty Services</h2>
          <p className="text-white/80 text-sm max-w-xl">
            Advanced treatments and wellness programs that go beyond standard
            primary care — available right here at OneHealth Clinic.
          </p>
        </div>
      </section>

      {/* ── Specialty Services Grid ── */}
      <section className="bg-gray-50 text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialtyServices.map((service) => (
              <div key={service.id} id={service.id}>
                <SpecialtyCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
