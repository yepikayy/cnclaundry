"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import type { PricingPlan, PricingFeature } from "@/lib/db";

export function PricingPreview({ data }: { data: PricingPlan[] }) {
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
          {data.map((plan, i) => {
            const features = (plan.features as PricingFeature[]).slice(0, 5);
            return (
              <ScrollReveal key={plan.id} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative h-full flex flex-col p-8 rounded-3xl border transition-all ${
                    plan.is_highlight
                      ? "bg-gradient-to-b from-sky-500 to-sky-600 border-sky-400 text-white shadow-2xl shadow-sky-200"
                      : "bg-white border-slate-100 hover:border-sky-100 text-slate-800"
                  }`}
                >
                  {plan.is_highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                        ★ TERBAIK
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${plan.is_highlight ? "text-sky-100" : "text-sky-500"}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      {plan.price === "Khusus" ? (
                        <span className={`text-4xl font-bold ${plan.is_highlight ? "text-white" : "text-slate-800"}`}>Khusus</span>
                      ) : (
                        <>
                          <span className={`text-sm font-medium ${plan.is_highlight ? "text-sky-100" : "text-slate-500"}`}>Rp</span>
                          <span className={`text-4xl font-bold ${plan.is_highlight ? "text-white" : "text-slate-800"}`}>{plan.price}K</span>
                          <span className={`text-sm ${plan.is_highlight ? "text-sky-100" : "text-slate-400"}`}>{plan.unit}</span>
                        </>
                      )}
                    </div>
                    <p className={`text-sm ${plan.is_highlight ? "text-sky-100" : "text-slate-500"}`}>{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((f: PricingFeature) => f.included && (
                      <li key={f.text} className="flex items-start gap-2.5 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.is_highlight ? "text-sky-200" : "text-sky-500"}`} />
                        <span className={plan.is_highlight ? "text-sky-50" : "text-slate-600"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                        plan.is_highlight
                          ? "bg-white text-sky-600 hover:bg-sky-50"
                          : "bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-100"
                      }`}
                    >
                      {plan.cta_text}
                    </motion.button>
                  </Link>
                </motion.div>
              </ScrollReveal>
            );
          })}
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
