"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import type { Service } from "@/lib/db";

export function PricingPreview({ data }: { data: Service[] }) {
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
            Harga ramah di kantong untuk setiap layanan. Hitung estimasi pastinya di halaman harga.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((svc, i) => (
            <ScrollReveal key={svc.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col p-6 rounded-3xl border border-slate-100 hover:border-sky-100 bg-white transition-all"
              >
                <span className={`inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-semibold mb-4 ${svc.badge_color}`}>
                  {svc.badge}
                </span>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{svc.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{svc.subtitle}</p>
                <div className="mt-auto">
                  <div className="text-2xl font-black text-slate-800 mb-1">{svc.price}</div>
                  <div className="text-xs text-slate-400">Estimasi {svc.turnaround}</div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 flex flex-col items-center gap-4">
          <Link href="/pricing">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold text-sm shadow-md shadow-sky-100 hover:bg-sky-600 transition-all"
            >
              <Calculator className="w-4 h-4" /> Hitung Estimasi Harga
            </motion.button>
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors">
            Lihat daftar harga lengkap <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
