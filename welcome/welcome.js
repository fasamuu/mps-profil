/**
 * JAVASCRIPT WELCOME PAGE
 * Menangani animasi inisial, parallax ringan, tombol magnetik, dan transisi keluar.
 * Bebas framework, menggunakan Vanilla JS.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ANIMASI LOAD AWAL (Trigger CSS Sequence)
    // Memberikan sedikit jeda sebelum kelas is-loaded ditambahkan agar transisi terlihat mulus
    setTimeout(() => {
        document.body.classList.add('is-loaded');
    }, 100);

    // Deteksi jika user menggunakan perangkat mobile (untuk mematikan fitur mouse-heavy)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. PARALLAX RINGAN PADA BACKGROUND & LOGO (Hanya Desktop & Motion Enabled)
    if (!isMobile && !prefersReducedMotion) {
        const bgShapes = document.querySelectorAll('.bg-shape');
        const logo = document.getElementById('logo-trigger');

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // Range -1 to 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            // Gerakkan shape background berlawanan arah dengan mouse
            bgShapes.forEach((shape, index) => {
                const speed = (index + 1) * 15;
                shape.style.transform = `translate(${x * -speed}px, ${y * -speed}px)`;
            });

            // Tilt/gerak ringan pada logo
            if(logo) {
                logo.style.transform = `translate(${x * 10}px, ${y * 10}px) rotate(${x * 5}deg)`;
            }
        });

        // Reset logo position ketika mouse keluar dari window
        document.addEventListener('mouseleave', () => {
            if(logo) logo.style.transform = `translate(0px, 0px) rotate(0deg)`;
            bgShapes.forEach(shape => shape.style.transform = `translate(0px, 0px)`);
        });
    }

    // 3. MAGNETIC BUTTON INTERACTION (Hanya Desktop & Motion Enabled)
    const magBtn = document.getElementById('enter-btn');
    if (magBtn && !isMobile && !prefersReducedMotion) {
        magBtn.addEventListener('mousemove', (e) => {
            const rect = magBtn.getBoundingClientRect();
            // Menghitung jarak mouse dari tengah tombol
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Menggerakkan tombol sedikit ke arah kursor
            magBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        magBtn.addEventListener('mouseleave', () => {
            // Kembalikan ke posisi semula secara halus
            magBtn.style.transform = `translate(0px, 0px)`;
        });
    }

    // 4. TRANSISI KELUAR DAN REDIRECT KE HALAMAN UTAMA
    if (magBtn) {
        magBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const overlay = document.getElementById('transition-overlay');
            if(overlay) {
                // Munculkan tirai transisi
                overlay.classList.add('active');
                
                // Tunggu durasi CSS transition selesai (800ms) baru pindah halaman
                setTimeout(() => {
                    window.location.href = '../1.html';
                }, 800);
            } else {
                // Fallback jika tidak ada overlay
                window.location.href = '../1.html';
            }
        });
    }

    // 5. EASTER EGG (Klik logo 5 kali beruntun)
    const logoTrigger = document.getElementById('logo-trigger');
    const easterEggMsg = document.getElementById('easter-egg-msg');
    let clickCount = 0;
    let clickTimer;

    if (logoTrigger && easterEggMsg) {
        logoTrigger.addEventListener('click', () => {
            clickCount++;
            
            // Reset perhitungan jika user berhenti ngeklik selama 2 detik
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000);

            if (clickCount === 5) {
                // Panggil Easter Egg
                logoTrigger.classList.add('spin-animation');
                easterEggMsg.classList.add('show');
                
                // Bersihkan setelah animasi selesai
                setTimeout(() => {
                    logoTrigger.classList.remove('spin-animation');
                    easterEggMsg.classList.remove('show');
                    clickCount = 0;
                }, 3000);
            }
        });
    }
});