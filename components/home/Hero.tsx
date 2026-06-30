"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { FloatingBubbles } from "@/components/effects/FloatingBubbles";
import { WaterRipple } from "@/components/effects/WaterRipple";

function WashingMachineSVG() {
  return (
    <motion.svg
      viewBox="0 0 320 340"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect x="20" y="20" width="280" height="300" rx="24" fill="white" opacity="0.95" />
      <rect x="20" y="20" width="280" height="300" rx="24" fill="none" stroke="rgba(186,230,253,0.8)" strokeWidth="2" />
      <rect x="20" y="20" width="280" height="70" rx="24" fill="rgba(224,242,254,0.8)" />
      <rect x="20" y="70" width="280" height="8" fill="rgba(186,230,253,0.5)" />
      <circle cx="60" cy="52" r="10" fill="rgba(125,211,252,0.6)" />
      <circle cx="90" cy="52" r="7" fill="rgba(186,230,253,0.5)" />
      <circle cx="113" cy="52" r="5" fill="rgba(186,230,253,0.4)" />
      <rect x="155" y="36" width="110" height="32" rx="8" fill="rgba(14,165,233,0.15)" stroke="rgba(125,211,252,0.4)" strokeWidth="1.5" />
      <text x="210" y="58" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="rgba(14,165,233,0.9)" fontWeight="bold">CUCI</text>
      <circle cx="160" cy="210" r="105" fill="rgba(224,242,254,0.3)" />
      <circle cx="160" cy="210" r="100" fill="white" stroke="rgba(186,230,253,0.8)" strokeWidth="2.5" />
      <circle cx="160" cy="210" r="94" fill="none" stroke="rgba(186,230,253,0.6)" strokeWidth="8" />
      <circle cx="160" cy="210" r="90" fill="rgba(240,249,255,0.7)" />
      <clipPath id="drumClip">
        <circle cx="160" cy="210" r="88" />
      </clipPath>
      <g clipPath="url(#drumClip)">
        <rect x="72" y="240" width="176" height="58" fill="rgba(125,211,252,0.35)" />
        <ellipse cx="160" cy="240" rx="88" ry="12" fill="rgba(125,211,252,0.4)" />
        <circle cx="120" cy="250" r="6" fill="rgba(255,255,255,0.7)" />
        <circle cx="148" cy="255" r="4" fill="rgba(255,255,255,0.6)" />
        <circle cx="170" cy="248" r="7" fill="rgba(255,255,255,0.65)" />
        <circle cx="196" cy="253" r="5" fill="rgba(255,255,255,0.6)" />
        <ellipse cx="140" cy="210" rx="28" ry="22" fill="rgba(99,179,237,0.3)" />
        <ellipse cx="185" cy="205" rx="22" ry="18" fill="rgba(147,210,247,0.3)" />
      </g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 160 + 60 * Math.cos(rad);
        const cy = 210 + 60 * Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r="5" fill="rgba(186,230,253,0.5)" />;
      })}
      <motion.circle
        cx="160" cy="210" r="30"
        fill="none"
        stroke="rgba(125,211,252,0.4)"
        strokeWidth="3"
        strokeDasharray="30 60"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ originX: "160px", originY: "210px" }}
      />
      <rect x="225" y="200" width="14" height="20" rx="7" fill="rgba(186,230,253,0.8)" stroke="rgba(125,211,252,0.5)" strokeWidth="1.5" />
      <rect x="35" y="295" width="55" height="12" rx="6" fill="rgba(186,230,253,0.5)" />
      <rect x="100" y="295" width="35" height="12" rx="6" fill="rgba(186,230,253,0.4)" />
    </motion.svg>
  );
}

function DetergentSVG() {
  return (
    <motion.svg
      viewBox="0 0 80 130"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-28"
      animate={{ y: [0, -12, 0], rotate: [0, 3, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="28" y="8" width="24" height="18" rx="6" fill="rgba(14,165,233,0.9)" />
      <rect x="32" y="4" width="16" height="8" rx="4" fill="rgba(56,189,248,0.9)" />
      <rect x="15" y="24" width="50" height="90" rx="14" fill="white" stroke="rgba(186,230,253,0.8)" strokeWidth="2" />
      <rect x="15" y="24" width="50" height="90" rx="14" fill="rgba(224,242,254,0.5)" />
      <rect x="22" y="48" width="36" height="42" rx="8" fill="rgba(14,165,233,0.12)" stroke="rgba(125,211,252,0.4)" strokeWidth="1" />
      <text x="40" y="68" textAnchor="middle" fontSize="7" fontWeight="bold" fill="rgba(14,165,233,0.9)">CNC</text>
      <text x="40" y="80" textAnchor="middle" fontSize="6" fill="rgba(56,189,248,0.8)">LAUNDRY</text>
      <circle cx="32" cy="38" r="4" fill="rgba(125,211,252,0.4)" />
      <circle cx="48" cy="36" r="3" fill="rgba(125,211,252,0.3)" />
      <path d="M65,55 Q78,65 65,80" stroke="rgba(186,230,253,0.8)" strokeWidth="6" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/10 rounded-full blur-3xl" />
      </div>

      <FloatingBubbles count={20} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-200/60 text-sky-700 text-sm font-medium mb-6"
          >
            <Star className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            Laundry Terbaik #1 di Jakarta
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-slate-800 mb-6"
          >
            Pakaian Anda,{" "}
            <span className="text-gradient">Bersih</span>{" "}
            Sempurna
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed mb-10 max-w-md"
          >
            Layanan laundry premium yang diantar langsung ke pintu Anda. Kami merawat setiap pakaian
            dengan sepenuh hati — bersih, wangi, dan rapi sempurna.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/order">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(14,165,233,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-sky-500 text-white font-semibold text-base shadow-lg shadow-sky-200 hover:bg-sky-600 transition-colors"
              >
                Pesan Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full glass border border-sky-200 text-sky-700 font-semibold text-base hover:bg-sky-50/50 transition-colors"
              >
                Lihat Layanan
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-8 mt-14"
          >
            {[
              { value: "50K+", label: "Pelanggan Puas" },
              { value: "4.9★", label: "Rating Rata-rata" },
              { value: "24 Jam", label: "Layanan Ekspres" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-slate-800">{value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full bg-sky-200/40 blur-3xl" />
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-sky-300/30"
              style={{ width: i * 130 + 160, height: i * 130 + 160 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}

          <motion.div
            className="relative w-72 h-80"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <WashingMachineSVG />
          </motion.div>

          <div className="absolute right-4 top-10">
            <DetergentSVG />
          </div>

          <motion.div
            className="absolute left-0 bottom-16 glass px-4 py-3 rounded-2xl shadow-lg shadow-sky-100"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="text-xs text-slate-500">Jemput berikutnya</div>
            <div className="text-sm font-bold text-sky-600">Hari ini, 14:00</div>
          </motion.div>

          <motion.div
            className="absolute right-0 bottom-24 glass px-4 py-3 rounded-2xl shadow-lg shadow-sky-100"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="text-xs text-slate-500 mb-1">Kepuasan</div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <WaterRipple className="bottom-0" />
    </section>
  );
}
