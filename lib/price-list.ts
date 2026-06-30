import type { ElementType } from "react";
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

export type PriceItem = {
  name: string;
  price: number | null;
  /** Suffix shown after the price, e.g. "/kg". When price is null, holds the label. */
  note?: string;
  /** Quantity unit used by the estimator. Defaults to "item". */
  unit?: string;
};

export type PriceCategory = {
  title: string;
  icon: ElementType;
  items: PriceItem[];
};

// Daftar harga satuan resmi CnC Laundry (sesuai nota cabang Barabai).
export const priceCategories: PriceCategory[] = [
  {
    title: "Paket Cuci",
    icon: Package,
    items: [
      { name: "Paket Komplit (Cuci + Setrika)", price: 8000, note: "/kg", unit: "kg" },
      { name: "Paket Kering Aja", price: 6000, note: "/kg", unit: "kg" },
      { name: "Paket Setrika Aja", price: 6000, note: "/kg", unit: "kg" },
      { name: "Paket Express (1 hari selesai)", price: 10000, note: "/kg", unit: "kg" },
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
      { name: "Cuci Gorden", price: 8000, note: "/m lebar", unit: "meter" },
      { name: "Dry Clean Gorden", price: 10000, note: "/m lebar", unit: "meter" },
      { name: "Karpet", price: 9000, note: "/m", unit: "meter" },
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

export const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
