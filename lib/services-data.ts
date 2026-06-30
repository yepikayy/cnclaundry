import type { Service } from "@/lib/db";

// Daftar layanan utama CnC Laundry. Sumber data tunggal (berbasis kode) agar
// harga konsisten dengan nota & kalkulator di seluruh halaman.
export const services: Service[] = [
  {
    id: "wash-fold",
    slug: "wash-fold",
    name: "Cuci & Lipat",
    subtitle: "Laundry Sehari-hari",
    price: "Mulai Rp 6K / kg",
    turnaround: "2 hari",
    description:
      "Layanan paling populer kami. Pakaian Anda dicuci menggunakan mesin kelas atas dengan detergen ramah lingkungan premium, dikeringkan, lalu dilipat rapi.",
    features: [
      "Dipisahkan berdasarkan warna dan jenis kain",
      "Detergen ramah lingkungan premium",
      "Dikeringkan pada suhu optimal",
      "Dilipat rapi dan dikemas",
      "Paket Kering 6K, Komplit 8K, Express 10K /kg",
    ],
    badge: "Terpopuler",
    badge_color: "bg-sky-100 text-sky-700",
    gradient: "from-sky-400 to-sky-600",
    light_bg: "bg-sky-50",
    display_order: 1,
  },
  {
    id: "dry-cleaning",
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    subtitle: "Pakaian Spesial",
    price: "Mulai Rp 12K / item",
    turnaround: "3 hari",
    description:
      "Perawatan ahli untuk kain halus, jas, gaun, dan pakaian yang memerlukan penanganan khusus. Kami menggunakan pelarut dry-cleaning terbaru yang lembut pada kain dan lingkungan.",
    features: [
      "Jas, blazer & pakaian formal",
      "Kebaya, gaun & safari",
      "Pra-perawatan noda termasuk",
      "Dikemas individual di gantungan",
      "Setelan Jas 25K, Jas 17K, Blazer 15K",
    ],
    badge: "Premium",
    badge_color: "bg-violet-100 text-violet-700",
    gradient: "from-violet-400 to-violet-600",
    light_bg: "bg-violet-50",
    display_order: 2,
  },
  {
    id: "ironing",
    slug: "ironing",
    name: "Setrika & Press",
    subtitle: "Rapi & Tajam",
    price: "Rp 6K / kg",
    turnaround: "1 hari",
    description:
      "Penguapan dan pengepresan profesional untuk menghilangkan kerutan dan memberikan tampilan tajam yang rapi pada pakaian Anda. Sempurna untuk pakaian kantor dan acara formal.",
    features: [
      "Kemeja, celana & rok",
      "Teknologi steam press",
      "Kerah & manset sempurna",
      "Digantung di hanger premium",
      "Paket Setrika Aja 6K /kg",
    ],
    badge: "Cepat",
    badge_color: "bg-amber-100 text-amber-700",
    gradient: "from-amber-400 to-orange-500",
    light_bg: "bg-amber-50",
    display_order: 3,
  },
  {
    id: "sneakers",
    slug: "sneakers",
    name: "Cuci Sepatu",
    subtitle: "Tampil Baru Lagi",
    price: "Mulai Rp 12K / pasang",
    turnaround: "2 hari",
    description:
      "Bersihkan mendalam, hilangkan bau, dan kembalikan sepatu Anda menggunakan solusi spesialis. Dari kanvas hingga kulit, kami menghidupkan kembali setiap pasang.",
    features: [
      "Deodorisasi interior mendalam",
      "Perawatan pemutihan sol",
      "Cuci tali sepatu termasuk",
      "Cocok untuk semua bahan",
      "Sepatu Olahraga 12K, Sepatu Kulit 15K",
    ],
    badge: "Baru",
    badge_color: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-400 to-teal-500",
    light_bg: "bg-emerald-50",
    display_order: 4,
  },
];
