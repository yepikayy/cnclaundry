"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Truck, Sparkles, PackageCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Jadwalkan Penjemputan",
    desc: "Pesan online dalam waktu kurang dari 2 menit. Pilih waktu yang sesuai dan kami siap hadir.",
    color: "text-sky-500",
    bg: "from-sky-50 to-sky-100/50",
    border: "border-sky-100",
  },
  {
    number: "02",
    icon: Truck,
    title: "Kami Jemput",
    desc: "Kurir kami tiba di depan pintu Anda. Setiap pakaian ditimbang dan dicatat dengan teliti.",
    color: "text-cyan-500",
    bg: "from-cyan-50 to-cyan-100/50",
    border: "border-cyan-100",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Pencucian Profesional",
    desc: "Pakaian Anda dicuci, dikeringkan, dan disetrika menggunakan produk ramah lingkungan premium.",
    color: "text-blue-500",
    bg: "from-blue-50 to-blue-100/50",
    border: "border-blue-100",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Diantar Bersih & Rapi",
    desc: "Dikemas rapi dan dikirim kembali ke Anda. Lacak setiap tahap melalui ponsel Anda.",
    color: "text-violet-500",
    bg: "from-violet-50 to-violet-100/50",
    border: "border-violet-100",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 mb-4">
            Cara Kerja
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mb-4">
            Pakaian Bersih dalam{" "}
            <span className="text-gradient">4 Langkah Mudah</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Dari pemesanan hingga pengantaran, seluruh proses dirancang untuk kenyamanan Anda.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-100 via-cyan-200 to-violet-100 z-0" />

          {steps.map(({ number, icon: Icon, title, desc, color, bg, border }, i) => (
            <ScrollReveal key={title} delay={i * 0.12}>
              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${bg} border ${border} flex items-center justify-center mb-5 shadow-sm`}
                >
                  <Icon className={`w-7 h-7 ${color}`} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-100 text-xs font-bold text-slate-400 flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </motion.div>

                <span className={`text-xs font-bold tracking-widest ${color} mb-2`}>{number}</span>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
