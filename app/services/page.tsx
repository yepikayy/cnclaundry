import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { ServicesList } from "@/components/services/ServicesList";
import { CTA } from "@/components/home/CTA";
import { services } from "@/lib/services-data";

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <FloatingBubbles count={12} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-sky-200 text-sky-600 text-sm font-medium mb-5">
            Layanan Kami
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-800 tracking-tight mb-5">
            Perawatan untuk Setiap <span className="text-gradient">Kain</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Dari laundry harian hingga dry cleaning spesialis, kami punya solusi untuk setiap pakaian.
          </p>
        </div>
      </section>

      <ServicesList services={services} />
      <CTA />
    </>
  );
}
