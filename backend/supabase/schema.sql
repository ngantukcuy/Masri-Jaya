-- =============================================================================
-- Tokku POS — Supabase schema
-- =============================================================================
-- Jalankan seluruh file ini sekali lewat Supabase Dashboard > SQL Editor > New
-- query > Run. Aman dijalankan berkali-kali (idempotent).
--
-- Satu tabel Postgres generik `tokku_state` (key text primary key, value
-- jsonb) menyimpan setiap "tabel" app (products, customers, salesInvoices,
-- dst) sebagai satu baris berisi array/objek JSON, bukan satu baris per
-- item. Ini yang dipakai oleh frontend/src/lib/useSupabaseState.ts dan
-- frontend/src/lib/supabaseCache.ts lewat satu hook baca/tulis generik.
--
-- Kalau nanti app ini butuh multi-kasir yang nulis bersamaan ke "tabel" yang
-- sama (misal `products`), pecah jadi satu baris per item adalah next step
-- alami — tapi itu refactor terpisah.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1) Tabel key-value generik (pengganti collection "tokku")
-- -----------------------------------------------------------------------------
create table if not exists public.tokku_state (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

comment on table public.tokku_state is
  'Satu baris per "tabel" yang dipakai app (products, customers, salesInvoices, staffList, dst), disimpan generik sebagai key + value jsonb, biar seluruh app bisa pakai satu hook baca/tulis generik.';

-- Jaga updated_at selalu ter-update tiap kali baris berubah.
create or replace function public.tokku_state_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_tokku_state_updated_at on public.tokku_state;
create trigger trg_tokku_state_updated_at
before update on public.tokku_state
for each row execute function public.tokku_state_set_updated_at();

-- -----------------------------------------------------------------------------
-- 2) Row Level Security
-- -----------------------------------------------------------------------------
-- App ini belum punya sistem login penuh (LoginView.tsx cuma cek PIN di
-- client), jadi policy di bawah cuma mensyaratkan user yang "signed-in"
-- (termasuk anonymous sign-in) — bukan role-based per user. Cukup untuk
-- development / single-tenant, TAPI bukan pengganti auth + role-based
-- policy yang sesungguhnya sebelum production multi-toko.
alter table public.tokku_state enable row level security;

drop policy if exists "tokku_state_select_authenticated" on public.tokku_state;
create policy "tokku_state_select_authenticated"
on public.tokku_state for select
to authenticated
using (true);

drop policy if exists "tokku_state_insert_authenticated" on public.tokku_state;
create policy "tokku_state_insert_authenticated"
on public.tokku_state for insert
to authenticated
with check (true);

drop policy if exists "tokku_state_update_authenticated" on public.tokku_state;
create policy "tokku_state_update_authenticated"
on public.tokku_state for update
to authenticated
using (true)
with check (true);

drop policy if exists "tokku_state_delete_authenticated" on public.tokku_state;
create policy "tokku_state_delete_authenticated"
on public.tokku_state for delete
to authenticated
using (true);

-- -----------------------------------------------------------------------------
-- 3) Grant eksplisit ke Data API (supabase-js)
-- -----------------------------------------------------------------------------
-- PENTING: sejak pertengahan 2026, project Supabase BARU tidak lagi otomatis
-- mengekspos tabel baru di schema public ke Data API (PostgREST/GraphQL, yang
-- dipakai supabase-js) — walaupun RLS-nya sudah benar, tanpa GRANT eksplisit
-- request bakal ditolak dengan error "permission denied for table ...".
-- Baris di bawah ini menangani itu otomatis, jadi tidak perlu utak-atik
-- toggle apapun di dashboard.
-- Referensi: https://github.com/orgs/supabase/discussions/45329
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.tokku_state to authenticated;
grant select, insert, update, delete on public.tokku_state to service_role;

-- -----------------------------------------------------------------------------
-- 4) Realtime — biar tiap tab/device lain langsung dapat update terbaru
-- -----------------------------------------------------------------------------
-- Semua perubahan di tokku_state di-broadcast secara realtime lewat
-- Postgres Changes ke semua client yang subscribe.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'tokku_state'
  ) then
    alter publication supabase_realtime add table public.tokku_state;
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- 5) Storage bucket buat foto produk (pengganti backend/storage.rules lama)
-- -----------------------------------------------------------------------------
-- Dipakai oleh fitur "Upload dari perangkat" di form produk
-- (frontend/src/lib/uploadProductImage.ts). Publik buat dibaca (ditampilkan
-- di Toko Digital), tapi upload wajib login. Batas ukuran & tipe file
-- ditegakkan langsung oleh Supabase Storage di level bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB, sama seperti batas lama di uploadProductImage.ts
  array['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit     = excluded.file_size_limit,
  allowed_mime_types  = excluded.allowed_mime_types;

-- storage.objects sudah dapat grant default dari Supabase (tidak kena
-- perubahan Data API di atas, yang cuma menyasar schema public), jadi cukup
-- RLS policy-nya saja.
drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
on storage.objects for select
to public
using (bucket_id = 'product-images');

drop policy if exists "product_images_authenticated_upload" on storage.objects;
create policy "product_images_authenticated_upload"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

drop policy if exists "product_images_authenticated_update" on storage.objects;
create policy "product_images_authenticated_update"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');

drop policy if exists "product_images_authenticated_delete" on storage.objects;
create policy "product_images_authenticated_delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images');

-- =============================================================================
-- Selesai. Lanjut ke langkah 3 di SUPABASE_SETUP.md (aktifkan Anonymous
-- Sign-Ins), lalu isi frontend/.env.
-- =============================================================================
