# Repository Service RESTful API

RESTful API untuk mengelola user authentication dan items menggunakan Node.js, Express, MongoDB, dan Mongoose.

Project ini dibuat sebagai bagian dari **Backend Developer Intern Take-Home Test**.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcryptjs**
- **express-validator**
- **Docker**
- **Nodemon** untuk development

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

## Authentication

Endpoint yang membutuhkan authentication menggunakan JWT melalui `Authorization` header.

```http
Authorization: Bearer <token>
```

Token diperoleh dari endpoint:

```http
POST /api/auth/login
```

---

## Search & Pagination

Endpoint:

```http
GET /api/items
```

Mendukung query parameter:

```text
search
page
limit
```

Contoh:

```http
GET /api/items?search=laptop&page=1&limit=10
```

Default:

```text
page = 1
limit = 10
```

Maximum:

```text
limit = 100
```

Search dilakukan pada:

- `name`
- `description`

---

## Environment Variables

Buat file `.env` berdasarkan `.env.example`.

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/inventory_management
JWT_SECRET=examples
JWT_EXPIRES_IN=1d
```

---

## Installation

Clone repository kemudian masuk ke folder backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Database Setup

Project menggunakan MongoDB.

MongoDB dapat dijalankan menggunakan Docker.

Dari root project:

```bash
docker compose up -d
```

Pastikan container MongoDB berjalan:

```bash
docker ps
```

---

## Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server secara default berjalan pada:

```text
http://localhost:3000
```

---

## Seed Test Data

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

## Technical Decisions

### 1. Request Flow & Layer Separation

Request diproses melalui:

```text
Router
→ Middleware
→ Controller
→ Service
→ Repository
→ Database
```

Layer separation digunakan agar setiap bagian memiliki tanggung jawab yang jelas.

Controller bertanggung jawab terhadap HTTP layer, Service menangani business logic, sedangkan Repository menangani database operations.

Dengan pendekatan ini, perubahan pada database layer tidak perlu memengaruhi controller secara langsung dan business logic tidak tercampur dengan HTTP handling.

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

Salah satu masalah yang perlu diperhatikan adalah ketika dua user mencoba mengurangi stock secara bersamaan.

Misalnya:

```text
Initial stock = 1
```

Dua request masuk hampir bersamaan:

```text
User A → decrease 1
User B → decrease 1
```

Implementasi sederhana seperti:

```text
Read stock
→ Check stock
→ Decrease stock
→ Save
```

dapat mengalami race condition karena kedua request dapat membaca nilai stock yang sama sebelum salah satu update selesai.

Untuk menghindari hal tersebut, project menggunakan atomic conditional update MongoDB.

Repository menggunakan kondisi:

```js
{
    _id: id,
    stock: { $gte: quantity }
}
```

dan operasi:

```js
{
    $inc: {
        stock: -quantity
    }
}
```

Artinya stock hanya akan dikurangi apabila stock pada saat operasi database masih mencukupi.

Dengan stock awal `1`:

```text
Request A → stock 1 → 0 → SUCCESS
Request B → stock 0 → condition fails → CONFLICT
```

Request kedua mendapatkan:

```text
409 Conflict
```

dengan response:

```json
{
    "message": "Insufficient stock"
}
```

Dengan demikian stock tidak dapat menjadi nilai negatif akibat concurrent stock reduction.

---

## Error Handling

API menggunakan centralized error handling.

Contoh response:

### Invalid ID

```json
{
    "message": "Invalid resource ID"
}
```

### Item Not Found

```json
{
    "message": "Item not found"
}
```

### Insufficient Stock

```json
{
    "message": "Insufficient stock"
}
```

### Authentication Required

```json
{
    "message": "Authentication token is required"
}
```

---

## Validation

Request validation dilakukan menggunakan `express-validator`.

Contoh validasi:

- Name tidak boleh kosong.
- Description tidak boleh kosong.
- Email harus valid.
- Password minimal 6 karakter.
- Stock harus berupa integer dan tidak boleh negatif.
- Price harus berupa angka dan tidak boleh negatif.
- Stock reduction quantity harus integer positif.

---

## Testing

API dapat diuji menggunakan Postman.

Testing mencakup:

- Register
- Login
- JWT authentication
- Create item
- Get items
- Search
- Pagination
- Get item by ID
- Update item
- Delete item
- Input validation
- Invalid resource ID
- Insufficient stock
- Concurrent stock reduction

API documentation dan collection tersedia melalui Postman.

---

## Docker

MongoDB dijalankan menggunakan Docker Compose dari root project.

```bash
docker compose up -d
```

Untuk menghentikan container:

```bash
docker compose down
```

Data MongoDB disimpan pada Docker named volume sehingga data tetap tersedia ketika container dihentikan dan dijalankan kembali.

---

## License

This project was created for a Backend Developer Intern take-home test.
