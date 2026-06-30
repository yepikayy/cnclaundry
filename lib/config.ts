// ─── Konfigurasi yang bisa diganti pemilik ──────────────────────────────────

// Nomor WhatsApp laundry untuk menerima bukti bayar & kontak pelanggan.
// GANTI dengan nomor asli. Format: kode negara tanpa "+" atau spasi.
// Contoh untuk 0812-3456-7890  →  "6281234567890"
export const LAUNDRY_WHATSAPP = "6281234567890"; // TODO: ganti dengan nomor WA CnC Laundry

// Gambar QRIS. Untuk sementara memakai QRIS dummy.
// Ganti file /public/qris-dummy.svg (atau ubah path ini ke gambar QRIS asli, mis. "/qris.png").
export const QRIS_IMAGE = "/qris-dummy.svg";

// ─── Helper WhatsApp ─────────────────────────────────────────────────────────

// Normalisasi nomor telepon apa pun ke format wa.me (62...).
export function toWaNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("8")) return "62" + digits;
  return digits;
}

// Bangun tautan wa.me lengkap dengan pesan yang sudah terisi.
export function waLink(phone: string, message: string): string {
  return `https://wa.me/${toWaNumber(phone)}?text=${encodeURIComponent(message)}`;
}
