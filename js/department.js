// js/department.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animasi Fade-in saat Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 2. Expand/Collapse Program Kerja
    const expandBtns = document.querySelectorAll('.btn-expand');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Ambil elemen div detail tepat di atas tombol
            const detail = this.previousElementSibling;
            
            detail.classList.toggle('open');
            
            // Ubah teks tombol
            if (detail.classList.contains('open')) {
                this.innerHTML = 'Tutup Detail <span>-</span>';
            } else {
                this.innerHTML = 'Lihat Detail <span>+</span>';
            }
        });
    });

    // 3. Lightbox Gallery Logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;

    // Kumpulkan data gambar ke array
    const imagesData = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        caption: item.getAttribute('data-caption')
    }));

    // Buka modal
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // cegah scroll background
        });
    });

    // Update konten modal
    function updateLightbox() {
        lightboxImg.src = imagesData[currentIndex].src;
        lightboxCaption.textContent = imagesData[currentIndex].caption;
    }

    // Tutup modal
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox(); // Tutup jika klik area hitam
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Next / Prev Gambar
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imagesData.length;
        updateLightbox();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
        updateLightbox();
    });

    // Navigasi dengan Keyboard
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imagesData.length;
            updateLightbox();
        }
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
            updateLightbox();
        }
    });

});



// !!!  SLIDER FOTO DOKUMENTASI (Kiri-Kanan)

    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.gallery-slide');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        let currentSlideIndex = 0;

        // Jika foto cuma 1, sembunyikan tombol panahnya
        if (slides.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        function showSlide(index) {
            // Hapus class 'active' dari semua gambar
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Logika Looping (Muter)
            if (index >= slides.length) currentSlideIndex = 0; // Balik ke awal
            if (index < 0) currentSlideIndex = slides.length - 1; // Balik ke akhir
            
            // Tampilkan gambar yang baru
            slides[currentSlideIndex].classList.add('active');
        }

        // Event saat tombol Kanan diklik
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke lightbox
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        });

        // Event saat tombol Kiri diklik
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke lightbox
            currentSlideIndex--;
            showSlide(currentSlideIndex);
        });
    });