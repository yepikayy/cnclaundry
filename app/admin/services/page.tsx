"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { AdminDialog, Field, Input, Textarea } from "@/components/admin/AdminDialog";

interface Service {
  id: string; slug: string; name: string; subtitle: string;
  price: string; turnaround: string; description: string;
  features: string[]; badge: string; badge_color: string;
  gradient: string; light_bg: string; display_order: number; active: boolean;
}

const blank: Omit<Service, "id"> = {
  slug: "", name: "", subtitle: "", price: "", turnaround: "",
  description: "", features: [], badge: "", badge_color: "bg-sky-100 text-sky-700",
  gradient: "from-sky-400 to-sky-600", light_bg: "bg-sky-50", display_order: 0, active: true,
};

export default function AdminServicesPage() {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<{ mode: "add" | "edit"; item?: Service } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(blank);
  const [saving, setSaving] = useState(false);
  const supabase = createSupabaseBrowser();

  const load = async () => {
    const { data } = await supabase.from("services").select("*").order("display_order");
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setDialog({ mode: "add" }); };
  const openEdit = (item: Service) => {
    setForm({ ...item });
    setDialog({ mode: "edit", item });
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, features: typeof form.features === "string" ? (form.features as unknown as string).split("\n").filter(Boolean) : form.features };
    if (dialog?.mode === "add") {
      const { error } = await supabase.from("services").insert(payload);
      if (error) { toast.error("Gagal menyimpan"); } else { toast.success("Layanan ditambahkan"); }
    } else {
      const { error } = await supabase.from("services").update(payload).eq("id", dialog!.item!.id);
      if (error) { toast.error("Gagal memperbarui"); } else { toast.success("Layanan diperbarui"); }
    }
    setSaving(false);
    setDialog(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("services").delete().eq("id", deleteTarget.id);
    if (error) { toast.error("Gagal menghapus"); } else { toast.success("Layanan dihapus"); }
    setDeleteTarget(null);
    load();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const filtered = data.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.slug.includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Layanan</h1>
          <p className="text-slate-500 text-sm">{data.length} layanan terdaftar</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari layanan..." className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-50">
              {["Nama", "Slug", "Harga", "Waktu", "Urutan", "Aktif", "Aksi"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={7} className="px-5 py-10 text-center text-slate-400">Memuat...</td></tr>
                : filtered.length === 0 ? <tr><td colSpan={7} className="px-5 py-10 text-center text-slate-400">Tidak ada data</td></tr>
                : filtered.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-medium text-slate-800">{row.name}</td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-xs">{row.slug}</td>
                    <td className="px-5 py-3 text-slate-600">{row.price}</td>
                    <td className="px-5 py-3 text-slate-500">{row.turnaround}</td>
                    <td className="px-5 py-3 text-slate-500">{row.display_order}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${row.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {row.active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(row)} aria-label="Edit" className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-500 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteTarget(row)} aria-label="Hapus" className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AdminDialog open={!!dialog} onClose={() => setDialog(null)} title={dialog?.mode === "add" ? "Tambah Layanan" : "Edit Layanan"} onSubmit={handleSave} loading={saving}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nama" required><Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Cuci & Lipat" /></Field>
          <Field label="Slug" required><Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="wash-fold" /></Field>
        </div>
        <Field label="Subtitle"><Input value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Harga"><Input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="Rp 10K / kg" /></Field>
          <Field label="Waktu Pengerjaan"><Input value={form.turnaround} onChange={(e) => set("turnaround", e.target.value)} placeholder="2 hari" /></Field>
        </div>
        <Field label="Deskripsi"><Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>
        <Field label="Fitur (satu per baris)"><Textarea rows={4} value={Array.isArray(form.features) ? form.features.join("\n") : form.features} onChange={(e) => set("features", e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Badge"><Input value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Terpopuler" /></Field>
          <Field label="Urutan"><Input type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))} /></Field>
        </div>
        <Field label="Aktif">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 rounded" />
            <span className="text-sm text-slate-600">Tampilkan di website</span>
          </label>
        </Field>
      </AdminDialog>

      {/* Delete Confirm */}
      <AdminDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Hapus Layanan" onSubmit={handleDelete} submitLabel="Ya, Hapus" danger>
        <p className="text-slate-600 text-sm">Yakin ingin menghapus layanan <strong>{deleteTarget?.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
      </AdminDialog>
    </div>
  );
}
