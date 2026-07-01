"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EmptyState } from "@/components/ui/StateComponents";
import type { Service } from "@/lib/db";

// Foto per layanan (Unsplash)
const imageMap: Record<string, string> = {
  "wash-fold":
    "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1000&q=80",
  "dry-cleaning":
    "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=1000&q=80",
  "ironing":
    "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?auto=format&fit=crop&w=1000&q=80",
  "sneakers":
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
};

const iconMap: Record<string, React.ReactNode> = {
  "wash-fold": (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="12" width="20" height="26" rx="4" fill="white" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" />
      <path d="M18 20 Q24 16 30 20" stroke="rgba(14,165,233,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="28" r="4" fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
    </svg>
  ),
  "dry-cleaning": (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="18" width="24" height="16" rx="3" fill="white" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
      <path d="M16 26 L20 22 L24 26 L28 20 L32 26" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="14" r="3" fill="rgba(139,92,246,0.3)" />
    </svg>
  ),
  "ironing": (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 20 L32 20 L32 34 Q24 38 16 34 Z" fill="white" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" />
      <path d="M14 16 L24 12 L34 16" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 28 L24 24 L28 28" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "sneakers": (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="20" height="22" rx="6" fill="white" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="6" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="rgba(16,185,129,0.5)" />
    </svg>
  ),
};

export function ServicesList({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <EmptyState title="Layanan belum tersedia" desc="Layanan akan tampil setelah data ditambahkan di database." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {services.map((svc, i) => (
          <ScrollReveal key={svc.id} delay={0.05}>
            <div id={svc.slug} className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Visual card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`group relative rounded-3xl overflow-hidden h-64 lg:h-80 ${svc.light_bg} ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                {imageMap[svc.slug] ? (
                  <Image
                    src={imageMap[svc.slug]}
                    alt={svc.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 opacity-60">{iconMap[svc.slug] ?? null}</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-slate-700 text-xs font-semibold shadow-sm">
                    ⏱ {svc.turnaround}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-slate-700 text-xs font-semibold shadow-sm">
                    💰 {svc.price}
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${svc.gradient} text-white mb-3`}>
                  {svc.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-1">{svc.name}</h2>
                <p className="text-sky-500 font-medium mb-4">{svc.subtitle}</p>
                <p className="text-slate-500 leading-relaxed mb-6">{svc.description}</p>
                <ul className="space-y-2 mb-8">
                  {svc.features.map((f) => (
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
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${svc.gradient} text-white font-semibold shadow-lg`}
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
  );
}
