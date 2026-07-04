/* ===================================
   ZATІ-ŞAHANE DAVET - MAIN JavaScript
   =================================== */

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Nav linklerine tıklandığında menüyü kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Scroll animasyonları
  initScrollAnimations();

  // Header scroll efekti
  initHeaderScroll();

  // Active nav link
  updateActiveNavLink();

  // Smooth scroll
  initSmoothScroll();

  // Gallery lightbox
  initGalleryLightbox();

  // Form submits
  initForms();

  // Stats counter
  initStatsCounter();
});

/* ==================
   SCROLL ANIMATIONS
   ================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade-in sınıfı ekle
        if (entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('visible');
        }
        // Slide-up sınıfı ekle
        if (entry.target.classList.contains('slide-up')) {
          entry.target.classList.add('visible');
        }
        // Slide-left sınıfı ekle
        if (entry.target.classList.contains('slide-left')) {
          entry.target.classList.add('visible');
        }
        // Slide-right sınıfı ekle
        if (entry.target.classList.contains('slide-right')) {
          entry.target.classList.add('visible');
        }
        // Scale-up sınıfı ekle
        if (entry.target.classList.contains('scale-up')) {
          entry.target.classList.add('visible');
        }
        // Stagger items
        if (entry.target.classList.contains('stagger-item')) {
          entry.target.classList.add('visible');
        }
        
        // Bir kez görüldüğü zaman observer'ı kaldır (performans için)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Tüm animasyon öğelerini gözlemle
  document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-up, .stagger-item').forEach(element => {
    observer.observe(element);
  });
}

/* ==================
   HEADER SCROLL
   ================== */
function initHeaderScroll() {
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

/* ==================
   ACTIVE NAV LINK
   ================== */
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==================
   SMOOTH SCROLL
   ================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==================
   GALLERY LIGHTBOX
   ================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  let currentIndex = 0;

  if (!lightbox) return;

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      currentIndex = index;
      const imgSrc = this.querySelector('img').src;
      lightboxImage.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });

  // Navigation
  document.querySelector('.lightbox-prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    lightboxImage.src = imgSrc;
  });

  document.querySelector('.lightbox-next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    lightboxImage.src = imgSrc;
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      const imgSrc = galleryItems[currentIndex].querySelector('img').src;
      lightboxImage.src = imgSrc;
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      const imgSrc = galleryItems[currentIndex].querySelector('img').src;
      lightboxImage.src = imgSrc;
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* ==================
   FORMS
   ================== */
function initForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Form validation
      const isValid = validateForm(this);

      if (isValid) {
        // Form data collect
        const formData = new FormData(this);
        
        // Simulated form submission
        console.log('Form gönderildi:', Object.fromEntries(formData));
        
        // Success message
        showNotification('Formunuz başarıyla gönderildi! Kısa sürede size ulaşacağız.', 'success');
        
        // Reset form
        this.reset();
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ff6b6b';
      isValid = false;
    } else {
      input.style.borderColor = '';
    }

    // Email validation
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.style.borderColor = '#ff6b6b';
        isValid = false;
      }
    }
  });

  return isValid;
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? 'var(--primary-gold)' : 'var(--primary-light)'};
    color: ${type === 'success' ? 'var(--primary-dark)' : 'var(--primary-dark)'};
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    z-index: 10000;
    animation: slideUp 0.3s ease-out;
    box-shadow: var(--shadow-gold-lg);
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/* ==================
   STATS COUNTER
   ================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const finalNumber = parseInt(entry.target.textContent.replace(/\D/g, ''));
        const suffix = entry.target.textContent.replace(/\d+/g, '');
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = finalNumber / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= finalNumber) {
            entry.target.textContent = finalNumber + suffix;
            entry.target.classList.add('counted');
            clearInterval(counter);
          } else {
            entry.target.textContent = Math.floor(current) + suffix;
          }
        }, duration / steps);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(number => observer.observe(number));
}

/* ==================
   PARALLAX EFFECT
   ================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', function() {
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = window.scrollY * speed;
      element.style.backgroundPosition = `center ${yPos}px`;
    });
  });
}

/* ==================
   PAGE TRANSITIONS
   ================== */
function initPageTransitions() {
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Eğer aynı sayfaya gidiyorsa transitionı yapma
      if (href === window.location.pathname) {
        e.preventDefault();
        return;
      }

      // İç linkler için transition yapma
      if (href.startsWith('#')) {
        return;
      }

      e.preventDefault();

      // Transition animation
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease-out';

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

// Initialize paralax on page load
window.addEventListener('load', initParallax);

// Initialize page transitions
initPageTransitions();

/* ==================
   UTILITY FUNCTIONS
   ================== */

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Get element by data attribute
function getElementByData(key, value) {
  return document.querySelector(`[data-${key}="${value}"]`);
}

// Add class to element
function addClass(element, className) {
  element.classList.add(className);
}

// Remove class from element
function removeClass(element, className) {
  element.classList.remove(className);
}

// Toggle class on element
function toggleClass(element, className) {
  element.classList.toggle(className);
}

// Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Call lazy load on document ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
  lazyLoadImages();
}

// Console log
console.log('%cZatı-Şahane Davet 🎉', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cLüks Davet ve Organizasyon Hizmetleri', 'font-size: 14px; color: #faf6f0; font-style: italic;');
