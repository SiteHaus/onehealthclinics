"use client";

export default function ContactPage() {
  return (
    <div className="w-full text-white">
      {/* Hero Section */}
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">
            Contact Us
          </h1>
          <p className="max-w-2xl text-white/80 text-lg leading-relaxed">
            We'd love to hear from you. Reach out to schedule an appointment,
            ask a question, or learn more about our services.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-2xl font-bold mb-6">Reach Us Directly</h2>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                  Phone
                </p>
                <p className="text-gray-700 text-lg">(435) 688-0759</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                  Fax
                </p>
                <p className="text-gray-700 text-lg">(435) 656-0491</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                  Address
                </p>
                <p className="text-gray-700 text-lg">St. George, Utah</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                  Hours
                </p>
                <p className="text-gray-700">Monday – Friday: 8am – 5pm</p>
                <p className="text-gray-500 text-sm">
                  Same-day appointments available
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
