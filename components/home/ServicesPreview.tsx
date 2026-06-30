"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="rgba(186,230,253,0.4)" />
        <rect x="14" y="12" width="20" height="26" rx="4" fill="white" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" />
        <path d="M18 20 Q24 16 30 20" stroke="rgba(14,165,233,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="24" cy="28" r="4" fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
      </svg>
    ),
    title: "Cuci & Lipat",
    desc: "Cuci profesional, pengeringan, dan dilipat rapi. Harga per kilogram.",
    badge: "Terpopuler",
    badgeColor: "bg-sky-100 text-sky-700",
    href: "/services#wash-fold",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="rgba(224,242,254,0.5)" />
        <rect x="12" y="18" width="24" height="16" rx="3" fill="white" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
        <path d="M16 26 L20 22 L24 26 L28 20 L32 26" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="24" cy="14" r="3" fill="rgba(125,211,252,0.5)" />
      </svg>
    ),
    title: "Dry Cleaning",
    desc: "Perawatan khusus untuk jas, gaun, dan kain halus menggunakan pelarut premium.",
    badge: "Premium",
    badgeColor: "bg-violet-100 text-violet-700",
    href: "/services#dry-cleaning",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="rgba(224,242,254,0.4)" />
        <path d="M16 20 L32 20 L32 34 Q24 38 16 34 Z" fill="white" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
        <path d="M14 16 L24 12 L34 16" stroke="rgba(56,189,248,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 28 L24 24 L28 28" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    title: "Setrika & Press",
    desc: "Pengepresan profesional yang rapi untuk kemeja, celana, dan pakaian formal.",
    badge: "Cepat",
    badgeColor: "bg-amber-100 text-amber-700",
    href: "/services#ironing",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="rgba(240,249,255,0.5)" />
        <rect x="14" y="14" width="20" height="22" rx="6" fill="white" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="6" fill="rgba(186,230,253,0.4)" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="2" fill="rgba(14,165,233,0.5)" />
      </svg>
    ),
    title: "Cuci Sepatu",
    desc: "Bersihkan mendalam, hilangkan bau, dan kembalikan sneaker favorit Anda seperti baru.",
    badge: "Baru",
    badgeColor: "bg-emerald-100 text-emerald-700",
    href: "/services#sneakers",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 section-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 mb-4">
              Layanan Kami
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
              Perawatan untuk Setiap{" "}
              <span className="text-gradient">Kain</span>
            </h2>
          </div>
          <Link href="/services">
            <motion.button
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors shrink-0"
            >
              Semua Layanan <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon, title, desc, badge, badgeColor, href }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <Link href={href}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(14,165,233,0.12)" }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-6 rounded-2xl bg-white border border-sky-50 hover:border-sky-100 transition-all h-full"
                >
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-4 ${badgeColor}`}>
                    {badge}
                  </span>
                  <div className="mb-4">{icon}</div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-sky-500 text-sm font-semibold group-hover:gap-2 transition-all">
                    Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
