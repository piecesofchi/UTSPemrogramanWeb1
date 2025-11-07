# UTSPemrogramanWeb1

# Struktur Folder
    project-pemesanan-buku/
    │
    ├── index.html
    ├── login.html
    ├── dashboard.html
    ├── stok.html
    ├── checkout.html
    ├── tracking.html
    │
    ├── css/
    │   ├── style.css
    │
    ├── js/
    │   ├── data.js   (isi data dummy katalog buku)
    │   ├── script.js (fungsi umum)
    │
    └── assets/
        ├── images/
        └── icons/

## 1. login.html
- Form: email & password.
- Tombol “Login” → cek data dummy di data.js.
- Kalau salah → alert("Email/password yang anda masukkan salah!")
- Tombol “Lupa Password” dan “Daftar” → muncul dalam modal box (pop-up HTML & JS).

## 2. dashboard.html
1. Tampilkan menu navigasi ke:
- Katalog Buku
- Tracking Pengiriman
- Laporan Pemesanan
-History Transaksi
2. Tambahkan greeting berdasar waktu lokal:
- Pagi → “Selamat Pagi!”
-Siang → “Selamat Siang!”
-Sore → “Selamat Sore!”

## 3. stok.html
- Menampilkan data dari data.js → variable dataKatalogBuku (array of object).
- Bisa tambah baris stok baru via tombol dan input menggunakan DOM JS.

## 4. checkout.html
Form untuk isi:
- Data pemesan (nama, alamat, no. hp)
- Pilihan buku, jumlah, metode pembayaran
- Bisa tambah/ubah data pemesanan.
- Tampilkan total harga.

## 5. tracking.html
1. Input: Nomor Delivery Order.
2. Ketika klik “Cari”, tampilkan:
- Nama Pemesan
- Status Pengiriman (pakai progress bar warna)
- Detail ekspedisi, tanggal kirim, jenis paket, total pembayaran.


---

## Halaman login.html
### login.html
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login - Toko Buku Online</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="login-container">
            <h2>Login</h2>
            <form id="loginForm">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Masukkan email" required>
    
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Masukkan password" required>
    
                <button type="submit">Login</button>
            </form>
    
            <div class="extra-links">
                <button id="btnLupa">Lupa Password</button>
                <button id="btnDaftar">Daftar</button>
            </div>
        </div>
    
        <!-- Modal Box -->
        <div id="modalBox" class="modal">
            <div class="modal-content">
                <span id="closeModal">&times;</span>
                <h3 id="modalTitle"></h3>
                <p id="modalText"></p>
            </div>
        </div>
    
        <script src="js/script.js"></script>
    </body>
    </html>

### css/style.css
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    
    .login-container {
        width: 320px;
        background: #fff;
        margin: 100px auto;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    h2 {
        text-align: center;
        color: #333;
    }
    
    label {
        display: block;
        margin-top: 10px;
    }
    
    input {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    button {
        width: 100%;
        padding: 10px;
        background-color: #2c7be5;
        border: none;
        color: white;
        font-weight: bold;
        margin-top: 15px;
        border-radius: 5px;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #1a5fd1;
    }
    
    .extra-links {
        text-align: center;
        margin-top: 15px;
    }
    
    .extra-links button {
        width: auto;
        background: none;
        color: #2c7be5;
        border: none;
        cursor: pointer;
        margin: 5px;
    }
    
    .extra-links button:hover {
        text-decoration: underline;
    }
    
    /* Modal Style */
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.4);
    }
    
    .modal-content {
        background: #fff;
        margin: 15% auto;
        padding: 20px;
        border-radius: 10px;
        width: 300px;
        text-align: center;
    }
    
    #closeModal {
        float: right;
        cursor: pointer;
        font-size: 20px;
        color: #999;
    }
    #closeModal:hover {
        color: black;
    }

### js/script.js
        // Dummy data login
        const dataPengguna = [
            {
                id: 1,
                nama: "Rina Wulandari",
                email: "rina@gmail.com",
                password: "rina123",
                role: "User",
            },
            {
                id: 2,
                nama: "Agus Pranoto",
                email: "agus@gmail.com",
                password: "agus123",
                role: "User",
            },
            {
                id: 3,
                nama: "Siti Marlina",
                email: "siti@gmail.com",
                password: "siti123",
                role: "Admin",
            }
        ];
        
        // Login validation
        document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();
        
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
        
            const user = dataPengguna.find(u => u.email === email && u.password === password);
        
            if (user) {
                alert("Login berhasil!");
        
                // Simpan data pengguna yang login (opsional)
                localStorage.setItem("userLogin", JSON.stringify(user));
        
                // Kalau admin, arahkan ke halaman admin
                if (user.role === "Admin") {
                    window.location.href = "admin-dashboard.html";
                } else {
                    window.location.href = "dashboard.html";
                }
        
            } else {
                alert("Email/password yang anda masukkan salah!");
            }
        });
        
        // Modal handling
        const modal = document.getElementById("modalBox");
        const modalTitle = document.getElementById("modalTitle");
        const modalText = document.getElementById("modalText");
        const closeModal = document.getElementById("closeModal");
        
        document.getElementById("btnLupa").addEventListener("click", () => {
            modal.style.display = "block";
            modalTitle.textContent = "Lupa Password";
            modalText.textContent = "Silakan hubungi admin untuk reset password anda.";
        });
        
        document.getElementById("btnDaftar").addEventListener("click", () => {
            modal.style.display = "block";
            modalTitle.textContent = "Daftar Akun Baru";
            modalText.textContent = "Fitur pendaftaran sedang dalam pengembangan.";
        });
        
        closeModal.addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", (e) => {
            if (e.target == modal) modal.style.display = "none";
        });

<img width="960" height="540" alt="1" src="https://github.com/user-attachments/assets/f27bd9a3-0289-4481-84fb-0bca0efec844" />
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/2ca0f4de-fe9a-4911-badb-1ce8f8c5663e" />
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/e131eb24-d915-43d7-8dc3-76641ce95f6f" />

Halaman yang sudah bisa di buka file login.html di browser:
- login dengan data dummy (user@example.com / 12345)
- muncul alert kalau salah
- munculkan modal box untuk “Lupa Password” & “Daftar”


---


## Halaman dashboard.html
### dashboard.html
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dashboard - Toko Buku Online</title>
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <div class="dashboard-container">
                <h2 id="greeting">Selamat Datang!</h2>
        
                <div class="menu">
                    <button onclick="goToPage('stok.html')">📚 Informasi Stok / Katalog</button>
                    <button onclick="goToPage('tracking.html')">🚚 Tracking Pengiriman</button>
                    <button onclick="goToPage('checkout.html')">🛒 Laporan Pemesanan</button>
                    <button onclick="goToPage('history.html')">📜 History Transaksi</button>
                </div>
            </div>
        
            <script src="js/script.js"></script>
        </body>
        </html>

### css/style.css
Tambahkan ke dalam file CSS yang sudah dibuat.

        /* Dashboard */
        .dashboard-container {
            width: 400px;
            background: #fff;
            margin: 100px auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .dashboard-container h2 {
            color: #333;
            margin-bottom: 20px;
        }
        
        .menu button {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            background-color: #2c7be5;
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            font-size: 15px;
        }
        
        .menu button:hover {
            background-color: #1a5fd1;
        }

### js/script.js
Tambahkan ke dalam file JS yang sudah dibuat.

        // Greeting otomatis di dashboard
        function showGreeting() {
            const hour = new Date().getHours();
            const greetingElement = document.getElementById("greeting");
            let greetingText = "";
        
            if (hour < 12) {
                greetingText = "Selamat Pagi, Chi!";
            } else if (hour < 18) {
                greetingText = "Selamat Siang, Chi!";
            } else {
                greetingText = "Selamat Sore, Chi!";
            }
        
            greetingElement.textContent = greetingText;
        }
        
        if (document.getElementById("greeting")) {
            showGreeting();
        }
        
        // Navigasi ke halaman lain
        function goToPage(page) {
            window.location.href = page;
        }

<img width="960" height="540" alt="4" src="https://github.com/user-attachments/assets/a633498b-39a0-43bd-aea7-bafca8c78515" />

Yang sudah bisa jalan di halaman ini:
- Menampilkan ucapan otomatis tergantung jam di device.
- Tombol navigasi langsung menuju halaman lain.


---


## halaman stok.html
Tujuan Halaman:
- Menampilkan daftar buku dari data dummy (data.js)
- Bisa tambah baris stok baru lewat form input
- Data tampil dinamis di tabel

### stok.html
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Informasi Stok Buku</title>
          <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
          <div class="stok-container">
            <h2>📚 Informasi Stok / Katalog Buku</h2>
        
            <table id="tabelBuku">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Judul Buku</th>
                  <th>Penulis</th>
                  <th>Harga</th>
                  <th>Stok</th>
                </tr>
              </thead>
              <tbody>
                <!-- isi tabel diisi dari JS -->
              </tbody>
            </table>
        
            <h3>➕ Tambah Buku Baru</h3>
            <form id="formTambah">
              <input type="text" id="judul" placeholder="Judul Buku" required>
              <input type="text" id="penulis" placeholder="Penulis" required>
              <input type="number" id="harga" placeholder="Harga" required>
              <input type="number" id="stok" placeholder="Stok" required>
              <button type="submit">Tambah</button>
            </form>
        
            <br>
            <button onclick="goToPage('dashboard.html')">⬅ Kembali ke Dashboard</button>
          </div>
        
          <script src="js/data.js"></script>
          <script src="js/script.js"></script>
        </body>
        </html>

### js/data.js
Buat file baru data.js di folder js.

        // Data dummy katalog buku
        const dataKatalogBuku = [
            {
                kodeBarang: "ASIP4301",
                namaBarang: "Pengantar Ilmu Komunikasi",
                jenisBarang: "Buku Ajar",
                edisi: "2",
                stok: 548,
                harga: "Rp 180.000",
                cover: "img/pengantar_komunikasi.jpg"
            },
            {
                kodeBarang: "EKMA4002",
                namaBarang: "Manajemen Keuangan",
                jenisBarang: "Buku Ajar",
                edisi: "3",
                stok: 392,
                harga: "Rp 220.000",
                cover: "img/manajemen_keuangan.jpg"
            },
            {
                kodeBarang: "EKMA4310",
                namaBarang: "Kepemimpinan",
                jenisBarang: "Buku Ajar",
                edisi: "1",
                stok: 278,
                harga: "Rp 150.000",
                cover: "img/kepemimpinan.jpg"
            },
            {
                kodeBarang: "BIOL4211",
                namaBarang: "Mikrobiologi Dasar",
                jenisBarang: "Buku Ajar",
                edisi: "2",
                stok: 165,
                harga: "Rp 200.000",
                cover: "img/mikrobiologi.jpg"
            },
            {
                kodeBarang: "PAUD4401",
                namaBarang: "Perkembangan Anak Usia Dini",
                jenisBarang: "Buku Ajar",
                edisi: "4",
                stok: 204,
                harga: "Rp 250.000",
                cover: "img/paud_perkembangan.jpeg"
            }
        ]

### js/script.js
Tambahkan di bawah kode sebelumnya.

        // ====== Halaman Stok Buku ======
        function tampilkanBuku() {
          const tbody = document.querySelector("#tabelBuku tbody");
          if (!tbody) return;
        
          tbody.innerHTML = ""; // bersihkan tabel dulu
        
          dataKatalogBuku.forEach((buku, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${buku.judul}</td>
              <td>${buku.penulis}</td>
              <td>Rp ${buku.harga.toLocaleString()}</td>
              <td>${buku.stok}</td>
            `;
            tbody.appendChild(row);
          });
        }
        
        // Tambah buku baru
        const formTambah = document.getElementById("formTambah");
        if (formTambah) {
          formTambah.addEventListener("submit", (e) => {
            e.preventDefault();
            const judul = document.getElementById("judul").value;
            const penulis = document.getElementById("penulis").value;
            const harga = parseInt(document.getElementById("harga").value);
            const stok = parseInt(document.getElementById("stok").value);
        
            dataKatalogBuku.push({ judul, penulis, harga, stok });
            tampilkanBuku();
        
            formTambah.reset();
            alert("Buku baru berhasil ditambahkan!");
          });
        }
        
        // Jalankan kalau halaman stok.html dibuka
        if (document.getElementById("tabelBuku")) {
          tampilkanBuku();
        }

### style.css
Tambahkan di bawah file CSS.

        /* Halaman Stok Buku */
        .stok-container {
          width: 80%;
          max-width: 800px;
          background: #fff;
          margin: 50px auto;
          padding: 20px 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        
        table th, table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        
        table th {
          background-color: #2c7be5;
          color: white;
        }
        
        form input {
          padding: 8px;
          margin: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

<img width="960" height="540" alt="5" src="https://github.com/user-attachments/assets/f3736f86-763c-4b94-8fd7-0da0408c2e35" />

Yang sudah bisa jalan di halaman ini:
- Tabel menampilkan data dari data.js
- Bisa tambah buku baru → langsung muncul di tabel
- Semua tanpa reload halaman


---


## Halaman checkout.html
Di halaman ini nanti user bisa:
- isi data pemesan (nama, alamat, no HP)
- pilih buku dari katalog (yang diambil dari data.js)
- isi jumlah buku
- pilih metode pembayaran
- lihat total harga otomatis

### checkout.html
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pemesanan Buku</title>
          <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
          <div class="checkout-container">
            <h2>🛒 Form Pemesanan Buku</h2>
        
            <form id="formPesan">
              <h3>Data Pemesan</h3>
              <input type="text" id="nama" placeholder="Nama Lengkap" required>
              <input type="text" id="alamat" placeholder="Alamat" required>
              <input type="text" id="telepon" placeholder="Nomor HP" required>
        
              <h3>Data Pemesanan</h3>
              <label for="pilihBuku">Pilih Buku</label>
              <select id="pilihBuku" required></select>
        
              <label for="jumlah">Jumlah</label>
              <input type="number" id="jumlah" min="1" value="1" required>
        
              <label for="metode">Metode Pembayaran</label>
              <select id="metode" required>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="COD">COD</option>
              </select>
        
              <h3>Total: <span id="totalHarga">Rp 0</span></h3>
        
              <button type="submit">Pesan Sekarang</button>
            </form>
        
            <br>
            <button onclick="goToPage('dashboard.html')">⬅ Kembali ke Dashboard</button>
          </div>
        
          <script src="js/data.js"></script>
          <script src="js/script.js"></script>
        </body>
        </html>

### js/script.js
Tambahkan di bagian paling bawah file sebelumnya.

        // ====== Halaman Checkout / Pemesanan ======
        function isiPilihanBuku() {
          const select = document.getElementById("pilihBuku");
          if (!select) return;
        
          select.innerHTML = "";
          dataKatalogBuku.forEach((buku, index) => {
            const opt = document.createElement("option");
            opt.value = index;
            opt.textContent = `${buku.judul} - Rp ${buku.harga.toLocaleString()}`;
            select.appendChild(opt);
          });
        }
        
        // Update total harga otomatis
        function updateTotal() {
          const select = document.getElementById("pilihBuku");
          const jumlah = document.getElementById("jumlah");
          const totalHarga = document.getElementById("totalHarga");
        
          if (!select || !jumlah) return;
        
          const buku = dataKatalogBuku[select.value];
          const total = buku.harga * jumlah.value;
          totalHarga.textContent = "Rp " + total.toLocaleString();
        }
        
        // Event listener
        if (document.getElementById("pilihBuku")) {
          isiPilihanBuku();
          updateTotal();
        
          document.getElementById("pilihBuku").addEventListener("change", updateTotal);
          document.getElementById("jumlah").addEventListener("input", updateTotal);
        
          document.getElementById("formPesan").addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Pemesanan berhasil dilakukan!\nTerima kasih telah memesan 😊");
            document.getElementById("formPesan").reset();
            document.getElementById("totalHarga").textContent = "Rp 0";
          });
        }

### css/style.css
Tambahkan di bagian paling bawah file sebelumnya.

        /* Halaman Checkout */
        .checkout-container {
          width: 80%;
          max-width: 600px;
          background: #fff;
          margin: 50px auto;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .checkout-container h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .checkout-container form input,
        .checkout-container form select {
          width: 100%;
          padding: 10px;
          margin: 6px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        
        .checkout-container button {
          width: 100%;
          padding: 12px;
          background-color: #2c7be5;
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
        
        .checkout-container button:hover {
          background-color: #1a5fd1;
        }

<img width="960" height="540" alt="7" src="https://github.com/user-attachments/assets/e5a98e89-7bb1-4b12-b34b-d4c362092b59" />
<img width="960" height="253" alt="8" src="https://github.com/user-attachments/assets/35f1530d-1671-46d5-9771-968f5937dc40" />

Yang sudah bisa jalan di halaman ini:
- Dropdown buku otomatis dari data.js
- Total harga langsung berubah sesuai jumlah
- Pesan → muncul alert sukses
- Data form otomatis reset setelah pesan


---


## Halaman tracking.html
Nanti user tinggal masukin Nomor Delivery Order, terus muncul:
- Nama Pemesan
- Status Pengiriman (pakai progress bar warna)
- Detail pengiriman: ekspedisi, tanggal kirim, jenis paket, total bayar

### tracking.html
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tracking Pengiriman</title>
          <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
          <div class="tracking-container">
            <h2>🚚 Tracking Pengiriman</h2>
        
            <form id="formTracking">
              <input type="text" id="noOrder" placeholder="Masukkan Nomor Delivery Order" required>
              <button type="submit">Cari</button>
            </form>
        
            <div id="hasilTracking" class="hasil-tracking" style="display: none;">
              <h3>📦 Detail Pengiriman</h3>
              <p><strong>Nama Pemesan:</strong> <span id="namaPemesan"></span></p>
              <p><strong>Status Pengiriman:</strong></p>
              <div class="progress-bar">
                <div id="progressFill"></div>
              </div>
              <ul>
                <li><strong>Ekspedisi:</strong> <span id="ekspedisi"></span></li>
                <li><strong>Tanggal Kirim:</strong> <span id="tanggalKirim"></span></li>
                <li><strong>Jenis Paket:</strong> <span id="jenisPaket"></span></li>
                <li><strong>Total Pembayaran:</strong> <span id="totalBayar"></span></li>
              </ul>
            </div>
        
            <br>
            <button onclick="goToPage('dashboard.html')">⬅ Kembali ke Dashboard</button>
          </div>
        
          <script src="js/data.js"></script>
          <script src="js/script.js"></script>
        </body>
        </html>


### js/data.js
Tambahkan di bawah data katalog buku.

        // Data dummy tracking pesanan
        const dataTracking = {
            "20230012": {
                nomorDO: "20230012",
                nama: "Rina Wulandari",
                status: "Dalam Perjalanan",
                ekspedisi: "JNE",
                tanggalKirim: "2025-08-25",
                paket: "0JKT01",
                total: "Rp 180.000",
                perjalanan:[
                    {
                        waktu: "2025-08-25 10:12:20",
                        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
                    },
                    {
                        waktu: "2025-08 25 14:07:56",
                        keterangan: "Tiba di Hub: TANGERANG SELATAN"
                    },
                    {
                        waktu: "2025-08-25 10:12:20",
                        keterangan: "Diteruskan ke Kantor Jakarta Selatan"
                    },
                ]
            },
            "20230013": {
                nomorDO: "20230013",
                nama: "Agus Pranoto",
                status: "Dikirim",
                ekspedisi: "Pos Indonesia",
                tanggalKirim: "2025-08-25",
                paket: "0UPBJJBDG",
                total: "Rp 220.000",
                perjalanan:[
                    {
                        waktu: "2025-08-25 10:12:20",
                        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
                    },
                    {
                        waktu: "2025-08-25 14:07:56",
                        keterangan: "Tiba di Hub: TANGERANG SELATAN"
                    },      
                    {
                        waktu: "2025-08-25 16:30:10",
                        keterangan: "Diteruskan ke Kantor Kota Bandung"
                    },
                    {
                        waktu: "2025-08-26 12:15:33",
                        keterangan: "Tiba di Hub: Kota BANDUNG"
                    },
                    {
                        waktu: "2025-08-26 15:06:12",
                        keterangan: "Proses antar ke Cimahi"
                    },
                    {
                        waktu: "2025-08-26 20:00:00",
                        keterangan: "Selesai Antar. Penerima: Agus Pranoto"
                    }
                ]
            }
        }

### js/script.js
Tambahkan di paling bawah.

        // ====== Halaman Tracking Pengiriman ======
        if (document.getElementById("formTracking")) {
          const formTracking = document.getElementById("formTracking");
          formTracking.addEventListener("submit", (e) => {
            e.preventDefault();
            const noOrder = document.getElementById("noOrder").value.trim().toUpperCase();
            const hasil = dataTracking.find(item => item.noOrder === noOrder);
        
            if (hasil) {
              document.getElementById("hasilTracking").style.display = "block";
              document.getElementById("namaPemesan").textContent = hasil.nama;
              document.getElementById("ekspedisi").textContent = hasil.ekspedisi;
              document.getElementById("tanggalKirim").textContent = hasil.tanggalKirim;
              document.getElementById("jenisPaket").textContent = hasil.jenisPaket;
              document.getElementById("totalBayar").textContent = "Rp " + hasil.total.toLocaleString();
        
              // progress bar
              const progressFill = document.getElementById("progressFill");
              progressFill.style.width = hasil.progress + "%";
              progressFill.textContent = hasil.status;
            } else {
              alert("Nomor Order tidak ditemukan!");
              document.getElementById("hasilTracking").style.display = "none";
            }
          });
        }

### style.css
Tambahkan di paling bawah.

        /* Halaman Tracking */
        .tracking-container {
          width: 80%;
          max-width: 600px;
          background: #fff;
          margin: 50px auto;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        
        .tracking-container form input {
          width: 70%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        
        .tracking-container form button {
          padding: 10px 15px;
          background: #2c7be5;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        
        .tracking-container form button:hover {
          background-color: #1a5fd1;
        }
        
        .progress-bar {
          width: 100%;
          height: 25px;
          background-color: #e0e0e0;
          border-radius: 10px;
          margin: 10px 0;
          overflow: hidden;
        }
        
        #progressFill {
          height: 100%;
          background-color: #2c7be5;
          text-align: center;
          color: white;
          font-weight: bold;
          line-height: 25px;
          transition: width 0.5s ease;
        }

<img width="960" height="540" alt="6" src="https://github.com/user-attachments/assets/c1cb2b82-e376-4b3c-a344-9f0964aca343" />

Yang sudah bisa jalan di halaman ini:
- Ketik nomor order (misal ORD001 atau ORD002)
- Muncul detail lengkap pengiriman
- Progress bar otomatis sesuai status
- Kalau nomor tidak ada → alert muncul

