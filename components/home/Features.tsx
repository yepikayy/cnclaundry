"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Leaf, Clock, Star, Smartphone } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const features = [
  {
    icon: Truck,
    title: "Antar Jemput Gratis",
    desc: "Kami yang datang ke Anda. Jadwalkan penjemputan dan pakaian bersih akan dikirim balik tanpa repot.",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: Clock,
    title: "Layanan Ekspres 24 Jam",
    desc: "Butuh cepat? Layanan ekspres kami menjamin pakaian Anda kembali dalam 24 jam.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    icon: Shield,
    title: "Perlindungan Pakaian",
    desc: "Setiap pakaian diperiksa, dicatat, dan ditangani dengan profesional dari awal hingga selesai.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Leaf,
    title: "Ramah Lingkungan",
    desc: "Kami menggunakan detergen biodegradable dan mesin hemat energi untuk menjaga bumi tetap bersih.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Smartphone,
    title: "Lacak Secara Real-Time",
    desc: "Pantau progress laundry Anda dari penjemputan hingga pengantaran dengan update status langsung.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Star,
    title: "Garansi Kepuasan",
    desc: "Tidak puas? Kami cuci ulang secara gratis. Kepuasan Anda adalah satu-satunya standar kami.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 mb-4">
            Mengapa Memilih Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mb-4">
            Semua yang Anda Butuhkan,{" "}
            <span className="text-gradient">Tanpa Lebih</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Dari penjemputan hingga pengantaran, setiap langkah dirancang agar laundry menjadi bagian termudah dalam minggu Anda.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
            <ScrollReveal key={title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(14,165,233,0.1)" }}
                transition={{ duration: 0.3 }}
                className="group p-7 rounded-2xl border border-slate-100 bg-white hover:border-sky-100 transition-all duration-300 cursor-default"
              >
                <div className={`inline-flex p-3 rounded-xl ${bg} mb-5`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
