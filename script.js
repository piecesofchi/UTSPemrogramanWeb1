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
