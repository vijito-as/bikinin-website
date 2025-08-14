// Enhanced Bikinin Website functionality
// Handle year, navigation, smooth scrolling, enhanced animations, FAQ accordion, and single-page navigation
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
    initFAQAccordion();
    initStickyHeader();
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

  // Enhanced smooth scrolling for single-page navigation
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

          // Update active navigation state
          updateActiveNavigation(targetId);
        }
      });
    });
  }

  // Update active navigation based on scroll position
  function updateActiveNavigation(currentSectionId) {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  // Sticky header with scroll effects
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class for styling
      if (currentScrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide/show header on scroll (optional)
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
      
      // Update active navigation based on scroll position
      updateActiveNavigationOnScroll();
    });
  }

  // Update active navigation based on scroll position
  function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // FAQ Accordion functionality
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all other FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
          } else {
            item.classList.add('active');
          }
        });
      }
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

    // Observe all cards, stats, and new elements for animation
    const animatedElements = document.querySelectorAll('.card, .stat, .pricing-card, .portfolio-card, .process-step, .testimonial-card, .benefit-item');
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

    // Credential badge interactions
    const credentialBadges = document.querySelectorAll('.credential-badge');
    credentialBadges.forEach(badge => {
      badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'translateY(-15px) scale(1.1)';
        badge.style.boxShadow = '0 15px 30px rgba(122, 162, 247, 0.3)';
      });
      
      badge.addEventListener('mouseleave', () => {
        badge.style.transform = '';
        badge.style.boxShadow = '';
      });
    });

    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

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

  // Add WhatsApp tracking for analytics (optional)
  function trackWhatsAppClick(button) {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Track WhatsApp click event (replace with your analytics code)
        console.log('WhatsApp consultation clicked');
        
        // You can add Google Analytics or other tracking here
        // gtag('event', 'click', { 'event_category': 'engagement', 'event_label': 'whatsapp_consultation' });
      });
    });
  }

  // Initialize WhatsApp tracking
  trackWhatsAppClick();

})();


