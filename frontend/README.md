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

Saya menggunakan custom hook ```useUsers``` untuk menangani proses pengambilan data user dari API.
Saya memilih pendekatan ini karena proses fetching merupakan proses yang tidak perlu dijalankan setiap kali component melakukan render. Karena itu, saya menggunakan ```useEffect``` untuk menjalankan proses tersebut ketika component pertama kali melakukan mount.

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
```userService.js``` bertanggung jawab untuk berkomunikasi dengan API.
Kemudian ```useUsers.js``` menangani proses fetching dan state seperti users, loading, dan error.
Sementara ```UserCard``` dan ```UserModal``` fokus pada tampilan dan interaksi UI.
Dengan pemisahan ini, saya tidak perlu menempatkan seluruh proses fetching dan tampilan di dalam satu component.
Misalnya, jika endpoint API berubah, saya cukup melakukan perubahan pada bagian service tanpa harus mengubah component yang bertugas menampilkan user.

### 3. Performance Optimization

Pada project ini jumlah data dari JSONPlaceholder relatif kecil sehingga client-side filtering masih cukup sederhana dan sesuai dengan requirement.
Namun, jika API tiba-tiba mengembalikan 10.000 user sekaligus dan pencarian mulai terasa lag, saya tidak akan hanya mengandalkan filtering biasa.
Saya menggunakan useMemo untuk menyimpan hasil filtering berdasarkan users dan search, sehingga filtering tidak perlu dihitung kembali ketika state lain berubah.

```bash
const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
        return users;
    }

    return users.filter((user) => {
        return (
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword) ||
            user.company.name.toLowerCase().includes(keyword)
        );
    });
}, [users, search]);
```

---

Terima Kasih

Geraldi
