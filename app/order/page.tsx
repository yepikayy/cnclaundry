"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, MapPin, Package, Check, ChevronRight } from "lucide-react";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/StateComponents";
import { supabase } from "@/lib/supabase";
import { createOrder } from "@/lib/db";
import type { Service } from "@/lib/db";

const STEPS = ["Layanan", "Jadwal", "Alamat", "Konfirmasi"];
const TIME_SLOTS = ["08:00 – 10:00", "10:00 – 12:00", "13:00 – 15:00", "15:00 – 17:00", "17:00 – 19:00"];

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = step < current;
  const active = step === current;
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{ backgroundColor: done || active ? "#0ea5e9" : "#f1f5f9", scale: active ? 1.1 : 1 }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
        style={{ color: done || active ? "white" : "#94a3b8" }}
      >
        {done ? <Check className="w-4 h-4" /> : step + 1}
      </motion.div>
      <span className={`hidden sm:block text-sm font-medium ${active ? "text-sky-600" : done ? "text-sky-400" : "text-slate-400"}`}>
        {STEPS[step]}
      </span>
    </div>
  );
}

type FormState = {
  service_slug: string;
  service_name: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
};

const emptyForm: FormState = {
  service_slug: "", service_name: "", date: "", time: "",
  name: "", phone: "", address: "", notes: "",
};

export default function OrderPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("services")
      .select("id, slug, name, price, turnaround, subtitle, description, features, badge, badge_color, gradient, light_bg, display_order")
      .eq("active", true)
      .order("display_order")
      .then(({ data, error }) => {
        if (!error && data) setServices(data);
        setLoadingServices(false);
      });
  }, []);

  const set = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canNext = () => {
    if (step === 0) return !!form.service_slug;
    if (step === 1) return !!form.date && !!form.time;
    if (step === 2) return !!form.name.trim() && !!form.phone.trim() && !!form.address.trim();
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await createOrder({
        service_slug: form.service_slug,
        service_name: form.service_name,
        pickup_date: form.date,
        time_slot: form.time,
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        notes: form.notes || undefined,
      });
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan pesanan. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="glass rounded-3xl p-12 max-w-md w-full text-center shadow-2xl shadow-sky-100"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-sky-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Pesanan Diterima!</h2>
          <p className="text-slate-500 mb-6">
            Kami akan mengirimkan konfirmasi ke nomor telepon Anda. Kurir kami akan tiba sesuai waktu yang dipilih.
          </p>
          <div className="bg-sky-50 rounded-2xl p-4 text-left mb-8 space-y-2">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">Ringkasan Pesanan</div>
            {[
              ["Layanan", form.service_name],
              ["Tanggal", form.date],
              ["Waktu", form.time],
              ["Nama", form.name],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setForm(emptyForm); }}
            className="w-full py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors"
          >
            Buat Pesanan Lain
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <section className="relative pt-28 pb-16 hero-gradient overflow-hidden">
        <FloatingBubbles count={8} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4"
          >
            Buat <span className="text-gradient">Pesanan</span>
          </motion.h1>
          <p className="text-slate-500">Kurang dari 2 menit. Sisanya biar kami yang urus.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-12">
            {STEPS.map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <StepIndicator step={i} current={step} />
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block w-12 lg:w-24 h-0.5 bg-slate-100 mx-1">
                    <motion.div
                      className="h-full bg-sky-300 rounded-full"
                      animate={{ width: step > i ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0 — Pilih Layanan */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-bold text-slate-800">Pilih Layanan</h2>
                </div>
                {loadingServices ? (
                  <LoadingSpinner text="Memuat layanan..." />
                ) : services.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-8">Layanan tidak tersedia.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <motion.button
                        key={s.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { set("service_slug", s.slug); set("service_name", s.name); }}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${
                          form.service_slug === s.slug
                            ? "border-sky-400 bg-sky-50 shadow-md shadow-sky-100"
                            : "border-slate-100 hover:border-sky-200"
                        }`}
                      >
                        <div className="font-semibold text-slate-800 mb-1">{s.name}</div>
                        <div className="text-sky-500 text-sm font-medium">{s.price}</div>
                        <div className="text-slate-400 text-xs mt-1">{s.turnaround}</div>
                        {form.service_slug === s.slug && (
                          <div className="mt-2 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 1 — Jadwal */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-2 mb-6">
                  <CalendarCheck className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-bold text-slate-800">Jadwalkan Penjemputan</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Jemput</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-slate-700 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Slot Waktu</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => set("time", t)}
                          className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                            form.time === t
                              ? "border-sky-400 bg-sky-50 text-sky-600"
                              : "border-slate-100 text-slate-600 hover:border-sky-200"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Alamat */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-bold text-slate-800">Data Anda</h2>
                </div>
                <div className="space-y-4">
                  {([
                    { label: "Nama Lengkap", field: "name" as const, type: "text", placeholder: "Budi Santoso" },
                    { label: "Nomor Telepon", field: "phone" as const, type: "tel", placeholder: "+62 812-3456-7890" },
                    { label: "Alamat Penjemputan", field: "address" as const, type: "text", placeholder: "Jl. Ir Juanda Mamuju, Tabalong" },
                  ]).map(({ label, field, type, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={(e) => set(field, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-slate-700 placeholder-slate-300 transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Catatan Khusus <span className="text-slate-400 font-normal">(opsional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Contoh: detergen bebas pewangi, taruh di depan pintu..."
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-slate-700 placeholder-slate-300 transition-all resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Konfirmasi */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Konfirmasi Pesanan</h2>
                <div className="bg-sky-50 rounded-2xl p-6 space-y-4 mb-6">
                  {([
                    ["Layanan", form.service_name],
                    ["Tanggal", form.date],
                    ["Slot Waktu", form.time],
                    ["Nama", form.name],
                    ["Telepon", form.phone],
                    ["Alamat", form.address],
                    ...(form.notes ? [["Catatan", form.notes]] : []),
                  ] as [string, string][]).map(([label, value]) => (
                    <div key={label} className="flex justify-between items-start gap-4">
                      <span className="text-sm text-slate-500 shrink-0">{label}</span>
                      <span className="text-sm text-slate-800 font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
                {error && <ErrorMessage message={error} />}
                <p className="text-xs text-slate-400 mt-4 text-center">
                  Dengan memesan Anda menyetujui{" "}
                  <span className="text-sky-500 cursor-pointer hover:underline">Syarat & Ketentuan</span> kami.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:border-sky-200 hover:text-sky-600 transition-all ${step === 0 ? "invisible" : ""}`}
            >
              Kembali
            </button>

            {step < 3 ? (
              <motion.button
                whileHover={{ scale: canNext() ? 1.04 : 1 }}
                whileTap={{ scale: canNext() ? 0.97 : 1 }}
                onClick={() => canNext() && setStep((s) => s + 1)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  canNext()
                    ? "bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-100"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                Lanjut <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: submitting ? 1 : 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-100 hover:bg-sky-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Menyimpan..." : <><Check className="w-4 h-4" /> Konfirmasi Pesanan</>}
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
