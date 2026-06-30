-- ============================================================
-- Admin RLS: allow authenticated users full CRUD
-- Jalankan di Supabase SQL Editor setelah 001_schema.sql
-- ============================================================

create policy "Admin CRUD services"
  on services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin CRUD pricing"
  on pricing for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin CRUD testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin CRUD faq"
  on faq for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin CRUD gallery"
  on gallery for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin CRUD orders"
  on orders for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
