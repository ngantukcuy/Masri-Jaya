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
- `src/components/` — seluruh halaman/fitur (POS, Produk, Keuangan, Kas Harian, Pengaturan, dll)
- `src/data.ts` — data contoh/dummy untuk pengembangan
- `src/types.ts` — definisi tipe TypeScript
- `src/lib/` — util bersama

## Catatan

Data pada aplikasi ini saat ini disimpan di `localStorage` browser (belum terhubung ke backend/database).
