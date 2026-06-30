-- ============================================================
-- CNC Laundry — Schema & Seed Data
-- Jalankan file ini di Supabase SQL Editor
-- ============================================================

-- SERVICES
create table if not exists services (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  subtitle      text not null,
  price         text not null,
  turnaround    text not null,
  description   text not null,
  features      text[] not null default '{}',
  badge         text not null,
  badge_color   text not null default 'bg-sky-100 text-sky-700',
  gradient      text not null default 'from-sky-400 to-sky-600',
  light_bg      text not null default 'bg-sky-50',
  display_order int not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- PRICING
create table if not exists pricing (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  price         text not null,
  unit          text not null default '',
  description   text not null,
  features      jsonb not null default '[]',
  is_highlight  boolean not null default false,
  cta_text      text not null,
  href          text not null default '/order',
  display_order int not null default 0,
  active        boolean not null default true
);

-- TESTIMONIALS
create table if not exists testimonials (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  role            text not null,
  avatar_initials text not null,
  rating          int not null default 5 check (rating between 1 and 5),
  content         text not null,
  gradient        text not null default 'from-sky-400 to-sky-600',
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- FAQ
create table if not exists faq (
  id            uuid primary key default gen_random_uuid(),
  question      text not null,
  answer        text not null,
  display_order int not null default 0,
  active        boolean not null default true
);

-- GALLERY
create table if not exists gallery (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  image_url     text not null,
  category      text not null default 'umum',
  display_order int not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ORDERS
create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),
  service_slug  text not null,
  service_name  text not null,
  pickup_date   date not null,
  time_slot     text not null,
  customer_name text not null,
  phone         text not null,
  address       text not null,
  notes         text,
  status        text not null default 'pending'
                  check (status in ('pending','confirmed','processing','completed','cancelled')),
  created_at    timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────────────────────

alter table services     enable row level security;
alter table pricing      enable row level security;
alter table testimonials enable row level security;
alter table faq          enable row level security;
alter table gallery      enable row level security;
alter table orders       enable row level security;

create policy "Public read services"     on services     for select using (active = true);
create policy "Public read pricing"      on pricing      for select using (active = true);
create policy "Public read testimonials" on testimonials for select using (active = true);
create policy "Public read faq"          on faq          for select using (active = true);
create policy "Public read gallery"      on gallery      for select using (active = true);
create policy "Public insert orders"     on orders       for insert with check (true);

-- ── Seed: Services ────────────────────────────────────────────────────────────

insert into services (slug, name, subtitle, price, turnaround, description, features, badge, badge_color, gradient, light_bg, display_order) values
('wash-fold',
 'Cuci & Lipat', 'Laundry Sehari-hari', 'Rp 10K / kg', '2 hari',
 'Layanan paling populer kami. Pakaian Anda dicuci menggunakan mesin kelas atas dengan detergen ramah lingkungan premium, dikeringkan, lalu dilipat rapi.',
 ARRAY['Dipisahkan berdasarkan warna dan jenis kain','Detergen ramah lingkungan premium','Dikeringkan pada suhu optimal','Dilipat rapi dan dikemas','Minimum 2 kg'],
 'Terpopuler','bg-sky-100 text-sky-700','from-sky-400 to-sky-600','bg-sky-50', 1),

('dry-cleaning',
 'Dry Cleaning', 'Pakaian Spesial', 'Mulai Rp 35K / item', '3 hari',
 'Perawatan ahli untuk kain halus, jas, gaun, dan pakaian yang memerlukan penanganan khusus. Kami menggunakan pelarut dry-cleaning terbaru yang lembut pada kain dan lingkungan.',
 ARRAY['Jas, blazer & pakaian formal','Sutra, kasmir & wol','Pra-perawatan noda termasuk','Dikemas individual di gantungan','Laporan pemeriksaan kain'],
 'Premium','bg-violet-100 text-violet-700','from-violet-400 to-violet-600','bg-violet-50', 2),

('ironing',
 'Setrika & Press', 'Rapi & Tajam', 'Rp 8K / item', '1 hari',
 'Penguapan dan pengepresan profesional untuk menghilangkan kerutan dan memberikan tampilan tajam yang rapi pada pakaian Anda. Sempurna untuk pakaian kantor dan acara formal.',
 ARRAY['Kemeja, celana & rok','Teknologi steam press','Kerah & manset sempurna','Digantung di hanger premium','Tersedia opsi same-day'],
 'Cepat','bg-amber-100 text-amber-700','from-amber-400 to-orange-500','bg-amber-50', 3),

('sneakers',
 'Cuci Sepatu', 'Tampil Baru Lagi', 'Mulai Rp 80K / pasang', '2 hari',
 'Bersihkan mendalam, hilangkan bau, dan kembalikan sneaker Anda menggunakan solusi spesialis. Dari kanvas hingga kulit, kami menghidupkan kembali setiap pasang.',
 ARRAY['Deodorisasi interior mendalam','Perawatan pemutihan sol','Cuci tali sepatu termasuk','Pembentukan ulang dengan shoe tree','Cocok untuk semua bahan'],
 'Baru','bg-emerald-100 text-emerald-700','from-emerald-400 to-teal-500','bg-emerald-50', 4);

-- ── Seed: Pricing ─────────────────────────────────────────────────────────────

insert into pricing (name, price, unit, description, features, is_highlight, cta_text, href, display_order) values
('Reguler', '10', '/kg', 'Cocok untuk kebutuhan laundry sehari-hari.',
 '[{"text":"Cuci & Lipat","included":true},{"text":"Selesai 2 hari","included":true},{"text":"Gratis jemput di atas 5 kg","included":true},{"text":"Notifikasi SMS","included":true},{"text":"Layanan Ekspres 24 jam","included":false},{"text":"Antar jemput gratis","included":false},{"text":"Pemeriksaan pakaian","included":false},{"text":"Pelacakan real-time","included":false}]'::jsonb,
 false, 'Mulai Sekarang', '/order', 1),

('Premium', '10', '/kg', 'Paket paling populer — pengalaman terlengkap.',
 '[{"text":"Cuci, Lipat & Setrika","included":true},{"text":"Layanan Ekspres 24 jam","included":true},{"text":"Antar jemput gratis","included":true},{"text":"Pemeriksaan pakaian","included":true},{"text":"Pelacakan real-time","included":true},{"text":"Notifikasi SMS & email","included":true},{"text":"Jalur dukungan khusus","included":false},{"text":"Penagihan mingguan","included":false}]'::jsonb,
 true, 'Paling Populer', '/order', 2),

('Bisnis', 'Khusus', '', 'Solusi khusus untuk kantor, hotel & restoran.',
 '[{"text":"Semua fitur Premium","included":true},{"text":"Manajer akun khusus","included":true},{"text":"Penagihan mingguan","included":true},{"text":"Penjadwalan prioritas","included":true},{"text":"SLA kustom","included":true},{"text":"Diskon volume","included":true},{"text":"Pengambilan di lokasi","included":true},{"text":"Laporan penggunaan bulanan","included":true}]'::jsonb,
 false, 'Hubungi Kami', '/contact', 3);

-- ── Seed: Testimonials ────────────────────────────────────────────────────────

insert into testimonials (name, role, avatar_initials, rating, content, gradient) values
('Sari Dewi',       'Manajer Pemasaran', 'SD', 5, 'CNC Laundry benar-benar mengubah pagi hari Senin saya. Jas saya selalu kembali dengan setrika yang sempurna. Sepadan dengan harganya!', 'from-sky-400 to-sky-600'),
('Budi Santoso',    'Pemilik Restoran',  'BS', 5, 'Kami menggunakan CNC Laundry untuk semua seragam staf. Harga kiloan sangat terjangkau dan tidak pernah telat sekalipun dalam 6 bulan.', 'from-cyan-400 to-cyan-600'),
('Amira Putri',     'Desainer Grafis',   'AP', 5, 'Layanan cuci sepatu-nya luar biasa — Jordan lama saya terlihat seperti baru dibuka dari kotaknya. Sangat direkomendasikan!', 'from-blue-400 to-blue-600'),
('Reza Firmansyah', 'Software Engineer', 'RF', 5, 'Fitur pelacakan real-time sangat membantu. Saya tahu persis di mana pakaian saya setiap saat. Pengalaman yang sangat menyenangkan.', 'from-violet-400 to-violet-600'),
('Dina Kusuma',     'Guru',              'DK', 5, 'Penjemputan selalu tepat waktu dan pakaian selalu wangi. Seragam sekolah anak-anak saya tidak pernah sebersih ini.', 'from-sky-400 to-cyan-500'),
('Hendra Wijaya',   'Arsitek',           'HW', 5, 'Layanan dry cleaning mereka menyelamatkan jas pengantin saya dari tumpahan kopi. Profesional, cepat, dan harganya sangat terjangkau.', 'from-indigo-400 to-blue-500');

-- ── Seed: FAQ ─────────────────────────────────────────────────────────────────

insert into faq (question, answer, display_order) values
('Bagaimana cara menjadwalkan penjemputan?', 'Cukup klik Pesan Sekarang, pilih tanggal dan waktu yang Anda inginkan, dan kami akan mengirimkan kurir ke alamat Anda. Seluruh proses membutuhkan kurang dari 2 menit.', 1),
('Berapa berat minimum untuk satu pesanan?', 'Minimum pesanan untuk layanan Cuci & Lipat adalah 2 kg. Untuk dry cleaning dan setrika, tidak ada minimum — Anda bisa mengirim sesedikit apapun pakaian.', 2),
('Berapa lama waktu pengerjaan laundry?', 'Layanan reguler membutuhkan 2 hari. Layanan Ekspres kami mengembalikan pakaian Anda dalam 24 jam dengan biaya tambahan yang terjangkau.', 3),
('Bagaimana jika pakaian saya rusak?', 'Setiap pakaian difoto dan diperiksa sebelum dicuci. Dalam kejadian langka terjadi kerusakan, kami memberikan kompensasi penuh sesuai nilai pasar pakaian tersebut.', 4),
('Apakah Anda menggunakan produk ramah lingkungan?', 'Ya! Kami menggunakan detergen biodegradable dan hipoalergenik serta mesin hemat energi. Aman untuk keluarga Anda dan lingkungan sekitar.', 5),
('Bisakah saya melacak pesanan saya?', 'Tentu saja. Anda akan menerima update melalui SMS dan email di setiap tahap — penjemputan terkonfirmasi, sedang dicuci, dalam pengiriman, dan sudah sampai.', 6),
('Apakah ada program berlangganan atau loyalitas?', 'Ada! Setelah pesanan ke-5 Anda otomatis bergabung dengan program loyalitas kami. Kumpulkan poin di setiap cucian dan tukarkan dengan sesi laundry gratis.', 7);
