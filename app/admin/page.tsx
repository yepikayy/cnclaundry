"use client";

import { useEffect, useState } from "react";
import { Package, Tag, MessageSquare, ShoppingBag, HelpCircle, Image, TrendingUp, Clock } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { motion } from "framer-motion";

interface Stats {
  services: number;
  pricing: number;
  testimonials: number;
  faq: number;
  gallery: number;
  orders: number;
  pendingOrders: number;
}

interface Order {
  id: string;
  customer_name: string;
  service_name: string;
  pickup_date: string;
  status: string;
  created_at: string;
}

const statCards = (s: Stats) => [
  { label: "Total Pesanan", value: s.orders, icon: ShoppingBag, color: "bg-sky-500", light: "bg-sky-50 text-sky-600" },
  { label: "Pesanan Pending", value: s.pendingOrders, icon: Clock, color: "bg-amber-500", light: "bg-amber-50 text-amber-600" },
  { label: "Layanan Aktif", value: s.services, icon: Package, color: "bg-violet-500", light: "bg-violet-50 text-violet-600" },
  { label: "Testimoni", value: s.testimonials, icon: MessageSquare, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600" },
  { label: "FAQ", value: s.faq, icon: HelpCircle, color: "bg-pink-500", light: "bg-pink-50 text-pink-600" },
  { label: "Galeri", value: s.gallery, icon: Image, color: "bg-cyan-500", light: "bg-cyan-50 text-cyan-600" },
];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-violet-100 text-violet-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, pricing: 0, testimonials: 0, faq: 0, gallery: 0, orders: 0, pendingOrders: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowser();

  useEffect(() => {
    async function load() {
      const [
        { count: services },
        { count: pricing },
        { count: testimonials },
        { count: faq },
        { count: gallery },
        { count: orders },
        { count: pendingOrders },
        { data: recentOrders },
      ] = await Promise.all([
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("pricing").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("faq").select("*", { count: "exact", head: true }),
        supabase.from("gallery").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("orders").select("id,customer_name,service_name,pickup_date,status,created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        services: services ?? 0, pricing: pricing ?? 0,
        testimonials: testimonials ?? 0, faq: faq ?? 0,
        gallery: gallery ?? 0, orders: orders ?? 0, pendingOrders: pendingOrders ?? 0,
      });
      setOrders(recentOrders ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Selamat datang di panel admin CNC Laundry</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards(stats).map(({ label, value, icon: Icon, light }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 16 : 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-sky-100 hover:shadow-sm transition-all"
          >
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${light} mb-3`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{loading ? "—" : value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-500" />
            <h2 className="font-semibold text-slate-800 text-sm">Pesanan Terbaru</h2>
          </div>
          <a href="/admin/orders" className="text-sky-500 text-xs hover:underline">Lihat semua</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-50">
                {["Pelanggan", "Layanan", "Tanggal Jemput", "Status"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">Memuat...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">Belum ada pesanan</td></tr>
              ) : orders.map((o) => (
                <tr key={o.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-3 font-medium text-slate-700">{o.customer_name}</td>
                  <td className="px-6 py-3 text-slate-500">{o.service_name}</td>
                  <td className="px-6 py-3 text-slate-500">{o.pickup_date}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[o.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
