"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EmptyState } from "@/components/ui/StateComponents";
import type { PricingPlan } from "@/lib/db";

export function PricingList({ plans }: { plans: PricingPlan[] }) {
  if (plans.length === 0) {
    return <EmptyState title="Paket harga belum tersedia" desc="Paket akan tampil setelah data ditambahkan di database." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      {plans.map((plan, i) => (
        <ScrollReveal key={plan.id} delay={i * 0.1}>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className={`relative h-full flex flex-col p-8 rounded-3xl border ${
              plan.is_highlight
                ? "bg-gradient-to-b from-sky-500 to-sky-600 border-sky-400 shadow-2xl shadow-sky-200"
                : "bg-white border-slate-100 hover:border-sky-100"
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
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${plan.is_highlight ? "text-sky-100" : "text-sky-500"}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                {plan.price === "Khusus" ? (
                  <span className={`text-4xl font-bold ${plan.is_highlight ? "text-white" : "text-slate-800"}`}>Khusus</span>
                ) : (
                  <>
                    <span className={`text-sm ${plan.is_highlight ? "text-sky-100" : "text-slate-400"}`}>Rp</span>
                    <span className={`text-5xl font-black ${plan.is_highlight ? "text-white" : "text-slate-800"}`}>{plan.price}K</span>
                    <span className={`text-sm ${plan.is_highlight ? "text-sky-100" : "text-slate-400"}`}>{plan.unit}</span>
                  </>
                )}
              </div>
              <p className={`text-sm ${plan.is_highlight ? "text-sky-100" : "text-slate-500"}`}>{plan.description}</p>
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {(plan.features as { text: string; included: boolean }[]).map(({ text, included }) => (
                <li key={text} className={`flex items-center gap-2.5 text-sm ${included ? "" : "opacity-40"}`}>
                  <span className={`w-4 h-4 shrink-0 rounded-full flex items-center justify-center ${
                    included ? (plan.is_highlight ? "bg-white/20" : "bg-sky-50") : "bg-slate-100"
                  }`}>
                    {included
                      ? <Check className={`w-2.5 h-2.5 ${plan.is_highlight ? "text-white" : "text-sky-500"}`} />
                      : <span className="w-1.5 h-0.5 bg-slate-300 rounded-full block" />}
                  </span>
                  <span className={
                    plan.is_highlight
                      ? (included ? "text-sky-50" : "text-sky-200")
                      : (included ? "text-slate-700" : "text-slate-400")
                  }>
                    {text}
                  </span>
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
                    : "bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-100"
                }`}
              >
                {plan.cta_text}
              </motion.button>
            </Link>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
}
