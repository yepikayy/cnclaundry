"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-400" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,165,233,0.3),transparent_60%)]" />

      <FloatingBubbles count={14} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-6">
            ✨ Penawaran Terbatas — Penjemputan Pertama Gratis
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Siap Menikmati Pakaian
            <br />
            Bersih Tanpa Repot?
          </h2>

          <p className="text-sky-100 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Bergabunglah dengan 50.000+ pelanggan yang sudah melupakan hari laundry.
            Penjemputan pertama Anda gratis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/order">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-sky-600 font-bold text-base shadow-xl hover:bg-sky-50 transition-colors"
              >
                Pesan Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <a href="tel:+6281234567890">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold text-base hover:bg-white/25 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Hubungi Kami
              </motion.button>
            </a>
          </div>

          <p className="text-sky-200 text-sm mt-6">
            Tanpa kartu kredit · Bisa dibatalkan kapan saja · Garansi kepuasan 100%
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
