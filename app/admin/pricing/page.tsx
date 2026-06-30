"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { AdminDialog, Field, Input, Textarea } from "@/components/admin/AdminDialog";

interface Plan {
  id: string; name: string; price: string; unit: string;
  description: string; features: unknown; is_highlight: boolean;
  cta_text: string; href: string; display_order: number; active: boolean;
}

const blank: Omit<Plan, "id"> = {
  name: "", price: "", unit: "/kg", description: "", is_highlight: false,
  cta_text: "Mulai Sekarang", href: "/order", display_order: 0, active: true,
  features: JSON.stringify([{ text: "Fitur 1", included: true }], null, 2),
};

export default function AdminPricingPage() {
  const [data, setData] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<{ mode: "add" | "edit"; item?: Plan } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Plan | null>(null);
  const [form, setForm] = useState<Omit<Plan, "id">>(blank);
  const [saving, setSaving] = useState(false);
  const supabase = createSupabaseBrowser();

  const load = async () => {
    const { data } = await supabase.from("pricing").select("*").order("display_order");
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setDialog({ mode: "add" }); };
  const openEdit = (item: Plan) => {
    setForm({ ...item, features: JSON.stringify(item.features, null, 2) });
    setDialog({ mode: "edit", item });
  };

  const handleSave = async () => {
    setSaving(true);
    let features;
    try { features = JSON.parse(form.features as string); } catch { toast.error("Format fitur JSON tidak valid"); setSaving(false); return; }
    const payload = { ...form, features };
    if (dialog?.mode === "add") {
      const { error } = await supabase.from("pricing").insert(payload);
      if (error) { toast.error("Gagal menyimpan"); } else { toast.success("Paket ditambahkan"); }
    } else {
      const { error } = await supabase.from("pricing").update(payload).eq("id", dialog!.item!.id);
      if (error) { toast.error("Gagal memperbarui"); } else { toast.success("Paket diperbarui"); }
    }
    setSaving(false);
    setDialog(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("pricing").delete().eq("id", deleteTarget.id);
    if (error) { toast.error("Gagal menghapus"); } else { toast.success("Paket dihapus"); }
    setDeleteTarget(null);
    load();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const filtered = data.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Harga</h1>
          <p className="text-slate-500 text-sm">{data.length} paket harga</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari paket..." className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-50">
              {["Nama", "Harga", "Satuan", "Highlight", "Urutan", "Aksi"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">Memuat...</td></tr>
                : filtered.length === 0 ? <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">Tidak ada data</td></tr>
                : filtered.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-medium text-slate-800">{row.name}</td>
                    <td className="px-5 py-3 text-slate-600">Rp {row.price}K</td>
                    <td className="px-5 py-3 text-slate-500">{row.unit}</td>
                    <td className="px-5 py-3">
                      {row.is_highlight && <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">★ Highlight</span>}
                    </td>
                    <td className="px-5 py-3 text-slate-500">{row.display_order}</td>
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

      <AdminDialog open={!!dialog} onClose={() => setDialog(null)} title={dialog?.mode === "add" ? "Tambah Paket" : "Edit Paket"} onSubmit={handleSave} loading={saving}>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Nama" required><Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Premium" /></Field>
          <Field label="Harga"><Input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="10" /></Field>
          <Field label="Satuan"><Input value={form.unit} onChange={(e) => set("unit", e.target.value)} placeholder="/kg" /></Field>
        </div>
        <Field label="Deskripsi"><Input value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>
        <Field label="Teks CTA">
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.cta_text} onChange={(e) => set("cta_text", e.target.value)} placeholder="Mulai Sekarang" />
            <Input value={form.href} onChange={(e) => set("href", e.target.value)} placeholder="/order" />
          </div>
        </Field>
        <Field label="Fitur (JSON Array)">
          <Textarea rows={6} value={form.features as string} onChange={(e) => set("features", e.target.value)} className="font-mono text-xs" />
          <p className="text-xs text-slate-400 mt-1">Format: {"[{\"text\": \"Fitur\", \"included\": true}]"}</p>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Urutan"><Input type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))} /></Field>
          <Field label="Opsi">
            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_highlight} onChange={(e) => set("is_highlight", e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm text-slate-600">Highlight (terpopuler)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm text-slate-600">Aktif</span>
              </label>
            </div>
          </Field>
        </div>
      </AdminDialog>

      <AdminDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Hapus Paket" onSubmit={handleDelete} submitLabel="Ya, Hapus" danger>
        <p className="text-slate-600 text-sm">Yakin ingin menghapus paket <strong>{deleteTarget?.name}</strong>?</p>
      </AdminDialog>
    </div>
  );
}
