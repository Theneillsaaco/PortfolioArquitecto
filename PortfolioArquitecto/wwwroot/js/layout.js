// ==========================================
// PORTFOLIO MODERNO - JAVASCRIPT
// ==========================================

window.initializeModernPortfolio = () => {
    console.log('Inicializando Portfolio Moderno...');

    // Inicializar todos los componentes
    initScrollAnimations();
    initPortfolioFilters();
    initSmoothScroll();
    initParallaxEffects();
    initTypewriterEffect();
    initCounterAnimations();
    initFormValidation();

    console.log('Portfolio Moderno inicializado correctamente');
};

// ==========================================
// ANIMACIONES DE SCROLL
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';

                // Agregar clase para animaciones CSS específicas
                entry.target.classList.add('animate-in');

                // Animar elementos hijos con delay
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });

                // Desconectar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos con animación
    const animatedElements = document.querySelectorAll([
        '.section-badge',
        '.section-title-modern',
        '.portfolio-card-modern',
        '.timeline-item-modern',
        '.point-item',
        '.contact-item-modern',
        '.floating-card'
    ].join(','));

    animatedElements.forEach(el => {
        // Estado inicial
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        observer.observe(el);
    });
}

// ==========================================
// FILTROS DE PORTFOLIO
// ==========================================
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn-modern');
    const portfolioItems = document.querySelectorAll('.portfolio-card-modern');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrar elementos
            portfolioItems.forEach(item => {
                const shouldShow = filter === 'all' || item.classList.contains(filter);

                if (shouldShow) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.style.display = 'block';

                    // Animar entrada
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
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

// ==========================================
// SCROLL SUAVE
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para scroll programático desde Blazor
window.scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// ==========================================
// EFECTOS PARALLAX
// ==========================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-card, .about-decorative-elements > div');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.1;

        parallaxElements.forEach((element, index) => {
            const speed = 0.02 + (index * 0.01);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Parallax para el hero
    const heroSection = document.querySelector('.hero-modern');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translate3d(0, ${parallax}px, 0)`;
        });
    }
}

// ==========================================
// EFECTO TYPEWRITER
// ==========================================
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');

    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid';
        element.style.animation = 'blink-caret 1s infinite';

        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// ==========================================
// ANIMACIONES DE CONTADORES
// ==========================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Mantener el formato original (+ para números con +)
            const originalText = counter.textContent;
            const hasPlus = originalText.includes('+');
            const suffix = hasPlus ? '+' : '';

            counter.textContent = Math.floor(current) + suffix;
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ==========================================
// VALIDACIÓN DE FORMULARIO
// ==========================================
function initFormValidation() {
    const form = document.querySelector('.contact-form-modern form');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-control-modern');
    const submitButton = form.querySelector('button[type="submit"], .btn-primary-modern');

    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });

    // Manejo del envío del formulario
    if (submitButton) {
        submitButton.addEventListener('click', handleFormSubmit);
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || field.id;

        // Limpiar errores previos
        clearFieldError(field);

        // Validaciones específicas
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        } else if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function clearErrors(e) {
        clearFieldError(e.target);
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';

        // Crear o actualizar mensaje de error
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                animation: slideInDown 0.3s ease;
            `;
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';

        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        // Validar todos los campos
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Mostrar estado de carga
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="spinner-border spinner-border-sm me-2"></i>Enviando...';
            submitButton.disabled = true;

            // Simular envío (aquí iría la lógica real de envío)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showSuccessMessage();

                // Resetear formulario
                form.reset();

                // Restaurar botón
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        } else {
            // Enfocar el primer campo con error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    function showSuccessMessage() {
        // Crear mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        `;
        successMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>¡Mensaje enviado correctamente!</span>
            </div>
        `;

        document.body.appendChild(successMessage);

        // Remover después de 5 segundos
        setTimeout(() => {
            successMessage.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ==========================================
// EFECTOS DE MOUSE
// ==========================================
function initMouseEffects() {
    const cards = document.querySelectorAll('.portfolio-card-modern, .timeline-content-modern, .contact-item-modern');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Efecto de seguimiento del mouse
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    });
}

// ==========================================
// LAZY LOADING DE IMÁGENES
// ==========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// NAVEGACIÓN STICKY
// ==========================================
function initStickyNavigation() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const navHeight = nav.offsetHeight;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (scrolled > navHeight) {
            nav.classList.add('navbar-scrolled');
            nav.style.transform = 'translateY(0)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.classList.remove('navbar-scrolled');
            nav.style.boxShadow = 'none';
        }
    });
}

// ==========================================
// UTILIDADES
// ==========================================

// Debounce function para optimizar eventos de scroll
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Detectar soporte para animaciones
function supportsAnimations() {
    return 'animate' in document.createElement('div') ||
        'webkitAnimate' in document.createElement('div');
}

// ==========================================
// ANIMACIONES CSS ADICIONALES
// ==========================================
const additionalCSS = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: currentColor; }
    }
    
    .animate-in {
        animation-fill-mode: both;
    }
    
    .animate-child {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .spinner-border-sm {
        width: 1rem;
        height: 1rem;
        border-width: 2px;
    }
    
    .spinner-border {
        display: inline-block;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spinner-border 0.75s linear infinite;
    }
    
    @keyframes spinner-border {
        to { transform: rotate(360deg); }
    }
`;

// Inyectar CSS adicional
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// ==========================================
// INICIALIZACIÓN AL CARGAR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes adicionales si no se llama desde Blazor
    if (!window.portfolioInitialized) {
        initMouseEffects();
        initLazyLoading();
        initStickyNavigation();
        window.portfolioInitialized = true;
    }
});

// Optimizar rendimiento en scroll
window.addEventListener('scroll', debounce(() => {
    // Aquí van funciones optimizadas de scroll
}, 10));

// Manejo de redimensionado
window.addEventListener('resize', debounce(() => {
    // Recalcular posiciones si es necesario
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach(card => {
        card.style.transform = 'none';
    });
}, 250));