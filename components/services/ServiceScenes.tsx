import type { ReactNode } from "react";

/**
 * Ilustrasi SVG bermerk per layanan — setiap adegan menampilkan
 * logo CNC Laundry (motif gelombang + wordmark) pada elemen fisik
 * (tote bag, garment bag, hang-tag, shoe box).
 */

// Motif gelombang kecil ala logo (3 garis)
function WaveMark({ x, y, scale = 1, color = "currentColor" }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round">
      <path d="M0 2 Q3 -1 6 2 T12 2" />
      <path d="M0 6 Q3 3 6 6 T12 6" />
      <path d="M0 10 Q3 7 6 10 T12 10" />
    </g>
  );
}

const scenes: Record<string, ReactNode> = {
  // Cuci & Lipat — tote bag berlogo + tumpukan pakaian terlipat
  "wash-fold": (
    <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wf-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e0f2fe" />
          <stop offset="1" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill="url(#wf-bg)" />
      {/* Tumpukan pakaian terlipat */}
      <g transform="translate(60 150)">
        <rect x="0" y="60" width="130" height="26" rx="6" fill="#fff" stroke="#7dd3fc" />
        <rect x="8" y="34" width="114" height="26" rx="6" fill="#f0f9ff" stroke="#7dd3fc" />
        <rect x="16" y="8" width="98" height="26" rx="6" fill="#fff" stroke="#38bdf8" />
        <line x1="65" y1="12" x2="65" y2="30" stroke="#bae6fd" strokeWidth="2" />
      </g>
      {/* Tote bag berlogo */}
      <g transform="translate(220 96)">
        <path d="M10 40 h120 l-8 150 h-104 z" fill="#0ea5e9" />
        <path d="M10 40 h120 l-1.5 28 h-117 z" fill="#0284c7" />
        <path d="M35 40 c0 -30 50 -30 50 0" fill="none" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
        <path d="M55 40 c0 -30 50 -30 50 0" fill="none" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
        {/* Logo pada bag */}
        <g transform="translate(38 96)" fill="#fff">
          <WaveMark x={0} y={0} scale={1.4} color="#fff" />
          <text x="24" y="10" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700">CNC</text>
          <text x="6" y="30" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" opacity="0.9">Laundry</text>
        </g>
      </g>
    </svg>
  ),

  // Dry Cleaning — garment bag berlogo di gantungan
  "dry-cleaning": (
    <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f3ff" />
          <stop offset="1" stopColor="#ddd6fe" />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill="url(#dc-bg)" />
      {/* Rel gantungan */}
      <line x1="80" y1="46" x2="320" y2="46" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(200 40)">
        {/* Hook */}
        <path d="M0 6 c-14 0 -14 -14 0 -14 s14 14 0 14" fill="none" stroke="#7c3aed" strokeWidth="4" />
        {/* Garment bag */}
        <path d="M-70 20 q70 -34 140 0 l-6 240 h-128 z" fill="#8b5cf6" />
        <path d="M-70 20 q70 -34 140 0 l-2 20 q-68 -30 -136 0 z" fill="#7c3aed" />
        <line x1="0" y1="-2" x2="0" y2="258" stroke="#6d28d9" strokeWidth="2" opacity="0.5" />
        {/* Logo panel */}
        <g transform="translate(-40 120)" fill="#fff">
          <rect x="-8" y="-16" width="96" height="60" rx="8" fill="#ffffff" opacity="0.12" />
          <WaveMark x={0} y={0} scale={1.5} color="#fff" />
          <text x="26" y="11" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">CNC</text>
          <text x="0" y="34" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" opacity="0.9">Laundry</text>
        </g>
      </g>
    </svg>
  ),

  // Setrika & Press — kemeja + setrika + hang-tag berlogo
  "ironing": (
    <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ir-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffbeb" />
          <stop offset="1" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill="url(#ir-bg)" />
      {/* Papan */}
      <rect x="40" y="210" width="320" height="20" rx="10" fill="#fff" stroke="#fbbf24" />
      {/* Kemeja terlipat */}
      <g transform="translate(70 150)">
        <path d="M0 20 l30 -20 l30 20 l-10 8 l-6 -4 v40 h-28 v-40 l-6 4 z" fill="#fff" stroke="#f59e0b" />
      </g>
      {/* Setrika */}
      <g transform="translate(200 150)">
        <path d="M0 50 q6 -34 60 -34 h50 v34 z" fill="#f59e0b" />
        <rect x="24" y="6" width="70" height="16" rx="8" fill="#d97706" />
        <path d="M4 50 h106" stroke="#fff" strokeWidth="3" opacity="0.5" />
        {/* Uap */}
        <path d="M18 8 q6 -10 0 -18" stroke="#fcd34d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M34 6 q6 -10 0 -18" stroke="#fcd34d" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* Hang-tag berlogo */}
      <g transform="translate(250 60)">
        <line x1="10" y1="0" x2="10" y2="26" stroke="#d97706" strokeWidth="2" />
        <rect x="-30" y="26" width="80" height="56" rx="8" fill="#f59e0b" />
        <circle cx="10" cy="34" r="4" fill="#fffbeb" />
        <g transform="translate(-18 48)" fill="#fff">
          <WaveMark x={0} y={0} scale={1.1} color="#fff" />
          <text x="18" y="8" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700">CNC</text>
          <text x="0" y="26" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="600" opacity="0.9">Laundry</text>
        </g>
      </g>
    </svg>
  ),

  // Cuci Sepatu — shoe box berlogo + sneaker
  "sneakers": (
    <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sn-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecfdf5" />
          <stop offset="1" stopColor="#a7f3d0" />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill="url(#sn-bg)" />
      {/* Shoe box berlogo */}
      <g transform="translate(60 150)">
        <path d="M0 30 l60 -24 l160 0 l0 90 l-160 24 z" fill="#10b981" />
        <path d="M0 30 l160 0 l60 -24 l-160 0 z" fill="#34d399" />
        <path d="M160 30 l0 90 l60 -24 l0 -90 z" fill="#059669" />
        {/* Logo di sisi box */}
        <g transform="translate(30 66)" fill="#fff">
          <WaveMark x={0} y={0} scale={1.5} color="#fff" />
          <text x="26" y="11" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">CNC</text>
          <text x="0" y="34" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" opacity="0.9">Laundry</text>
        </g>
      </g>
      {/* Sneaker */}
      <g transform="translate(210 210)">
        <path d="M0 30 q10 -40 60 -34 q10 20 40 24 q30 4 40 18 l0 10 l-140 0 z" fill="#fff" stroke="#10b981" strokeWidth="2" />
        <path d="M-2 40 l144 0 l0 8 q-72 8 -144 0 z" fill="#059669" />
        <path d="M50 -6 q6 14 26 20" stroke="#a7f3d0" strokeWidth="3" fill="none" />
        <path d="M60 2 q6 12 24 18" stroke="#a7f3d0" strokeWidth="3" fill="none" />
      </g>
    </svg>
  ),
};

export function ServiceScene({ slug }: { slug: string }) {
  return scenes[slug] ?? null;
}
