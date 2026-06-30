"use client";

import { useEffect, useState } from "react";
import { Trash2, Search, Filter, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { AdminDialog } from "@/components/admin/AdminDialog";
import { waLink } from "@/lib/config";

interface Order {
  id: string; service_slug: string; service_name: string;
  pickup_date: string; time_slot: string; customer_name: string;
  phone: string; address: string; notes: string;
  status: string; created_at: string;
}

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-violet-100 text-violet-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUSES = ["semua", "pending", "confirmed", "processing", "completed", "cancelled"];

const waChatMessage = (o: { customer_name: string; service_name: string }) =>
  `Halo ${o.customer_name}, ini CnC Laundry mengenai pesanan *${o.service_name}* Anda. `;

const waDoneMessage = (o: { customer_name: string; service_name: string }) =>
  `Halo ${o.customer_name}, pesanan *${o.service_name}* Anda di CnC Laundry sudah *SELESAI* dan siap diantar/diambil. ` +
  `Berikut kami lampirkan foto hasil laundry Anda. Terima kasih sudah mempercayakan cucian Anda kepada CnC Laundry! 🙏`;

export default function AdminOrdersPage() {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [detail, setDetail] = useState<Order | null>(null);
  const supabase = createSupabaseBrowser();

  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("orders").delete().eq("id", deleteTarget.id);
    if (error) { toast.error("Gagal menghapus"); } else { toast.success("Pesanan dihapus"); }
    setDeleteTarget(null);
    load();
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { toast.error("Gagal mengubah status"); } else {
      toast.success("Status diperbarui");
      load();
    }
  };

  const filtered = data.filter((d) => {
    const matchSearch =
      d.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.service_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "semua" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const fmt = (iso: string) => new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Pesanan</h1>
        <p className="text-slate-500 text-sm">{data.length} total pesanan</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100">
        {/* Filters */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama, telepon, layanan..." className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-50">
              {["Pelanggan", "Telepon", "Layanan", "Tgl Jemput", "Waktu", "Status", "Masuk", "Aksi"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={8} className="px-5 py-10 text-center text-slate-400">Memuat...</td></tr>
                : filtered.length === 0 ? <tr><td colSpan={8} className="px-5 py-10 text-center text-slate-400">Tidak ada pesanan</td></tr>
                : filtered.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 cursor-pointer" onClick={() => setDetail(row)}>
                    <td className="px-5 py-3 font-medium text-slate-800">{row.customer_name}</td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-xs">{row.phone}</td>
                    <td className="px-5 py-3 text-slate-600">{row.service_name}</td>
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{row.pickup_date}</td>
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap text-xs">{row.time_slot}</td>
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-200 ${statusColor[row.status] ?? "bg-slate-100 text-slate-600"}`}
                      >
                        {["pending","confirmed","processing","completed","cancelled"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs whitespace-nowrap">{fmt(row.created_at)}</td>
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1">
                        <a href={waLink(row.phone, waChatMessage(row))} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp customer" className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 transition-colors"><MessageCircle className="w-4 h-4" /></a>
                        <button onClick={() => setDeleteTarget(row)} aria-label="Hapus pesanan" className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Dialog */}
      <AdminDialog open={!!detail} onClose={() => setDetail(null)} title="Detail Pesanan" onSubmit={() => setDetail(null)} submitLabel="Tutup">
        {detail && (
          <div className="space-y-3">
            {[
              ["ID", detail.id.slice(0, 8) + "..."],
              ["Pelanggan", detail.customer_name],
              ["Telepon", detail.phone],
              ["Layanan", detail.service_name],
              ["Tanggal Jemput", detail.pickup_date],
              ["Slot Waktu", detail.time_slot],
              ["Alamat", detail.address],
              ...(detail.notes ? [["Catatan", detail.notes]] : []),
              ["Status", detail.status],
              ["Dibuat", new Date(detail.created_at).toLocaleString("id-ID")],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-3">
                <span className="text-xs text-slate-400 w-28 shrink-0 font-medium uppercase tracking-wide pt-0.5">{label}</span>
                <span className="text-sm text-slate-700">{value}</span>
              </div>
            ))}

            {/* Aksi WhatsApp ke customer */}
            <div className="pt-4 mt-1 border-t border-slate-100 space-y-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Hubungi Customer (WhatsApp)</span>
              <div className="grid grid-cols-1 gap-2">
                <a
                  href={waLink(detail.phone, waChatMessage(detail))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-200 text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat / Update Pesanan
                </a>
                <a
                  href={waLink(detail.phone, waDoneMessage(detail))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Kirim Foto &quot;Pesanan Selesai&quot;
                </a>
              </div>
              <p className="text-xs text-slate-400">
                Pesan otomatis terisi. Lampirkan foto hasil laundry langsung di WhatsApp.
              </p>
            </div>
          </div>
        )}
      </AdminDialog>

      {/* Delete Confirm */}
      <AdminDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Hapus Pesanan" onSubmit={handleDelete} submitLabel="Ya, Hapus" danger>
        <p className="text-slate-600 text-sm">Yakin ingin menghapus pesanan dari <strong>{deleteTarget?.customer_name}</strong>? Data tidak dapat dikembalikan.</p>
      </AdminDialog>
    </div>
  );
}
