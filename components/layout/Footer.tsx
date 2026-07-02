import Link from "next/link";
import { Waves, MapPin, Mail, Clock } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/pricing", label: "Harga" },
  { href: "/order", label: "Pesan Sekarang" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
];

const hours = [
  { day: "Senin – Jumat", time: "08:00 – 17:30, 19:00 – 21:00" },
  { day: "Sabtu", time: "08:00 – 20:00" },
  { day: "Minggu", time: "09:00 – 18:00" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="relative overflow-hidden h-16 bg-gradient-to-b from-sky-50 to-slate-900">
        <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#0f172a" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Waves className="w-6 h-6 text-sky-400" />
              <span className="text-white font-bold text-xl">CNC Laundry</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Layanan laundry premium yang merawat setiap pakaian Anda dengan penuh perhatian. Baju bersih, hidup bahagia.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span>Jl. Ir Juanda Mamuju, Pembataan, Kec. Murung Pudak, Kab. Tabalong, Kalimantan Selatan 71571</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:hello@cnclaundry.id" className="hover:text-sky-400 transition-colors">hello@cnclaundry.id</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Jam Operasional</h3>
            <ul className="space-y-2">
              {hours.map(({ day, time }) => (
                <li key={day} className="flex items-start gap-2 text-sm">
                  <Clock className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-300">{day}</span>
                    <br />
                    <span className="text-sky-400 font-medium">{time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} CNC Laundry. Semua hak dilindungi.</span>
          <span>Dibuat dengan ❤️ di Indonesia 🇮🇩</span>
        </div>
      </div>
    </footer>
  );
}
