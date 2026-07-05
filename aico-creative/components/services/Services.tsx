"use client";

export default function Services() {
  return (
    <section className="py-40 text-center">

      <h2 className="text-5xl font-bold mb-16">
        Services
      </h2>

      <div className="grid grid-cols-3 gap-10 max-w-6xl mx-auto">

        <div className="p-10 bg-neutral-900 rounded-2xl">
          Website Development
        </div>

        <div className="p-10 bg-neutral-900 rounded-2xl">
          UI UX Design
        </div>

        <div className="p-10 bg-neutral-900 rounded-2xl">
          Digital Branding
        </div>

      </div>

    </section>
  );
}