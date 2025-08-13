// Enhanced Nova website functionality
// Handle year, navigation, smooth scrolling, and enhanced animations
(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const html = document.documentElement;
  
  // Remove initial loading class to fade in
  window.addEventListener('DOMContentLoaded', () => {
    html.classList.remove('is-loading');
    
    // Initialize enhanced features
    initSmoothScrolling();
    initIntersectionObserver();
    initEnhancedInteractions();
  });

  // Navigation toggle functionality
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    
    // Close menu on outside click (mobile)
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scrolling for navigation links
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (menu && menu.classList.contains('open')) {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // Intersection Observer for enhanced animations
  function initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all cards and stats for animation
    const animatedElements = document.querySelectorAll('.card, .stat');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Enhanced interactions and micro-animations
  function initEnhancedInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05) translateY(-2px)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1) translateY(0)';
      });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.5)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
      });
    });

    // Social link interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px) scale(1.1)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Add scroll-based header effects
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Add loading states for buttons (if needed for future forms)
  function addLoadingState(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.innerHTML = '<span class="loading-spinner"></span> Loading...';
    } else {
      button.disabled = false;
      button.innerHTML = button.getAttribute('data-original-text') || 'Submit';
    }
  }

  // Initialize any forms with enhanced validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"], .btn-primary');
    if (submitBtn) {
      submitBtn.setAttribute('data-original-text', submitBtn.textContent);
      
      form.addEventListener('submit', (e) => {
        // Add loading state
        addLoadingState(submitBtn, true);
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
          addLoadingState(submitBtn, false);
        }, 2000);
      });
    }
  });

})();


