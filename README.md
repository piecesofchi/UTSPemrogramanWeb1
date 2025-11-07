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
Form: email & password.
Tombol “Login” → cek data dummy di data.js.
Kalau salah → alert("Email/password yang anda masukkan salah!")
Tombol “Lupa Password” dan “Daftar” → muncul dalam modal box (pop-up HTML & JS).

## 2. dashboard.html
Tampilkan menu navigasi ke:
Katalog Buku
Tracking Pengiriman
Laporan Pemesanan
History Transaksi
Tambahkan greeting berdasar waktu lokal:
Pagi → “Selamat Pagi!”
Siang → “Selamat Siang!”
Sore → “Selamat Sore!”

## 3. stok.html
Menampilkan data dari data.js → variable dataKatalogBuku (array of object).
Bisa tambah baris stok baru via tombol dan input menggunakan DOM JS.

## 4. checkout.html
Form untuk isi:
Data pemesan (nama, alamat, no. hp)
Pilihan buku, jumlah, metode pembayaran
Bisa tambah/ubah data pemesanan.
Tampilkan total harga.

## 5. tracking.html
Input: Nomor Delivery Order.
Ketika klik “Cari”, tampilkan:
Nama Pemesan
Status Pengiriman (pakai progress bar warna)
Detail ekspedisi, tanggal kirim, jenis paket, total pembayaran.


---


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
    const users = [
        { email: "user@example.com", password: "12345" },
        { email: "chi@example.com", password: "chi123" }
    ];
    
    // Login validation
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
    
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        const user = users.find(u => u.email === email && u.password === password);
    
        if (user) {
            alert("Login berhasil!");
            window.location.href = "dashboard.html";
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
