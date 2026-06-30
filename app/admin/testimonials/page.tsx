"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { AdminDialog, Field, Input, Textarea } from "@/components/admin/AdminDialog";

interface Testimonial {
  id: string; name: string; role: string; avatar_initials: string;
  rating: number; content: string; gradient: string; active: boolean;
}

const blank: Omit<Testimonial, "id"> = {
  name: "", role: "", avatar_initials: "", rating: 5,
  content: "", gradient: "from-sky-400 to-sky-600", active: true,
};

export default function AdminTestimonialsPage() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<{ mode: "add" | "edit"; item?: Testimonial } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(blank);
  const [saving, setSaving] = useState(false);
  const supabase = createSupabaseBrowser();

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setDialog({ mode: "add" }); };
  const openEdit = (item: Testimonial) => { setForm({ ...item }); setDialog({ mode: "edit", item }); };

  const handleSave = async () => {
    setSaving(true);
    if (dialog?.mode === "add") {
      const { error } = await supabase.from("testimonials").insert(form);
      if (error) { toast.error("Gagal menyimpan"); } else { toast.success("Testimoni ditambahkan"); }
    } else {
      const { error } = await supabase.from("testimonials").update(form).eq("id", dialog!.item!.id);
      if (error) { toast.error("Gagal memperbarui"); } else { toast.success("Testimoni diperbarui"); }
    }
    setSaving(false);
    setDialog(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", deleteTarget.id);
    if (error) { toast.error("Gagal menghapus"); } else { toast.success("Testimoni dihapus"); }
    setDeleteTarget(null);
    load();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const filtered = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Testimoni</h1>
          <p className="text-slate-500 text-sm">{data.length} testimoni</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari testimoni..." className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-50">
              {["Nama", "Peran", "Rating", "Isi", "Aktif", "Aksi"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">Memuat...</td></tr>
                : filtered.length === 0 ? <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">Tidak ada data</td></tr>
                : filtered.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${row.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{row.avatar_initials}</div>
                        <span className="font-medium text-slate-800">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{row.role}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-0.5">{Array.from({ length: row.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                    </td>
                    <td className="px-5 py-3 text-slate-500 max-w-[200px] truncate">{row.content}</td>
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

      <AdminDialog open={!!dialog} onClose={() => setDialog(null)} title={dialog?.mode === "add" ? "Tambah Testimoni" : "Edit Testimoni"} onSubmit={handleSave} loading={saving}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nama" required><Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Budi Santoso" /></Field>
          <Field label="Inisial Avatar"><Input value={form.avatar_initials} onChange={(e) => set("avatar_initials", e.target.value)} placeholder="BS" maxLength={2} /></Field>
        </div>
        <Field label="Peran / Pekerjaan"><Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Software Engineer" /></Field>
        <Field label="Rating (1–5)">
          <div className="flex gap-2">
            {[1,2,3,4,5].map((n) => (
              <button key={n} type="button" onClick={() => set("rating", n)} className={`w-9 h-9 rounded-lg border text-sm font-bold transition-all ${form.rating >= n ? "bg-amber-400 border-amber-400 text-white" : "border-slate-200 text-slate-400"}`}>{n}</button>
            ))}
          </div>
        </Field>
        <Field label="Isi Testimoni" required><Textarea rows={4} value={form.content} onChange={(e) => set("content", e.target.value)} /></Field>
        <Field label="Aktif">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 rounded" />
            <span className="text-sm text-slate-600">Tampilkan di website</span>
          </label>
        </Field>
      </AdminDialog>

      <AdminDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Hapus Testimoni" onSubmit={handleDelete} submitLabel="Ya, Hapus" danger>
        <p className="text-slate-600 text-sm">Yakin ingin menghapus testimoni dari <strong>{deleteTarget?.name}</strong>?</p>
      </AdminDialog>
    </div>
  );
}
