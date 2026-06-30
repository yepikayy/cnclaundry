"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const plans = [
  {
    name: "Reguler",
    price: "10",
    unit: "/kg",
    desc: "Cocok untuk kebutuhan laundry sehari-hari.",
    features: ["Cuci & Lipat", "Selesai 2 hari", "Gratis jemput di atas 5 kg", "Notifikasi SMS"],
    cta: "Mulai Sekarang",
    highlight: false,
  },
  {
    name: "Premium",
    price: "10",
    unit: "/kg",
    desc: "Untuk Anda yang menginginkan perawatan terbaik.",
    features: [
      "Cuci, Lipat & Setrika",
      "Ekspres 24 jam",
      "Antar jemput gratis",
      "Pemeriksaan pakaian",
      "Lacak real-time",
    ],
    cta: "Paling Populer",
    highlight: true,
  },
  {
    name: "Bisnis",
    price: "Khusus",
    unit: "",
    desc: "Solusi massal untuk kantor dan bisnis perhotelan.",
    features: [
      "Semua fitur Premium",
      "Manajer akun khusus",
      "Penagihan mingguan",
      "Penjadwalan prioritas",
      "SLA kustom",
    ],
    cta: "Hubungi Kami",
    highlight: false,
  },
];

export function PricingPreview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-100/30 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 mb-4">
            Harga
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mb-4">
            Harga yang Jelas,{" "}
            <span className="text-gradient">Tanpa Biaya Tersembunyi</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Pilih paket yang sesuai dengan gaya hidup Anda.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map(({ name, price, unit, desc, features, cta, highlight }, i) => (
            <ScrollReveal key={name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative h-full flex flex-col p-8 rounded-3xl border transition-all ${
                  highlight
                    ? "bg-gradient-to-b from-sky-500 to-sky-600 border-sky-400 text-white shadow-2xl shadow-sky-200"
                    : "bg-white border-slate-100 hover:border-sky-100 text-slate-800"
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
                  <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${highlight ? "text-sky-100" : "text-sky-500"}`}>
                    {name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    {price === "Khusus" ? (
                      <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-slate-800"}`}>Khusus</span>
                    ) : (
                      <>
                        <span className={`text-sm font-medium ${highlight ? "text-sky-100" : "text-slate-500"}`}>Rp</span>
                        <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-slate-800"}`}>{price}K</span>
                        <span className={`text-sm ${highlight ? "text-sky-100" : "text-slate-400"}`}>{unit}</span>
                      </>
                    )}
                  </div>
                  <p className={`text-sm ${highlight ? "text-sky-100" : "text-slate-500"}`}>{desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${highlight ? "text-sky-200" : "text-sky-500"}`} />
                      <span className={highlight ? "text-sky-50" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href={name === "Bisnis" ? "/contact" : "/order"}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      highlight
                        ? "bg-white text-sky-600 hover:bg-sky-50"
                        : "bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-100"
                    }`}
                  >
                    {cta}
                  </motion.button>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors">
            Lihat detail harga lengkap <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
