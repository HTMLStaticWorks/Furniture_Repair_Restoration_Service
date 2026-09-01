/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden-loader');
        }, 800); // Small delay to show off the loader
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 3. Theme Toggle (Dark/Light Mode)
    const themeToggleBtns = document.querySelectorAll('#themeToggle, #mobileThemeToggle');
    const themeIcons = document.querySelectorAll('#themeIcon, #mobileThemeIcon');
    
    // Check for saved theme preference or use system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeIcons.forEach(icon => {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        });
    } else {
        document.documentElement.classList.remove('dark');
        themeIcons.forEach(icon => {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        });
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle icon
            themeIcons.forEach(icon => {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            });
            
            // Toggle theme
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    });

    // 4. RTL Toggle
    const rtlToggleBtns = document.querySelectorAll('#rtlToggle, #mobileRtlToggle');
    if (rtlToggleBtns.length > 0) {
        // Check local storage for RTL preference
        if (localStorage.getItem('dir') === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }

        rtlToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentDir = document.documentElement.getAttribute('dir');
                if (currentDir === 'rtl') {
                    document.documentElement.setAttribute('dir', 'ltr');
                    localStorage.setItem('dir', 'ltr');
                } else {
                    document.documentElement.setAttribute('dir', 'rtl');
                    localStorage.setItem('dir', 'rtl');
                }
            });
        });
    }

    // 5. Sticky Header
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md', 'glass');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('shadow-md', 'glass');
                // header.classList.add('bg-transparent');
            }
        });
    }

    // 6. Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Active Navigation State
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('text-walnut-brown', 'dark:text-warm-beige', 'font-semibold', 'underline', 'decoration-2', 'underline-offset-8');
            link.classList.remove('text-gray-700', 'dark:text-gray-300');
        }
    });

    // 8. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => {
                    b.classList.remove('bg-walnut-brown', 'text-white');
                    b.classList.add('bg-gray-200', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300');
                });
                
                // Add active class to clicked
                btn.classList.add('bg-walnut-brown', 'text-white');
                btn.classList.remove('bg-gray-200', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 9. Image Comparison Slider
    const imageSliders = document.querySelectorAll('.image-slider-range');
    imageSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            const container = e.target.parentElement;
            const beforeWrapper = container.querySelector('.before-wrapper');
            const handle = container.querySelector('.slider-handle');
            
            if (beforeWrapper && handle) {
                beforeWrapper.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
                handle.style.left = `${val}%`;
            }
        });
    });
});

