"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ArrowRight, MessageCircle, Calculator } from "lucide-react";
import { priceCategories, formatPrice } from "@/lib/price-list";

export function PriceEstimator() {
  const [catIdx, setCatIdx] = useState(0);
  const [itemName, setItemName] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const category = priceCategories[catIdx];
  const item = category.items.find((i) => i.name === itemName) ?? null;
  const isCustom = !!item && item.price === null;
  const unit = item?.unit ?? "item";
  const total = item && item.price !== null ? item.price * qty : 0;

  const selectCategory = (i: number) => {
    setCatIdx(i);
    setItemName(null);
    setQty(1);
  };
  const selectItem = (name: string) => {
    setItemName(name);
    setQty(1);
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6 items-start">
      {/* Pilihan layanan */}
      <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-500">Langkah 1</span>
          <h3 className="font-semibold text-slate-800 mt-1 mb-3">Pilih kategori</h3>
          <div className="flex flex-wrap gap-2">
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
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-500">Langkah 2</span>
          <h3 className="font-semibold text-slate-800 mt-1 mb-3">Pilih layanan</h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {category.items.map((it) => {
              const active = it.name === itemName;
              return (
                <button
                  key={it.name}
                  onClick={() => selectItem(it.name)}
                  className={`flex items-center justify-between gap-3 text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    active
                      ? "border-sky-400 bg-sky-50 ring-1 ring-sky-200"
                      : "border-slate-100 hover:border-sky-200 hover:bg-sky-50/40"
                  }`}
                >
                  <span className={active ? "text-slate-800 font-medium" : "text-slate-600"}>{it.name}</span>
                  <span className="shrink-0 text-xs font-semibold text-sky-600">
                    {it.price !== null ? `${formatPrice(it.price)}${it.note ?? ""}` : it.note}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ringkasan estimasi */}
      <div className="lg:col-span-2 lg:sticky lg:top-24">
        <div className="bg-gradient-to-b from-sky-500 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-sky-200">
          <div className="flex items-center gap-2 text-sky-100 text-sm font-medium mb-5">
            <Calculator className="w-4 h-4" />
            Estimasi Biaya
          </div>

          <AnimatePresence mode="wait">
            {!item ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center"
              >
                <p className="text-sky-100 text-sm leading-relaxed">
                  Pilih salah satu layanan di samping untuk melihat estimasi harganya.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-white font-semibold text-lg leading-snug mb-1">{item.name}</p>

                {isCustom ? (
                  <p className="text-sky-100 text-sm mt-3 mb-6">
                    Harga menyesuaikan tingkat kesulitan dan kondisi barang. Hubungi tim kami untuk
                    penawaran yang pasti.
                  </p>
                ) : (
                  <>
                    <p className="text-sky-100 text-sm mb-5">
                      {formatPrice(item.price as number)}
                      <span className="opacity-80"> {item.note ?? `/ ${unit}`}</span>
                    </p>

                    {/* Jumlah */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sky-100 text-sm">Jumlah ({unit})</span>
                      <div className="flex items-center gap-3 bg-white/15 rounded-full px-1.5 py-1">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          aria-label="Kurangi"
                          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-semibold tabular-nums">{qty}</span>
                        <button
                          onClick={() => setQty((q) => q + 1)}
                          aria-label="Tambah"
                          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4 mb-6 flex items-baseline justify-between">
                      <span className="text-sky-100 text-sm">Estimasi total</span>
                      <motion.span
                        key={total}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-black tabular-nums"
                      >
                        {formatPrice(total)}
                      </motion.span>
                    </div>
                  </>
                )}

                <Link href={isCustom ? "/contact" : "/order"}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm bg-white text-sky-600 hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {isCustom ? (
                      <>
                        <MessageCircle className="w-4 h-4" /> Konsultasi Gratis
                      </>
                    ) : (
                      <>
                        Pesan Sekarang <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-slate-400 mt-3">
          *Estimasi. Harga akhir menyesuaikan kondisi & jumlah aktual barang.
        </p>
      </div>
    </div>
  );
}
