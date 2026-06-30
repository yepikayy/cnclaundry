"use client";

import { motion } from "framer-motion";
import { Heart, Leaf, Shield, Users } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { CTA } from "@/components/home/CTA";

const values = [
  {
    icon: Heart,
    title: "Pakaian adalah Prioritas",
    desc: "Setiap pakaian diperlakukan seperti milik kami sendiri. Diperiksa, dicatat, dan ditangani dengan presisi.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Leaf,
    title: "Komitmen Ramah Lingkungan",
    desc: "Detergen biodegradable, daur ulang air, dan mesin hemat energi.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "100% Transparan",
    desc: "Tidak ada biaya tersembunyi, tidak ada kejutan. Yang Anda lihat itulah yang Anda bayar.",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: Users,
    title: "Fokus pada Komunitas",
    desc: "Tim lokal, dampak lokal. Kami bermitra dengan komunitas di seluruh Jakarta.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

const milestones = [
  { year: "2019", event: "CNC Laundry didirikan dengan 3 mesin dan 1 sepeda motor pengiriman di Jakarta Selatan." },
  { year: "2020", event: "Meluncurkan layanan antar jemput. Mencapai 1.000 pelanggan puas dalam 6 bulan." },
  { year: "2021", event: "Membuka fasilitas kedua. Memperkenalkan dry cleaning dan cuci sepatu." },
  { year: "2022", event: "Mencapai 20.000 pelanggan. Meraih penghargaan 'Laundry Terbaik' di Jakarta." },
  { year: "2023", event: "Ekspansi ke Tangerang dan Bekasi. Meluncurkan pelacakan pesanan real-time." },
  { year: "2024", event: "Melayani 50.000+ pelanggan per bulan. Tersertifikasi operasi ramah lingkungan." },
];

const team = [
  { name: "Andi Prasetyo", role: "Pendiri & CEO", avatar: "AP", color: "from-sky-400 to-sky-600" },
  { name: "Rina Kurniawan", role: "Kepala Operasional", avatar: "RK", color: "from-cyan-400 to-cyan-600" },
  { name: "Dimas Haryanto", role: "Teknisi Utama", avatar: "DH", color: "from-blue-400 to-blue-600" },
  { name: "Siti Rahma", role: "Pengalaman Pelanggan", avatar: "SR", color: "from-violet-400 to-violet-600" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <FloatingBubbles count={12} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-sky-200 text-sky-600 text-sm font-medium mb-5"
          >
            Cerita Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-slate-800 tracking-tight mb-6"
          >
            Dibangun di atas <span className="text-gradient">Nilai Kebersihan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            CNC Laundry dimulai dengan keyakinan sederhana: laundry haruslah mudah, terjangkau, dan ramah lingkungan.
            Sejak 2019, kami membuktikan bahwa layanan premium dan keberlanjutan bisa berjalan beriringan.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 to-cyan-50 h-80 flex items-center justify-center border border-sky-100">
                <div className="text-center p-8">
                  <div className="text-8xl font-black text-gradient opacity-20 select-none">50K+</div>
                  <p className="text-sky-600 font-semibold mt-2">Pelanggan Puas</p>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[["50K+", "Pelanggan"], ["4.9★", "Rating"], ["2019", "Berdiri"]].map(([v, l]) => (
                      <div key={l} className="text-center">
                        <div className="text-xl font-bold text-slate-700">{v}</div>
                        <div className="text-xs text-slate-400">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} direction="right">
              <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 mb-4">
                Misi Kami
              </span>
              <h2 className="text-4xl font-bold text-slate-800 mb-5">
                Membuat Pakaian Bersih <span className="text-gradient">Dapat Diakses Semua Orang</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                Kami percaya pakaian bersih bukan kemewahan. Itulah mengapa kami membangun CNC Laundry — layanan yang
                menggabungkan kualitas profesional dengan harga jujur, dikirim langsung ke pintu Anda.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Setiap pesanan mendukung tim spesialis laundry lokal kami yang terlatih, dan proses ramah lingkungan kami
                berarti bumi yang lebih bersih seiring pakaian Anda yang lebih bersih.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 tracking-tight mb-3">
              Nilai yang Kami <span className="text-gradient">Pegang</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-sky-100 transition-all"
                >
                  <div className={`inline-flex p-3 rounded-xl ${bg} mb-4`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 tracking-tight mb-3">
              Perjalanan <span className="text-gradient">Kami</span>
            </h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-sky-100" />
            {milestones.map(({ year, event }, i) => (
              <ScrollReveal key={year} delay={i * 0.08}>
                <div className="flex gap-6 mb-8 items-start">
                  <div className="shrink-0 w-14 text-right">
                    <span className="text-sky-500 font-bold text-sm">{year}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[1.85rem] top-1.5 w-4 h-4 rounded-full bg-sky-100 border-2 border-sky-400" />
                    <p className="text-slate-600 text-sm leading-relaxed pl-2">{event}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 section-gradient">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 tracking-tight mb-3">
              Kenali <span className="text-gradient">Tim Kami</span>
            </h2>
            <p className="text-slate-500">Orang-orang di balik setiap pengiriman bersih.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, avatar, color }, i) => (
              <ScrollReveal key={name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="text-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg`}>
                    {avatar}
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">{name}</h3>
                  <p className="text-slate-400 text-xs mt-1">{role}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
