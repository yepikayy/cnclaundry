import {
  Package,
  Shirt,
  Layers,
  BedDouble,
  Home,
  Gift,
  Briefcase,
  Footprints,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

type Item = { name: string; price: number | null; note?: string };
type Category = { title: string; icon: React.ElementType; items: Item[] };

// Daftar harga satuan resmi CnC Laundry (sesuai nota cabang Barabai).
const categories: Category[] = [
  {
    title: "Paket Cuci",
    icon: Package,
    items: [
      { name: "Paket Komplit (Cuci + Setrika)", price: 8000, note: "/kg" },
      { name: "Paket Kering Aja", price: 6000, note: "/kg" },
      { name: "Paket Setrika Aja", price: 6000, note: "/kg" },
      { name: "Paket Express (1 hari selesai)", price: 10000, note: "/kg" },
    ],
  },
  {
    title: "Pakaian Formal & Pesta",
    icon: Shirt,
    items: [
      { name: "Setelan Jas", price: 25000 },
      { name: "Jas", price: 17000 },
      { name: "Setelan Safari", price: 18000 },
      { name: "Safari", price: 12000 },
      { name: "Blazer", price: 15000 },
      { name: "Kebaya Pendek", price: 15000 },
      { name: "Kebaya Panjang", price: 20000 },
      { name: "Gaun Pendek", price: 15000 },
      { name: "Gaun Panjang", price: 20000 },
    ],
  },
  {
    title: "Jaket & Selimut",
    icon: Layers,
    items: [
      { name: "Jaket Tipis", price: 12000 },
      { name: "Jaket Tebal", price: 20000 },
      { name: "Jaket Kulit", price: 22000 },
      { name: "Selimut Tipis", price: 12000 },
      { name: "Selimut Tebal", price: 17000 },
    ],
  },
  {
    title: "Perlengkapan Tidur",
    icon: BedDouble,
    items: [
      { name: "Sprei Single (1 set)", price: 10000 },
      { name: "Sprei Double (1 set)", price: 15000 },
      { name: "Bed Cover Single", price: 17000 },
      { name: "Bed Cover Double", price: 22000 },
      { name: "Matras", price: 10000 },
    ],
  },
  {
    title: "Gorden & Karpet",
    icon: Home,
    items: [
      { name: "Cuci Gorden", price: 8000, note: "/m lebar" },
      { name: "Dry Clean Gorden", price: 10000, note: "/m lebar" },
      { name: "Karpet", price: 9000, note: "/m" },
    ],
  },
  {
    title: "Boneka",
    icon: Gift,
    items: [
      { name: "Boneka Mini", price: 5000 },
      { name: "Boneka Kecil", price: 10000 },
      { name: "Boneka Sedang", price: 20000 },
      { name: "Boneka Besar", price: 45000 },
    ],
  },
  {
    title: "Tas",
    icon: Briefcase,
    items: [
      { name: "Tas Kecil", price: 10000 },
      { name: "Tas Sedang", price: 17000 },
      { name: "Tas Besar", price: 27000 },
      { name: "Tas Koper Sedang", price: 30000 },
      { name: "Tas Koper Besar", price: 40000 },
      { name: "Tas Kulit Sedang", price: 17000 },
    ],
  },
  {
    title: "Sepatu",
    icon: Footprints,
    items: [
      { name: "Sepatu Olahraga Biasa", price: 12000 },
      { name: "Sepatu Kulit", price: 15000 },
    ],
  },
  {
    title: "Layanan Khusus",
    icon: Sparkles,
    items: [
      { name: "Noda Berat Pakaian", price: null, note: "Menyesuaikan kondisi" },
    ],
  },
];

const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;

export function PriceListDetail() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <ScrollReveal key={cat.title} delay={i * 0.05}>
            <div className="h-full bg-white border border-slate-100 rounded-2xl p-6 hover:border-sky-100 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-sky-500" />
                </span>
                <h3 className="font-semibold text-slate-800 text-sm">{cat.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="flex items-baseline gap-1 shrink-0 text-right">
                      {item.price !== null ? (
                        <>
                          <span className="font-semibold text-slate-800">{formatPrice(item.price)}</span>
                          {item.note && <span className="text-xs text-slate-400">{item.note}</span>}
                        </>
                      ) : (
                        <span className="text-xs font-medium text-sky-600">{item.note}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
