"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EmptyState } from "@/components/ui/StateComponents";
import type { Testimonial } from "@/lib/db";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials({ data }: { data: Testimonial[] }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 mb-4">
            Testimoni
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mb-4">
            Dipercaya oleh <span className="text-gradient">50.000+ Pelanggan</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Cerita nyata dari orang-orang nyata yang mempercayakan pakaian terbaik mereka kepada CNC Laundry.
          </p>
        </ScrollReveal>

        {data.length === 0 ? (
          <EmptyState title="Belum ada testimoni" desc="Testimoni akan muncul di sini setelah ditambahkan." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map(({ id, name, role, avatar_initials, rating, content, gradient }, i) => (
              <ScrollReveal key={id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(14,165,233,0.08)" }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-sky-100 transition-all relative"
                >
                  <Quote className="absolute top-5 right-5 w-8 h-8 text-sky-100" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {avatar_initials}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{name}</div>
                      <div className="text-xs text-slate-400">{role}</div>
                    </div>
                  </div>
                  <StarRating count={rating} />
                  <p className="text-slate-600 text-sm leading-relaxed mt-3">{content}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
