# Setup Firebase (dari Nol)

Panduan ini buat nyambungin project Tokku/Kasirr ke Firestore, ganti data yang
sebelumnya cuma di memori/localStorage jadi beneran persisten.

## 1. Bikin Project Firebase

1. Buka https://console.firebase.google.com
2. Klik **"Add project"** / **"Tambahkan project"**
3. Kasih nama (misal: `tokku-pos`), lanjut aja next-next (Google Analytics boleh di-skip/off)
4. Tunggu sampai project selesai dibuat

## 2. Aktifkan Firestore

1. Di sidebar kiri, klik **Build > Firestore Database**
2. Klik **Create database**
3. Pilih lokasi server (misal `asia-southeast2` / Jakarta biar deket)
4. Pilih **Start in production mode** (bukan test mode — kita udah siapin rules-nya di `backend/firestore.rules`)

## 3. Aktifkan Anonymous Sign-in

App ini belum punya sistem login penuh (login masih PIN lokal), tapi Firestore
rules butuh user yang "signed-in". Makanya app-nya otomatis sign-in anonim di
background.

1. Sidebar kiri, klik **Build > Authentication**
2. Klik **Get started**
3. Tab **Sign-in method**, klik **Anonymous**, aktifkan, save

> Kalau langkah ini kelewat, nanti muncul error `permission-denied` di console
> dan data gak bakal kesimpen.

## 4. Daftarin Web App & Ambil Config

1. Di halaman utama project (klik ikon gear ⚙️ > **Project settings**)
2. Scroll ke **"Your apps"**, klik ikon web `</>`
3. Kasih nickname (misal `tokku-web`), gak perlu centang Firebase Hosting
4. Setelah didaftarin, akan muncul config kayak gini:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "tokku-pos.firebaseapp.com",
  projectId: "tokku-pos",
  storageBucket: "tokku-pos.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## 5. Isi File `.env`

1. Copy `frontend/.env.example` jadi `frontend/.env`
2. Isi tiap `VITE_FIREBASE_...` sesuai config di langkah 4:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tokku-pos.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tokku-pos
VITE_FIREBASE_STORAGE_BUCKET=tokku-pos.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

`.env` udah ada di `.gitignore`, jadi aman gak ke-commit / gak ke-share pas kamu push ke GitHub.

## 6. Deploy Firestore Rules

Rules-nya udah disiapin di `backend/firestore.rules`. Cara paling gampang tanpa install apa-apa:

1. Buka Firestore Database di console > tab **Rules**
2. Copy-paste isi file `backend/firestore.rules` ke situ
3. Klik **Publish**

(Kalau nanti mau pakai Firebase CLI buat deploy dari terminal, itu langkah opsional lain kali.)

## 6b. Aktifkan Storage (buat upload foto produk)

Fitur "Upload" di field foto produk (Tambah Produk / Product Master, dan halaman Produk)
butuh Firebase Storage aktif:

1. Sidebar kiri, klik **Build > Storage**
2. Klik **Get started**, pilih lokasi yang sama dengan Firestore, lanjut next-next
3. Setelah aktif, buka tab **Rules** di halaman Storage
4. Copy-paste isi file `backend/storage.rules` ke situ, klik **Publish**

> Kalau langkah ini kelewat, tombol **Upload** di form produk bakal gagal
> dengan error di console (bukan error fatal — pengisian **URL foto** manual
> tetap jalan seperti biasa tanpa Storage).

## 7. Install & Jalanin

```bash
cd frontend
npm install
npm run dev
```

Buka app-nya — begitu load, otomatis sign-in anonim, lalu tiap "tabel" data
(produk, pelanggan, transaksi, dll) akan otomatis dibuatkan dokumen kosong
di Firestore kalau belum ada. **Tidak ada lagi data contoh/dummy** yang
di-seed — semua data (produk, transaksi, pelanggan, dst) murni berasal dari
apa yang kamu input sendiri lewat aplikasi. Semua perubahan langsung
kesimpen ke Firestore dan gak ilang lagi walau di-refresh.

**Update:** semua bagian yang sebelumnya masih pakai `localStorage`
(login/registrasi toko, daftar staff, rekening bank, printer, hasil stock
opname, kategori/brand/satuan/bundle produk, sesi kas harian, dan draft
keranjang POS) sekarang juga lewat Firestore. Gak ada lagi data yang
kesimpen di browser doang.

## Struktur Data

Setiap "tabel" (products, customers, salesInvoices, dst) disimpen sebagai
**satu dokumen** di collection `tokku`, isinya field `value` berupa array —
bukan satu dokumen per item. Ini sengaja biar migrasinya simpel dan gak perlu
nulis ulang semua fungsi CRUD yang sudah ada. Kalau nanti butuh multi-kasir
yang nulis bersamaan ke koleksi yang sama (misal `products`), best next step
adalah pecah jadi satu dokumen per item — tapi itu refactor terpisah.

## Troubleshooting

- **Console muncul `permission-denied`** → cek langkah 3 (Anonymous sign-in
  belum aktif) atau langkah 6 (rules belum di-publish).
- **`VITE_FIREBASE_PROJECT_ID kosong`** di console → file `.env` belum
  dibuat/diisi, atau lupa restart `npm run dev` setelah bikin `.env`.
- **Data gak muncul-muncul** → cek tab Firestore Database di console, harusnya
  ada collection `tokku` dengan dokumen `products`, `customers`, dst. Kalau
  kosong total, kemungkinan rules atau auth belum bener (lihat 2 poin di atas).
