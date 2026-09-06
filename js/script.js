// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown toggle untuk Mobile
    if (dropdownBtn && window.innerWidth <= 767) {
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });
    }

    // 2. Back to Top Button
    const backToTopBtn = document.getElementById('btn-back-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});