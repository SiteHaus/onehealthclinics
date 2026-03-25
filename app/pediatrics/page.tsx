"use client";

import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const developmentHandouts = [
  {
    label: "Newborn",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/Newborn-Handout.pdf",
  },
  {
    label: "1 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/1-month-Handout.pdf",
  },
  {
    label: "2 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/2-month-Handout.pdf",
  },
  {
    label: "4 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/4-month-Handout.pdf",
  },
  {
    label: "6 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/6-month-Handout.pdf",
  },
  {
    label: "9 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/9-month-Handout.pdf",
  },
  {
    label: "12 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/12-month-Handout.pdf",
  },
  {
    label: "15 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/15-month-Handout.pdf",
  },
  {
    label: "18 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/18-month-Handout.pdf",
  },
  {
    label: "24 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/24-month-Handout.pdf",
  },
  {
    label: "30 Month",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/30-month-Handout.pdf",
  },
  {
    label: "3 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/3-year-Handout.pdf",
  },
  {
    label: "4 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/4-year-Handout.pdf",
  },
  {
    label: "5–6 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/5-6-year-Handout.pdf",
  },
  {
    label: "7–8 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/7-8-year-Handout.pdf",
  },
  {
    label: "9–10 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/9-10-year-Handout.pdf",
  },
  {
    label: "11–14 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/11-14-year-Handout.pdf",
  },
  {
    label: "15–17 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/15-17-year-Handout.pdf",
  },
  {
    label: "18–21 Year",
    href: "https://onehealthclinics.com/wp-content/uploads/2025/11/18-21-year-Handout.pdf",
  },
];

const services = [
  {
    id: "well-child",
    title: "Well Child Checks",
    description:
      "Well Child Checks are the cornerstone of pediatric preventive care. These routine appointments — scheduled from infancy through adolescence — monitor your child's physical and developmental journey. We track growth milestones, conduct preventive screenings (vision, hearing, mental health), administer vaccinations, and provide personalized guidance on nutrition, sleep, and safety.",
  },
  {
    id: "immunizations",
    title: "Immunizations",
    description:
      "Immunizations are one of the most effective tools in modern medicine. We provide comprehensive vaccination services for infants and children (MMR, DTaP, Polio), adolescents and teens (Tdap boosters, Meningitis, HPV), adults (Flu Shot, Shingles, Pneumonia), and travel or occupational needs based on specific exposure risks.",
  },
  {
    id: "same-day",
    title: "Same-Day Urgent Care",
    description:
      "Health issues can arise unexpectedly, and waiting days for care isn't always an option. That's why we offer same-day appointment availability — so your child gets the attention they need, when they need it.",
  },
  {
    id: "sports",
    title: "Sports Physicals — $25",
    description:
      "A Preparticipation Physical Evaluation (PPE) is required before any organized sport. Our $25 sports physicals are available for athletes without insurance or those who have already used their annual well visit. Best of all, 100% of the fee is donated back to the athlete's high school athletic program.",
  },
  {
    id: "teen",
    title: "Teen Health",
    description:
      "Comprehensive health services designed specifically for teens, including yearly physicals, routine immunizations (Tdap, Meningitis), same-day appointments, birth control counseling and management (Liletta, Kyleena IUDs, Nexplanon implant), and advanced acne treatment including Accutane consultation.",
  },
  {
    id: "circumcisions",
    title: "Circumcisions",
    description:
      "We provide exceptional newborn circumcision care in a comfortable, safe, and professional environment. Our approach prioritizes safety, comfort, and education. Schedule a consultation with Dr. Turner to discuss whether this is the right choice for your child — we'll walk you through every step from consultation to full recovery.",
  },
];

const mediaItems = [
  {
    type: "video",
    src: "https://onehealthclinics.com/wp-content/uploads/2025/11/IMG_7614.mov",
    caption: "A look inside our pediatrics clinic",
  },
  {
    type: "image",
    src: "https://onehealthclinics.com/wp-content/uploads/2025/11/FullSizeRender2-scaled.jpg",
    caption: "Our welcoming exam rooms",
  },
  {
    type: "image",
    src: "https://onehealthclinics.com/wp-content/uploads/2025/11/FullSizeRender1-scaled.jpg",
    caption: "Family-focused care",
  },
  {
    type: "image",
    src: "https://onehealthclinics.com/wp-content/uploads/2025/11/IMG_7598-scaled-e1763420015443.jpg",
    caption: "A space kids feel comfortable in",
  },
];

export default function PediatricsPage() {
  return (
    <div className="w-full text-white">
      {/* Hero Section */}
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
            Pediatric Care
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">
            Pediatrics
          </h1>
          <p className="max-w-2xl text-white/80 text-lg leading-relaxed">
            From newborns to teens, we partner with families to support every
            stage of your child's health and development — in a welcoming,
            family-focused environment.
          </p>
        </div>
      </section>

      {/* Provider Section */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-2xl font-bold mb-2">Carl Turner, DO</h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Board Certified in Family Medicine
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Bringing smiles, stethoscopes, and sometimes balloon animals to
              the exam room, Dr. Turner is passionate about providing care in a
              welcoming, family-focused environment. From newborn checkups to
              well-woman exams to grandpa's blood pressure, he enjoys caring for
              every member of the family.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Originally from Bountiful, Utah, Dr. Turner trained at Des Moines
              University and Wesley Medical Center in Wichita, Kansas. He brings
              over a decade of primary care experience with a focus on pediatric
              care and women's health. He and his wife are proud parents of five
              wonderful children.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md bg-gray-100 aspect-[3/4] flex items-center justify-center">
            <img
              src="https://onehealthclinics.com/wp-content/uploads/2025/07/drturner-3-scaled.png"
              alt="Dr. Carl Turner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="w-10 h-1 bg-primary rounded-full mb-4" />
            <h2 className="text-2xl font-bold">Our Pediatric Services</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-3"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  {service.title}
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Handouts + Screening Section */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Screening Forms */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                Understanding Your Child
              </h2>
              <p className="text-gray-600 text-sm">
                Screening tools and resources to support your child's
                development.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-1 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                  Lead Screening
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Required at 12 &amp; 24 months.
                </p>
                <a
                  href="https://leadcoalition.utah.gov/wp-content/uploads/Lead-Exposure-Questionnaire-English.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium text-sm hover:underline"
                >
                  Download Lead Exposure Questionnaire →
                </a>
              </div>
              <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-1 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                  Autism Screening (MCHAT)
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Administered at 18 months.
                </p>
                <a
                  href="https://www.autismspeaks.org/screen-your-child"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium text-sm hover:underline"
                >
                  Screen Your Child →
                </a>
              </div>
            </div>
          </div>

          {/* Development Handouts */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-2xl font-bold mb-2">Development Handouts</h2>
              <p className="text-gray-600 text-sm">
                Age-specific guides for every stage of your child's growth.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {developmentHandouts.map((handout) => (
                <a
                  key={handout.label}
                  href={handout.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors text-center"
                >
                  {handout.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Carousel Section */}
      <section className="bg-gray-50 text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="w-10 h-1 bg-primary rounded-full mb-4" />
            <h2 className="text-2xl font-bold">Inside Our Clinic</h2>
            <p className="text-gray-600 text-sm mt-2">
              Take a look at the space where your family's care happens.
            </p>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {mediaItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-3/4 lg:basis-2/3"
                >
                  <div className="rounded-2xl overflow-hidden bg-black shadow-md aspect-video flex items-center justify-center">
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        controls
                        className="w-full h-full object-cover"
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    {item.caption}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
