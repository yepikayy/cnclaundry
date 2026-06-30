"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EmptyState } from "@/components/ui/StateComponents";
import type { FAQ as FAQType } from "@/lib/db";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((v) => !v)}
      className={`bg-white border rounded-2xl px-6 transition-all cursor-pointer ${
        open ? "border-sky-200 shadow-sm shadow-sky-50" : "border-slate-100"
      }`}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="text-slate-800 font-medium text-sm sm:text-base">{question}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${open ? "bg-sky-100" : "bg-slate-100"}`}>
          {open
            ? <Minus className="w-3.5 h-3.5 text-sky-500" />
            : <Plus className="w-3.5 h-3.5 text-slate-400" />}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 text-sm leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ({ data }: { data: FAQType[] }) {
  return (
    <section className="py-24 section-gradient relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 mb-4">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mb-4">
            Ada <span className="text-gradient">Pertanyaan?</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Semua yang perlu Anda ketahui tentang CNC Laundry.
          </p>
        </ScrollReveal>

        {data.length === 0 ? (
          <EmptyState title="Belum ada FAQ" />
        ) : (
          <ScrollReveal delay={0.1}>
            <div className="space-y-3">
              {data.map(({ id, question, answer }) => (
                <FAQItem key={id} question={question} answer={answer} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
