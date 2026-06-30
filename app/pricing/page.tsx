"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { CTA } from "@/components/home/CTA";

const plans = [
  {
    name: "Reguler",
    price: "10",
    unit: "/kg",
    desc: "Cocok untuk kebutuhan laundry sehari-hari.",
    features: [
      { text: "Cuci & Lipat", included: true },
      { text: "Selesai 2 hari", included: true },
      { text: "Gratis jemput di atas 5 kg", included: true },
      { text: "Notifikasi SMS", included: true },
      { text: "Layanan Ekspres 24 jam", included: false },
      { text: "Antar jemput gratis", included: false },
      { text: "Pemeriksaan pakaian", included: false },
      { text: "Pelacakan real-time", included: false },
    ],
    cta: "Mulai Sekarang",
    href: "/order",
    highlight: false,
  },
  {
    name: "Premium",
    price: "10",
    unit: "/kg",
    desc: "Paket paling populer — pengalaman terlengkap.",
    features: [
      { text: "Cuci, Lipat & Setrika", included: true },
      { text: "Layanan Ekspres 24 jam", included: true },
      { text: "Antar jemput gratis", included: true },
      { text: "Pemeriksaan pakaian", included: true },
      { text: "Pelacakan real-time", included: true },
      { text: "Notifikasi SMS & email", included: true },
      { text: "Jalur dukungan khusus", included: false },
      { text: "Penagihan mingguan", included: false },
    ],
    cta: "Paling Populer",
    href: "/order",
    highlight: true,
  },
  {
    name: "Bisnis",
    price: "Khusus",
    unit: "",
    desc: "Solusi khusus untuk kantor, hotel & restoran.",
    features: [
      { text: "Semua fitur Premium", included: true },
      { text: "Manajer akun khusus", included: true },
      { text: "Penagihan mingguan", included: true },
      { text: "Penjadwalan prioritas", included: true },
      { text: "SLA kustom", included: true },
      { text: "Diskon volume", included: true },
      { text: "Pengambilan di lokasi", included: true },
      { text: "Laporan penggunaan bulanan", included: true },
    ],
    cta: "Hubungi Kami",
    href: "/contact",
    highlight: false,
  },
];

const addons = [
  { name: "Upgrade Ekspres", price: "Rp 15K", desc: "Upgrade pesanan apa pun menjadi penyelesaian 24 jam." },
  { name: "Penanganan Noda", price: "Rp 20K / item", desc: "Pra-perawatan spesialis untuk noda membandel." },
  { name: "Dry Cleaning", price: "Mulai Rp 35K / item", desc: "Harga per item untuk pakaian halus." },
  { name: "Cuci Sepatu", price: "Mulai Rp 80K / pasang", desc: "Bersihkan mendalam dan kembalikan kondisi alas kaki." },
  { name: "Setrika Saja", price: "Rp 8K / item", desc: "Press rapi tanpa cucian." },
  { name: "Upgrade Wangi", price: "Rp 10K", desc: "Pelembut kain premium dengan pilihan wewangian favorit Anda." },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <FloatingBubbles count={10} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-sky-200 text-sky-600 text-sm font-medium mb-5"
          >
            Harga
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-slate-800 tracking-tight mb-5"
          >
            Harga Jujur, <span className="text-gradient">Transparan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg"
          >
            Tidak ada biaya tersembunyi. Tidak ada kejutan. Cukup pakaian bersih dengan harga yang adil.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map(({ name, price, unit, desc, features, cta, href, highlight }, i) => (
              <ScrollReveal key={name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative h-full flex flex-col p-8 rounded-3xl border ${
                    highlight
                      ? "bg-gradient-to-b from-sky-500 to-sky-600 border-sky-400 shadow-2xl shadow-sky-200"
                      : "bg-white border-slate-100 hover:border-sky-100"
                  }`}
                >
                  {highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                        ★ TERBAIK
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${highlight ? "text-sky-100" : "text-sky-500"}`}>
                      {name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      {price === "Khusus" ? (
                        <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-slate-800"}`}>Khusus</span>
                      ) : (
                        <>
                          <span className={`text-sm ${highlight ? "text-sky-100" : "text-slate-400"}`}>Rp</span>
                          <span className={`text-5xl font-black ${highlight ? "text-white" : "text-slate-800"}`}>{price}K</span>
                          <span className={`text-sm ${highlight ? "text-sky-100" : "text-slate-400"}`}>{unit}</span>
                        </>
                      )}
                    </div>
                    <p className={`text-sm ${highlight ? "text-sky-100" : "text-slate-500"}`}>{desc}</p>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {features.map(({ text, included }) => (
                      <li key={text} className={`flex items-center gap-2.5 text-sm ${included ? "" : "opacity-40"}`}>
                        <span className={`w-4 h-4 shrink-0 rounded-full flex items-center justify-center ${
                          included ? (highlight ? "bg-white/20" : "bg-sky-50") : "bg-slate-100"
                        }`}>
                          {included
                            ? <Check className={`w-2.5 h-2.5 ${highlight ? "text-white" : "text-sky-500"}`} />
                            : <span className="w-1.5 h-0.5 bg-slate-300 rounded-full block" />}
                        </span>
                        <span className={highlight ? (included ? "text-sky-50" : "text-sky-200") : (included ? "text-slate-700" : "text-slate-400")}>
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={href}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                        highlight
                          ? "bg-white text-sky-600 hover:bg-sky-50"
                          : "bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-100"
                      }`}
                    >
                      {cta}
                    </motion.button>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 section-gradient">
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
