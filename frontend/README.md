# TOKKU BUILD — Material ERP & POS Dashboard

Enterprise Material ERP and POS Dashboard untuk Tokku Build HQ. Aplikasi ini mengelola penjualan (POS), produk, stok, pemasok, keuangan, kas harian, retur, pelanggan, hingga laporan bisnis dalam satu dashboard.

## Menjalankan Secara Lokal

**Prasyarat:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan aplikasi (mode development):
   ```bash
   npm run dev
   ```
3. Build untuk production:
   ```bash
   npm run build
   ```
4. Preview hasil build:
   ```bash
   npm run preview
   ```

## Struktur Proyek

- `src/App.tsx` — root komponen & routing antar halaman
- `src/components/` — layout & komponen UI bersama
- `src/features/` — seluruh halaman/fitur (POS, Produk, Keuangan, Kas Harian, Pengaturan, dll), masing-masing di folder sendiri
- `src/types/` — definisi tipe TypeScript, dipecah per domain (product, sales, finance, dst)
- `src/lib/` — util bersama, termasuk client & hook Supabase (`supabase.ts`, `useSupabaseState.ts`, `useSupabaseReady.ts`, `supabaseCache.ts`)

## Catatan

Data pada aplikasi ini disimpan di Supabase (Postgres), realtime lewat Supabase Realtime — lihat `../SUPABASE_SETUP.md` untuk cara setup project Supabase-nya dari nol sebelum menjalankan `npm run dev`. Tanpa `frontend/.env` terisi, aplikasi tidak akan bisa memuat atau menyimpan data apa pun.
