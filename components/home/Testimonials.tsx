"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const testimonials = [
  {
    name: "Sari Dewi",
    role: "Manajer Pemasaran",
    avatar: "SD",
    rating: 5,
    text: "CNC Laundry benar-benar mengubah pagi hari Senin saya. Jas saya selalu kembali dengan setrika yang sempurna. Sepadan dengan harganya!",
    color: "from-sky-400 to-sky-600",
  },
  {
    name: "Budi Santoso",
    role: "Pemilik Restoran",
    avatar: "BS",
    rating: 5,
    text: "Kami menggunakan CNC Laundry untuk semua seragam staf. Harga kiloan sangat terjangkau dan tidak pernah telat sekalipun dalam 6 bulan.",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    name: "Amira Putri",
    role: "Desainer Grafis",
    avatar: "AP",
    rating: 5,
    text: "Layanan cuci sepatu-nya luar biasa — Jordan lama saya terlihat seperti baru dibuka dari kotaknya. Sangat direkomendasikan!",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Reza Firmansyah",
    role: "Software Engineer",
    avatar: "RF",
    rating: 5,
    text: "Fitur pelacakan real-time sangat membantu. Saya tahu persis di mana pakaian saya setiap saat. Pengalaman yang sangat menyenangkan.",
    color: "from-violet-400 to-violet-600",
  },
  {
    name: "Dina Kusuma",
    role: "Guru",
    avatar: "DK",
    rating: 5,
    text: "Penjemputan selalu tepat waktu dan pakaian selalu wangi. Seragam sekolah anak-anak saya tidak pernah sebersih ini.",
    color: "from-sky-400 to-cyan-500",
  },
  {
    name: "Hendra Wijaya",
    role: "Arsitek",
    avatar: "HW",
    rating: 5,
    text: "Layanan dry cleaning mereka menyelamatkan jas pengantin saya dari tumpahan kopi. Profesional, cepat, dan harganya sangat terjangkau.",
    color: "from-indigo-400 to-blue-500",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, avatar, rating, text, color }, i) => (
            <ScrollReveal key={name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(14,165,233,0.08)" }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-sky-100 transition-all relative"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-sky-100" />
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{name}</div>
                    <div className="text-xs text-slate-400">{role}</div>
                  </div>
                </div>
                <StarRating count={rating} />
                <p className="text-slate-600 text-sm leading-relaxed mt-3">{text}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
