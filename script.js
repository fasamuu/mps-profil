// Mengambil elemen dari HTML
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-item');

// Fungsi untuk membuka/menutup menu saat hamburger diklik
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// UX Tambahan: Menutup menu otomatis ketika pengguna mengklik salah satu link menu
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});// Mengambil elemen dari HTML
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-item');

// Fungsi untuk membuka/menutup menu saat hamburger diklik
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// UX Tambahan: Menutup menu otomatis ketika pengguna mengklik salah satu link menu
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});