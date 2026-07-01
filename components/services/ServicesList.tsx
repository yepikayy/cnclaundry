"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EmptyState } from "@/components/ui/StateComponents";
import type { Service } from "@/lib/db";

// Foto per layanan
const imageMap: Record<string, string> = {
  "wash-fold":
    "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1000&q=80",
  "dry-cleaning":
    "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=1000&q=80",
  "ironing":
    "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?auto=format&fit=crop&w=1000&q=80",
  "sneakers":
    "https://assets.preloved.co.id/products/198979/2a8b0c17-284e-403b-bbc5-a58aaf880e24.jpg",
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
                {imageMap[svc.slug] && (
                  <Image
                    src={imageMap[svc.slug]}
                    alt={svc.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
