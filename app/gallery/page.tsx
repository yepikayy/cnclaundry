import Image from "next/image";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EmptyState } from "@/components/ui/StateComponents";
import { CTA } from "@/components/home/CTA";
import { getGallery } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <FloatingBubbles count={10} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-sky-200 text-sky-600 text-sm font-medium mb-5">
            Galeri
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-800 tracking-tight mb-5">
            Hasil <span className="text-gradient">Kerja Kami</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Setiap pakaian dirawat dengan penuh perhatian. Ini hasilnya.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyState
              title="Galeri belum tersedia"
              desc="Foto-foto akan muncul di sini setelah ditambahkan."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.05}>
                  <div className="group rounded-2xl overflow-hidden border border-slate-100 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-50 transition-all">
                    <div className="relative h-56 bg-sky-50">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-sky-600 text-xs font-semibold shadow-sm">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-slate-500 text-sm">{item.description}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
