"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const faqs = [
  {
    q: "Bagaimana cara menjadwalkan penjemputan?",
    a: "Cukup klik 'Pesan Sekarang', pilih tanggal dan waktu yang Anda inginkan, dan kami akan mengirimkan kurir ke alamat Anda. Seluruh proses membutuhkan kurang dari 2 menit.",
  },
  {
    q: "Berapa berat minimum untuk satu pesanan?",
    a: "Minimum pesanan untuk layanan Cuci & Lipat adalah 2 kg. Untuk dry cleaning dan setrika, tidak ada minimum — Anda bisa mengirim sesedikit apapun pakaian.",
  },
  {
    q: "Berapa lama waktu pengerjaan laundry?",
    a: "Layanan reguler membutuhkan 2 hari. Layanan Ekspres kami mengembalikan pakaian Anda dalam 24 jam dengan biaya tambahan yang terjangkau.",
  },
  {
    q: "Bagaimana jika pakaian saya rusak?",
    a: "Setiap pakaian difoto dan diperiksa sebelum dicuci. Dalam kejadian langka terjadi kerusakan, kami memberikan kompensasi penuh sesuai nilai pasar pakaian tersebut.",
  },
  {
    q: "Apakah Anda menggunakan produk ramah lingkungan?",
    a: "Ya! Kami menggunakan detergen biodegradable dan hipoalergenik serta mesin hemat energi. Aman untuk keluarga Anda dan lingkungan sekitar.",
  },
  {
    q: "Bisakah saya melacak pesanan saya?",
    a: "Tentu saja. Anda akan menerima update melalui SMS dan email di setiap tahap — penjemputan terkonfirmasi, sedang dicuci, dalam pengiriman, dan sudah sampai.",
  },
  {
    q: "Apakah ada program berlangganan atau loyalitas?",
    a: "Ada! Setelah pesanan ke-5 Anda otomatis bergabung dengan FreshRewards. Kumpulkan poin di setiap cucian dan tukarkan dengan sesi laundry gratis.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-white border rounded-2xl px-6 transition-all cursor-pointer ${
        open ? "border-sky-200 shadow-sm shadow-sky-50" : "border-slate-100"
      }`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="text-slate-800 font-medium text-sm sm:text-base">{q}</span>
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
            <p className="text-slate-500 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
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

        <ScrollReveal delay={0.1}>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
