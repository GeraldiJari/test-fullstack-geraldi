# Repository Service RESTful API

RESTful API untuk mengelola user authentication dan items menggunakan Node.js, Express, MongoDB, dan Mongoose.

Project ini dibuat sebagai bagian dari **Backend Developer Intern Take-Home Test**.

---

# Installation

Clone repository kemudian masuk ke folder frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

```bash
npm run dev
```

# Technical Decisions

### 1. State Management & Lifecycle

Saya menggunakan custom hook useUsers untuk menangani proses pengambilan data user dari API.
Saya memilih pendekatan ini karena proses fetching merupakan proses yang tidak perlu dijalankan setiap kali component melakukan render. Karena itu, saya menggunakan useEffect untuk menjalankan proses tersebut ketika component pertama kali melakukan mount.

Implementasinya saya menggunakan dependency array kosong:
```bash
useEffect(() => {
    fetchUsers();
}, []);
```
Dengan dependency array tersebut, proses fetching tidak dijalankan kembali pada setiap render sehingga mencegah terjadinya infinite request.

Saya juga memisahkan state menjadi users, loading, dan error.
Dengan begitu, UI dapat mengetahui kondisi proses fetching dengan jelas:

### 2. Struktur Folder

Saya memilih struktur folder berdasarkan tanggung jawab masing-masing bagian.
Sebelumnya saya terbiasa memisahkan logic ketika mengembangkan aplikasi menggunakan Laravel. Karena itu, ketika berpindah ke React, saya juga mencoba mempertahankan pola pemisahan tanggung jawab agar setiap bagian tidak menangani terlalu banyak pekerjaan sekaligus.

```bash
src/
├── components/
│   ├── UserCard.jsx
│   └── UserModal.jsx
│
├── hooks/
│   └── useUsers.js
│
├── services/
│   └── userService.js
│
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```
```text userService.js ``` bertanggung jawab untuk berkomunikasi dengan API.
Kemudian useUsers.js menangani proses fetching dan state seperti users, loading, dan error.
Sementara UserCard dan UserModal fokus pada tampilan dan interaksi UI.
Dengan pemisahan ini, saya tidak perlu menempatkan seluruh proses fetching dan tampilan di dalam satu component.
Misalnya, jika endpoint API berubah, saya cukup melakukan perubahan pada bagian service tanpa harus mengubah component yang bertugas menampilkan user.
Kemudian jalankan:

```bash
npm run dev
```

```text
http://localhost:3000
```

### Seed Test Data

Project menyediakan script untuk memasukkan sample inventory data.

Jalankan:

```bash
npm run seed
```

Seeder akan:

1. Menghapus data item yang sudah ada.
2. Memasukkan 30 sample items yang telah dibuat sebelumnya.

Seeder ditujukan untuk development dan testing.

---

# Technical Decisions

### 1. Request Flow & Layer Separation

Saya memilih pola ini karena sebelumnya saya terbiasa menggunakan struktur Controller, Service, dan Repository pada pengembangan menggunakan Laravel. Ketika berpindah ke Node.js dan Express, saya mempertahankan pola yang sama karena sudah familiar dengan pemisahan tanggung jawabnya.

Request diproses melalui:

```text
Router
-> Middleware
-> Controller
-> Service
-> Repository
-> Database
```

Request pertama kali masuk melalui Router untuk menentukan endpoint yang dituju. Setelah itu, Middleware melakukan hal seperti authentication dan validation.

Request kemudian diteruskan ke Controller untuk menangani HTTP request dan response. Jika membutuhkan proses lebih lanjut, Controller meneruskannya ke Service untuk menjalankan business logic.

Service kemudian menggunakan Repository ketika perlu berkomunikasi dengan database. Repository menjadi bagian yang berinteraksi langsung dengan MongoDB.

Untuk project yang lebih besar, pemisahan ini juga memudahkan pengembangan dan perubahan di kemudian hari. Misalnya, perubahan pada database atau query tidak perlu mengubah business logic yang berada di Service, sementara Controller tetap fokus pada komunikasi dengan client.

---

### 2. JWT: LocalStorage vs HttpOnly Cookie

HttpOnly Cookie.

Alasannya, JWT yang disimpan pada HttpOnly Cookie tidak dapat diakses langsung oleh JavaScript. Hal ini mengurangi risiko token dicuri melalui XSS.

Kekurangannya, penggunaan Cookie membutuhkan konfigurasi security tambahan seperti CSRF protection, Secure, dan SameSite.

LocalStorage memang lebih sederhana untuk digunakan, tetapi token dapat diakses oleh JavaScript. Jika aplikasi mengalami XSS, token tersebut berpotensi dicuri.

---

### 3. Concurrent Stock Update

Jika dua user mencoba mengurangi stock secara bersamaan, pengecekan stock dilakukan langsung dalam operasi database.

Misalnya stock awal adalah `1` dan dua request masing-masing ingin mengurangi `1`:

```text
User A -> decrease 1
User B -> decrease 1
```

Project menggunakan **atomic conditional update** MongoDB:

```js
{
    _id: id,
    stock: { $gte: quantity }
}
```

dengan:

```js
{
    $inc: {
        stock: -quantity
    }
}
```

Artinya, stock hanya akan dikurangi jika stock masih mencukupi pada saat operasi dilakukan.

```text
Stock = 1

Request A -> berhasil -> Stock = 0
Request B -> gagal    -> Stock tetap 0
```

Request yang gagal akan mendapatkan `409 Conflict` dengan response:

```json
{
    "message": "Insufficient stock"
}
```

Dengan pendekatan ini, concurrent request tidak dapat menyebabkan stock menjadi negatif.

---

Terima Kasih

Geraldi
