"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { CTA } from "@/components/home/CTA";

const services = [
  {
    id: "wash-fold",
    title: "Cuci & Lipat",
    subtitle: "Laundry Sehari-hari",
    price: "Rp 10K / kg",
    turnaround: "2 hari",
    desc: "Layanan paling populer kami. Pakaian Anda dicuci menggunakan mesin kelas atas dengan detergen ramah lingkungan premium, dikeringkan, lalu dilipat rapi.",
    features: [
      "Dipisahkan berdasarkan warna dan jenis kain",
      "Detergen ramah lingkungan premium",
      "Dikeringkan pada suhu optimal",
      "Dilipat rapi dan dikemas",
      "Minimum 2 kg",
    ],
    color: "from-sky-400 to-sky-600",
    lightBg: "bg-sky-50",
    badge: "Terpopuler",
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    subtitle: "Pakaian Spesial",
    price: "Mulai Rp 35K / item",
    turnaround: "3 hari",
    desc: "Perawatan ahli untuk kain halus, jas, gaun, dan pakaian yang memerlukan penanganan khusus. Kami menggunakan pelarut dry-cleaning terbaru yang lembut pada kain dan lingkungan.",
    features: [
      "Jas, blazer & pakaian formal",
      "Sutra, kasmir & wol",
      "Pra-perawatan noda termasuk",
      "Dikemas individual di gantungan",
      "Laporan pemeriksaan kain",
    ],
    color: "from-violet-400 to-violet-600",
    lightBg: "bg-violet-50",
    badge: "Premium",
  },
  {
    id: "ironing",
    title: "Setrika & Press",
    subtitle: "Rapi & Tajam",
    price: "Rp 8K / item",
    turnaround: "1 hari",
    desc: "Penguapan dan pengepresan profesional untuk menghilangkan kerutan dan memberikan tampilan tajam yang rapi pada pakaian Anda. Sempurna untuk pakaian kantor dan acara formal.",
    features: [
      "Kemeja, celana & rok",
      "Teknologi steam press",
      "Kerah & manset sempurna",
      "Digantung di hanger premium",
      "Tersedia opsi same-day",
    ],
    color: "from-amber-400 to-orange-500",
    lightBg: "bg-amber-50",
    badge: "Cepat",
  },
  {
    id: "sneakers",
    title: "Cuci Sepatu",
    subtitle: "Tampil Baru Lagi",
    price: "Mulai Rp 80K / pasang",
    turnaround: "2 hari",
    desc: "Bersihkan mendalam, hilangkan bau, dan kembalikan sneaker Anda menggunakan solusi spesialis. Dari kanvas hingga kulit, kami menghidupkan kembali setiap pasang.",
    features: [
      "Deodorisasi interior mendalam",
      "Perawatan pemutihan sol",
      "Cuci tali sepatu termasuk",
      "Pembentukan ulang dengan shoe tree",
      "Cocok untuk semua bahan",
    ],
    color: "from-emerald-400 to-teal-500",
    lightBg: "bg-emerald-50",
    badge: "Baru",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <FloatingBubbles count={12} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-sky-200 text-sky-600 text-sm font-medium mb-5"
          >
            Layanan Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-slate-800 tracking-tight mb-5"
          >
            Perawatan untuk Setiap <span className="text-gradient">Kain</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-xl mx-auto"
          >
            Dari laundry harian hingga dry cleaning spesialis, kami punya solusi untuk setiap pakaian.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map(({ id, title, subtitle, price, turnaround, desc, features, color, lightBg, badge }, i) => (
            <ScrollReveal key={id} delay={0.05}>
              <div id={id} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className={`relative rounded-3xl overflow-hidden h-64 lg:h-80 ${lightBg} flex items-center justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
                  <div className="relative text-center p-10">
                    <div className={`text-7xl font-black bg-gradient-to-br ${color} bg-clip-text text-transparent opacity-20 select-none`}>
                      {title.split(" ")[0]}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/80 border border-white text-slate-600 text-xs font-semibold shadow-sm">
                        ⏱ {turnaround}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white/80 border border-white text-slate-600 text-xs font-semibold shadow-sm">
                        💰 {price}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${color} text-white mb-3`}>
                    {badge}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-1">{title}</h2>
                  <p className="text-sky-500 font-medium mb-4">{subtitle}</p>
                  <p className="text-slate-500 leading-relaxed mb-6">{desc}</p>
                  <ul className="space-y-2 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-sky-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/order">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${color} text-white font-semibold shadow-lg transition-all`}
                    >
                      Pesan Layanan Ini <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
