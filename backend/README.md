# Repository Service RESTful API

RESTful API untuk mengelola user authentication dan items menggunakan Node.js, Express, MongoDB, dan Mongoose.

Project ini dibuat sebagai bagian dari **Backend Developer Intern Take-Home Test**.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Authentication | Description               |
| ------ | -------------------- | -------------- | ------------------------- |
| POST   | `/api/auth/register` | No             | Register user             |
| POST   | `/api/auth/login`    | No             | Login dan mendapatkan JWT |

### Items

| Method | Endpoint         | Authentication | Description             |
| ------ | ---------------- | -------------- | ----------------------- |
| POST   | `/api/items`     | Bearer Token   | Membuat item            |
| GET    | `/api/items`     | Bearer Token   | Mendapatkan daftar item |
| GET    | `/api/items/:id` | Bearer Token   | Mendapatkan detail item |
| PUT    | `/api/items/:id` | Bearer Token   | Mengubah item           |
| DELETE | `/api/items/:id` | Bearer Token   | Menghapus item          |

### Stock

| Method | Endpoint                        | Authentication | Description                    |
| ------ | ------------------------------- | -------------- | ------------------------------ |
| PATCH  | `/api/items/:id/decrease-stock` | Bearer Token   | Mengurangi stock secara atomic |

---

# Installation

Clone repository kemudian masuk ke folder backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example`.

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/inventory_management
JWT_SECRET=examples
JWT_EXPIRES_IN=1d
```

### Project & Database Setup

Jalankan Docker:

```bash
docker compose up -d
```

Pastikan container MongoDB berjalan:

```bash
docker ps
```

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

JWT dapat disimpan menggunakan beberapa pendekatan pada aplikasi web.

**LocalStorage**

Kelebihan:

- Implementasi sederhana.
- Mudah digunakan untuk Bearer Token.
- Tidak otomatis dikirim pada setiap request.

Kekurangan:

- Token dapat diakses oleh JavaScript.
- Jika aplikasi mengalami XSS, token berpotensi dicuri.

**HttpOnly Cookie**

Kelebihan:

- Token tidak dapat diakses langsung oleh JavaScript.
- Lebih terlindungi dari pencurian token melalui XSS.

Kekurangan:

- Perlu konfigurasi cookie dan CSRF protection yang sesuai.
- Browser akan mengirim cookie secara otomatis pada request yang sesuai.

Untuk project ini, JWT dikirim melalui:

```http
Authorization: Bearer <token>
```

Pendekatan ini dipilih karena sesuai dengan implementasi REST API dan sederhana untuk digunakan oleh client.

Untuk aplikasi production berbasis browser, HttpOnly Secure Cookie dapat menjadi pilihan yang lebih aman jika dikonfigurasi dengan benar.

---

### 3. Concurrent Stock Update

Jika dua user mencoba mengurangi stock secara bersamaan, pengecekan stock dilakukan langsung dalam operasi database.

Misalnya stock awal adalah `1` dan dua request masing-masing ingin mengurangi `1`:

```text
User A → decrease 1
User B → decrease 1
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

Request A → berhasil → Stock = 0
Request B → gagal    → Stock tetap 0
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
