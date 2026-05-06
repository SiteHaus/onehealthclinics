import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NadInfusionsPage() {
  return (
    <div className="w-full text-white">
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="text-white/40 text-sm mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">NAD+ Infusions</span>
          </nav>
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
            Specialty Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">
            NAD+ Infusions in St. George, Utah
          </h1>
          <p className="max-w-2xl text-white/80 text-lg leading-relaxed">
            Support cellular energy production, DNA repair, and longevity with intravenous NAD+ therapy.
          </p>
        </div>
      </section>

      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-2xl font-bold mb-4">What is NAD+?</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              NAD+ is a vital coenzyme found in every cell, playing a central role in energy production and cellular health. It assists mitochondria in converting nutrients into ATP and supports DNA repair by activating sirtuins — proteins that regulate metabolism, cell survival, and inflammation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              NAD+ also helps regulate gene expression, modulate neurotransmitters, and control inflammation, making it a key component for cellular longevity and brain health.
            </p>
            <Link
              href="/contact#book-appointment"
              className="w-fit bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
            >
              Book a Consultation
            </Link>
          </div>
          <div className="w-full md:w-2/5 rounded-2xl overflow-hidden shadow-md aspect-[4/3] flex-shrink-0">
            <img
              src="/nad.png"
              alt="NAD+ infusion therapy in St. George, Utah"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4">
          <div className="w-10 h-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Interested in NAD+ therapy?</h2>
          <p className="text-gray-500 text-sm max-w-md">
            Same-day and next-day appointments available. New patients always welcome.
          </p>
          <Link
            href="/contact#book-appointment"
            className="bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
          >
            Book an Appointment
          </Link>
          <Link href="/services" className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to All Services
          </Link>
        </div>
      </section>
    </div>
  );
}
