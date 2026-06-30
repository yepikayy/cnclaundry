import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { PricingList } from "@/components/pricing/PricingList";
import { PriceListDetail } from "@/components/pricing/PriceListDetail";
import { CTA } from "@/components/home/CTA";
import { getPricingPlans } from "@/lib/db";

const addons = [
  { name: "Upgrade Ekspres", price: "Rp 15K", desc: "Upgrade pesanan apa pun menjadi penyelesaian 24 jam." },
  { name: "Penanganan Noda", price: "Rp 20K / item", desc: "Pra-perawatan spesialis untuk noda membandel." },
  { name: "Dry Cleaning", price: "Mulai Rp 35K / item", desc: "Harga per item untuk pakaian halus." },
  { name: "Cuci Sepatu", price: "Mulai Rp 80K / pasang", desc: "Bersihkan mendalam dan kembalikan kondisi alas kaki." },
  { name: "Setrika Saja", price: "Rp 8K / item", desc: "Press rapi tanpa cucian." },
  { name: "Upgrade Wangi", price: "Rp 10K", desc: "Pelembut kain premium dengan pilihan wewangian favorit Anda." },
];

export default async function PricingPage() {
  const plans = await getPricingPlans();

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
          <PricingList plans={plans} />
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

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-3">
              Layanan <span className="text-gradient">Tambahan</span>
            </h2>
            <p className="text-slate-500">Kombinasikan dengan paket apa pun untuk solusi laundry yang sempurna.</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map(({ name, price, desc }, i) => (
              <ScrollReveal key={name} delay={i * 0.07}>
                <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-sky-100 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 text-sm">{name}</h3>
                    <span className="text-sky-600 font-bold text-sm shrink-0 ml-3">{price}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10 p-6 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Bingung memilih paket?</p>
              <p className="text-sm text-slate-500">
                <Link href="/contact" className="text-sky-600 font-medium hover:underline">Hubungi tim kami</Link>{" "}
                dan kami akan merekomendasikan solusi yang paling tepat untuk kebutuhan Anda.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
