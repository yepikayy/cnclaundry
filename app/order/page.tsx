"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, MapPin, Package, Check, ChevronRight, Minus, Plus, MessageCircle } from "lucide-react";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { ErrorMessage } from "@/components/ui/StateComponents";
import { createOrder } from "@/lib/db";
import { priceCategories, formatPrice } from "@/lib/price-list";
import { LAUNDRY_WHATSAPP, QRIS_IMAGE, waLink } from "@/lib/config";

const STEPS = ["Layanan", "Jadwal", "Alamat", "Konfirmasi"];
const TIME_SLOTS = ["08:00 – 10:00", "10:00 – 12:00", "13:00 – 15:00", "15:00 – 17:00", "17:00 – 19:00"];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

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
  const [catIdx, setCatIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const category = priceCategories[catIdx];
  const item = category.items.find((i) => i.name === form.service_name) ?? null;
  const isCustom = !!item && item.price === null;
  const unit = item?.unit ?? "item";
  const estimate = item && item.price !== null ? item.price * qty : 0;
  const estimateLabel = isCustom
    ? "Menyesuaikan kondisi"
    : item
      ? formatPrice(estimate)
      : "";

  const set = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const selectCategory = (i: number) => {
    setCatIdx(i);
    setQty(1);
    setForm((f) => ({ ...f, service_slug: "", service_name: "" }));
  };
  const selectItem = (name: string) => {
    setQty(1);
    setForm((f) => ({ ...f, service_slug: slugify(name), service_name: name }));
  };

  const canNext = () => {
    if (step === 0) return !!form.service_slug;
    if (step === 1) return !!form.date && !!form.time;
    if (step === 2) return !!form.name.trim() && !!form.phone.trim() && !!form.address.trim();
    return true;
  };

  const buildNotes = () => {
    const estimateNote = item
      ? isCustom
        ? `${item.name} — harga menyesuaikan kondisi`
        : `Estimasi: ${qty} ${unit} × ${item.name} = ${formatPrice(estimate)}`
      : "";
    return [form.notes.trim(), estimateNote].filter(Boolean).join(" | ") || undefined;
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
        notes: buildNotes(),
      });
    } catch (e: unknown) {
      // Database tidak bisa dihubungi (mis. env Supabase belum di-set atau project
      // sedang di-pause). Jangan sampai pesanan hilang — tetap arahkan pelanggan ke
      // layar konfirmasi agar order dikirim lengkap lewat WhatsApp.
      console.error("createOrder gagal, lanjut lewat WhatsApp:", e);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    const payMessage =
      `Halo CnC Laundry, saya ingin konfirmasi pesanan:\n` +
      `• Nama: ${form.name}\n` +
      `• Telepon: ${form.phone}\n` +
      `• Layanan: ${form.service_name}\n` +
      `• Estimasi: ${estimateLabel}\n` +
      `• Jemput: ${form.date}, ${form.time}\n` +
      `• Alamat: ${form.address}\n` +
      (form.notes ? `• Catatan: ${form.notes}\n` : "") +
      `\nBerikut saya lampirkan bukti pembayarannya. Terima kasih 🙏`;

    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="glass rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl shadow-sky-100"
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
            Selesaikan pembayaran di bawah ini, lalu kirim bukti via WhatsApp agar pesanan Anda kami proses.
          </p>
          <div className="bg-sky-50 rounded-2xl p-4 text-left mb-6 space-y-2">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">Ringkasan Pesanan</div>
            {[
              ["Layanan", form.service_name],
              ["Estimasi", estimateLabel],
              ["Tanggal", form.date],
              ["Waktu", form.time],
              ["Nama", form.name],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm gap-4">
                <span className="text-slate-500 shrink-0">{label}</span>
                <span className="text-slate-700 font-medium text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Pembayaran QRIS */}
          <div className="border-t border-slate-200 pt-6 mb-6">
            <h3 className="font-bold text-slate-800 mb-1">Pembayaran QRIS</h3>
            <p className="text-slate-500 text-sm mb-4">
              Scan QRIS berikut dengan e-wallet atau m-banking Anda.
            </p>
            <div className="flex justify-center mb-4">
              <Image
                src={QRIS_IMAGE}
                alt="QRIS CnC Laundry"
                width={240}
                height={313}
                unoptimized
                className="rounded-2xl border border-slate-100 shadow-sm w-56 h-auto"
              />
            </div>
            <a href={waLink(LAUNDRY_WHATSAPP, payMessage)} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Sudah Bayar? Kirim Bukti via WhatsApp
              </motion.button>
            </a>
            <p className="text-xs text-slate-400 mt-2">
              Tombol akan membuka WhatsApp. Lampirkan screenshot bukti transfer Anda di sana.
            </p>
          </div>

          <button
            onClick={() => { setSubmitted(false); setStep(0); setForm(emptyForm); setCatIdx(0); setQty(1); }}
            className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
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

                {/* Kategori */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {priceCategories.map((cat, i) => {
                    const Icon = cat.icon;
                    const active = i === catIdx;
                    return (
                      <button
                        key={cat.title}
                        onClick={() => selectCategory(i)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                          active
                            ? "bg-sky-500 text-white shadow-md shadow-sky-100"
                            : "bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {cat.title}
                      </button>
                    );
                  })}
                </div>

                {/* Item */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {category.items.map((it) => {
                    const active = it.name === form.service_name;
                    return (
                      <motion.button
                        key={it.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectItem(it.name)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          active
                            ? "border-sky-400 bg-sky-50 shadow-md shadow-sky-100"
                            : "border-slate-100 hover:border-sky-200"
                        }`}
                      >
                        <div className="font-semibold text-slate-800 text-sm mb-1">{it.name}</div>
                        <div className="text-sky-500 text-sm font-medium">
                          {it.price !== null ? `${formatPrice(it.price)}${it.note ?? ""}` : it.note}
                        </div>
                        {active && (
                          <div className="mt-2 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Jumlah + estimasi */}
                {item && !isCustom && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 rounded-2xl bg-sky-50 border border-sky-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-slate-700">Jumlah ({unit})</span>
                      <div className="flex items-center gap-3 bg-white rounded-full px-1.5 py-1 border border-sky-100">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          aria-label="Kurangi"
                          className="w-7 h-7 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-semibold tabular-nums text-slate-700">{qty}</span>
                        <button
                          onClick={() => setQty((q) => q + 1)}
                          aria-label="Tambah"
                          className="w-7 h-7 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-sky-100 pt-3">
                      <span className="text-sm text-slate-600">Estimasi total</span>
                      <span className="text-2xl font-black text-sky-600 tabular-nums">{formatPrice(estimate)}</span>
                    </div>
                  </motion.div>
                )}

                {item && isCustom && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 rounded-2xl bg-sky-50 border border-sky-100 text-sm text-slate-600"
                  >
                    Harga untuk layanan ini menyesuaikan tingkat kesulitan & kondisi barang. Tim kami akan
                    mengonfirmasi estimasi pastinya saat penjemputan.
                  </motion.div>
                )}

                <p className="text-xs text-slate-400 mt-4">
                  *Estimasi. Harga akhir menyesuaikan kondisi & jumlah aktual barang saat penimbangan.
                </p>
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
                    ["Estimasi", estimateLabel],
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
