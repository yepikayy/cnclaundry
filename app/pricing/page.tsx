import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { PriceEstimator } from "@/components/pricing/PriceEstimator";
import { PriceListDetail } from "@/components/pricing/PriceListDetail";
import { CTA } from "@/components/home/CTA";

export default function PricingPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <FloatingBubbles count={10} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-sky-200 text-sky-600 text-sm font-medium mb-5">
            Harga
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-800 tracking-tight mb-5">
            Harga Jujur, <span className="text-gradient">Transparan</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Tidak ada biaya tersembunyi. Tidak ada kejutan. Cukup pakaian bersih dengan harga yang adil.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-3">
              Hitung <span className="text-gradient">Estimasi</span> Harga
            </h2>
            <p className="text-slate-500">
              Pilih layanan yang Anda butuhkan dan lihat estimasi biayanya secara langsung.
            </p>
          </ScrollReveal>

          <PriceEstimator />
        </div>
      </section>

      <section className="py-20 section-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-3">
              Daftar Harga <span className="text-gradient">Satuan</span>
            </h2>
            <p className="text-slate-500">Harga per item untuk pakaian khusus dan barang non-kiloan.</p>
          </ScrollReveal>

          <PriceListDetail />

          <ScrollReveal className="mt-10 p-6 rounded-2xl bg-white border border-sky-100 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Catatan harga</p>
              <p className="text-sm text-slate-500">
                Harga satuan dapat menyesuaikan kondisi dan tingkat kesulitan barang. Untuk noda berat
                atau perawatan khusus,{" "}
                <Link href="/contact" className="text-sky-600 font-medium hover:underline">hubungi tim kami</Link>{" "}
                untuk penawaran yang pasti.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
