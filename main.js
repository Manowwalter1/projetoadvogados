document.addEventListener('DOMContentLoaded', function() {
    // Slider principal
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // Configurar eventos de clique
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideInterval();
            startSlideInterval();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideInterval();
            startSlideInterval();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideInterval();
            startSlideInterval();
        });
    });

    // Iniciar slider automático
    startSlideInterval();

    // Slider de depoimentos
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        
        currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentTestimonial].classList.add('active');
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }

    // Iniciar slider de depoimentos automático se existir
    if (testimonialSlides.length > 0) {
        startTestimonialInterval();
    }

    // Slider de advogados
    const lawyersSlider = document.querySelector('.lawyers-slider');
    const prevLawyer = document.querySelector('.prev-lawyer');
    const nextLawyer = document.querySelector('.next-lawyer');

    if (lawyersSlider && prevLawyer && nextLawyer) {
        const scrollAmount = 320; // Largura do card + gap

        prevLawyer.addEventListener('click', () => {
            lawyersSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextLawyer.addEventListener('click', () => {
            lawyersSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    mobileDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });

    // Barra de pesquisa
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.add('active');
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchBar.classList.remove('active');
        });
    }

    // Header scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animação de números
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(number => {
            const target = parseInt(number.textContent);
            const suffix = number.textContent.replace(/[0-9]/g, '');
            let count = 0;
            const duration = 2000; // 2 segundos
            const increment = Math.ceil(target / (duration / 16)); // 60fps
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    number.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    number.textContent = count + suffix;
                }
            }, 16);
        });
    }

    // Observador de interseção para animar números quando visíveis
    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe o primeiro número estatístico
        if (statNumbers.length > 0) {
            observer.observe(statNumbers[0].parentElement.parentElement);
        }
    }

    // Inicializar AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botão WhatsApp flutuante
    const whatsappButton = document.createElement('div');
    whatsappButton.className = 'whatsapp-button';
    whatsappButton.innerHTML = '<a href="https://wa.me/5511987654321" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>';
    document.body.appendChild(whatsappButton);
});
