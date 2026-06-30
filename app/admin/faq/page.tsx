"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { AdminDialog, Field, Input, Textarea } from "@/components/admin/AdminDialog";

interface FAQ {
  id: string; question: string; answer: string; display_order: number; active: boolean;
}

const blank: Omit<FAQ, "id"> = { question: "", answer: "", display_order: 0, active: true };

export default function AdminFAQPage() {
  const [data, setData] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<{ mode: "add" | "edit"; item?: FAQ } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);
  const [form, setForm] = useState<Omit<FAQ, "id">>(blank);
  const [saving, setSaving] = useState(false);
  const supabase = createSupabaseBrowser();

  const load = async () => {
    const { data } = await supabase.from("faq").select("*").order("display_order");
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setDialog({ mode: "add" }); };
  const openEdit = (item: FAQ) => { setForm({ ...item }); setDialog({ mode: "edit", item }); };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) { toast.error("Pertanyaan dan jawaban wajib diisi"); return; }
    setSaving(true);
    if (dialog?.mode === "add") {
      const { error } = await supabase.from("faq").insert(form);
      if (error) { toast.error("Gagal menyimpan"); } else { toast.success("FAQ ditambahkan"); }
    } else {
      const { error } = await supabase.from("faq").update(form).eq("id", dialog!.item!.id);
      if (error) { toast.error("Gagal memperbarui"); } else { toast.success("FAQ diperbarui"); }
    }
    setSaving(false);
    setDialog(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("faq").delete().eq("id", deleteTarget.id);
    if (error) { toast.error("Gagal menghapus"); } else { toast.success("FAQ dihapus"); }
    setDeleteTarget(null);
    load();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const filtered = data.filter((d) => d.question.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">FAQ</h1>
          <p className="text-slate-500 text-sm">{data.length} pertanyaan</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari pertanyaan..." className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-50">
              {["#", "Pertanyaan", "Jawaban", "Aktif", "Aksi"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">Memuat...</td></tr>
                : filtered.length === 0 ? <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">Tidak ada data</td></tr>
                : filtered.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-5 py-3 text-slate-400 text-xs">{row.display_order}</td>
                    <td className="px-5 py-3 font-medium text-slate-800 max-w-[240px]">{row.question}</td>
                    <td className="px-5 py-3 text-slate-500 max-w-[280px] truncate">{row.answer}</td>
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

      <AdminDialog open={!!dialog} onClose={() => setDialog(null)} title={dialog?.mode === "add" ? "Tambah FAQ" : "Edit FAQ"} onSubmit={handleSave} loading={saving}>
        <Field label="Pertanyaan" required><Input value={form.question} onChange={(e) => set("question", e.target.value)} placeholder="Bagaimana cara memesan?" /></Field>
        <Field label="Jawaban" required><Textarea rows={5} value={form.answer} onChange={(e) => set("answer", e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Urutan"><Input type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))} /></Field>
          <Field label="Aktif">
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm text-slate-600">Tampilkan di website</span>
              </label>
            </div>
          </Field>
        </div>
      </AdminDialog>

      <AdminDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Hapus FAQ" onSubmit={handleDelete} submitLabel="Ya, Hapus" danger>
        <p className="text-slate-600 text-sm">Yakin ingin menghapus pertanyaan ini?</p>
        <p className="text-slate-500 text-xs mt-1 italic">"{deleteTarget?.question}"</p>
      </AdminDialog>
    </div>
  );
}
