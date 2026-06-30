"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";

const contactInfo = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Bersih No. 12, Kebayoran Baru, Jakarta Selatan 12110",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: Phone,
    label: "Telepon",
    value: "+62 812-3456-7890",
    href: "tel:+6281234567890",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@cnclaundry.id",
    href: "mailto:hello@cnclaundry.id",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    label: "Jam Buka",
    value: "Sen–Jum 07:00–21:00 · Sabtu 08:00–20:00 · Minggu 09:00–18:00",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email valid diperlukan";
    if (!form.subject.trim()) e.subject = "Subjek wajib diisi";
    if (!form.message.trim()) e.message = "Pesan wajib diisi";
    setError(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <FloatingBubbles count={10} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-sky-200 text-sky-600 text-sm font-medium mb-5"
          >
            Hubungi Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-slate-800 tracking-tight mb-5"
          >
            Kami Siap <span className="text-gradient">Membantu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg"
          >
            Pertanyaan, kemitraan, atau masukan — tim kami membalas dalam 2 jam.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Informasi Kontak</h2>
              </ScrollReveal>
              {contactInfo.map(({ icon: Icon, label, value, href, color, bg }, i) => (
                <ScrollReveal key={label} delay={i * 0.08}>
                  <div className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-sky-100 transition-all">
                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm text-slate-700 hover:text-sky-500 transition-colors font-medium">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">{value}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1}>
                {sent ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-5">
                      <Check className="w-8 h-8 text-sky-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Pesan Terkirim!</h3>
                    <p className="text-slate-500 max-w-sm">
                      Terima kasih sudah menghubungi kami. Tim kami akan membalas dalam 2 jam.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-8 px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors"
                    >
                      Kirim Pesan Lain
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "Nama Lengkap", field: "name", type: "text", placeholder: "Budi Santoso" },
                        { label: "Alamat Email", field: "email", type: "email", placeholder: "budi@email.com" },
                      ].map(({ label, field, type, placeholder }) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            value={form[field as keyof typeof form]}
                            onChange={(e) => set(field, e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-100 text-slate-700 placeholder-slate-300 transition-all ${
                              error[field] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-sky-400"
                            }`}
                          />
                          {error[field] && <p className="text-red-400 text-xs mt-1">{error[field]}</p>}
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subjek</label>
                      <input
                        type="text"
                        placeholder="Bagaimana kami bisa membantu?"
                        value={form.subject}
                        onChange={(e) => set("subject", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-100 text-slate-700 placeholder-slate-300 transition-all ${
                          error.subject ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-sky-400"
                        }`}
                      />
                      {error.subject && <p className="text-red-400 text-xs mt-1">{error.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Pesan</label>
                      <textarea
                        rows={5}
                        placeholder="Ceritakan apa pun kepada kami..."
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-100 text-slate-700 placeholder-slate-300 transition-all resize-none ${
                          error.message ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-sky-400"
                        }`}
                      />
                      {error.message && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors shadow-md shadow-sky-100"
                    >
                      <Send className="w-4 h-4" /> Kirim Pesan
                    </motion.button>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
