/**
 * Abdul Rafay — Portfolio & CV Interactive Engine
 * 1. Smooth Dynamic Parallax Background (Kinetic Typography)
 * 2. Reactive Navbar Drift & Morph System
 * 3. Lightbox Modal Gallery for Certificates
 * 4. Active Section Spy & Smooth Navigation
 * 5. Interactive Contact Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {

  // ═════════════════════════════════════════════════════════════════
  // 1. DYNAMIC PARALLAX BACKGROUND (KINETIC TYPOGRAPHY)
  // ═════════════════════════════════════════════════════════════════
  const watermarkWrapper = document.getElementById('parallaxWatermark');
  const watermarkText = document.getElementById('watermarkText');

  let latestScrollY = window.scrollY || window.pageYOffset;
  let currentTranslateX = 0;
  let targetTranslateX = 0;
  let isTicking = false;

  // Track scroll position using requestAnimationFrame for smooth 60fps glide
  function updateParallax() {
    latestScrollY = window.scrollY || window.pageYOffset;
    // Map vertical scroll directly to horizontal translation (glide effect)
    targetTranslateX = -(latestScrollY * 0.35);

    // Smooth linear interpolation (lerp)
    currentTranslateX += (targetTranslateX - currentTranslateX) * 0.08;

    if (watermarkWrapper) {
      watermarkWrapper.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
    }

    if (Math.abs(targetTranslateX - currentTranslateX) > 0.1) {
      requestAnimationFrame(updateParallax);
    } else {
      isTicking = false;
    }
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateParallax);
    }
  }, { passive: true });

  // Initial call
  requestAnimationFrame(updateParallax);


  // ═════════════════════════════════════════════════════════════════
  // 2. REACTIVE NAVBAR DRIFT & MORPH
  // ═════════════════════════════════════════════════════════════════
  const navLinks = document.querySelectorAll('.nav-link, .nav-brand');
  let defaultWatermark = "ABDUL RAFAY";
  let morphTimeout = null;

  function morphWatermark(newText) {
    if (!watermarkText || watermarkText.textContent === newText) return;

    clearTimeout(morphTimeout);
    watermarkText.classList.add('is-morphing');

    morphTimeout = setTimeout(() => {
      watermarkText.textContent = newText;
      watermarkText.classList.remove('is-morphing');
    }, 220);
  }

  navLinks.forEach(link => {
    // Morph text on hover
    link.addEventListener('mouseenter', () => {
      const morphTarget = link.getAttribute('data-morph');
      if (morphTarget) {
        morphWatermark(morphTarget);
      }
    });

    // Reset or keep active on leave
    link.addEventListener('mouseleave', () => {
      const activeLink = document.querySelector('.nav-link.is-active');
      const activeMorph = activeLink ? activeLink.getAttribute('data-morph') : defaultWatermark;
      morphWatermark(activeMorph || defaultWatermark);
    });

    // Trigger pulse and morph on click
    link.addEventListener('click', () => {
      const morphTarget = link.getAttribute('data-morph');
      if (morphTarget) {
        defaultWatermark = morphTarget;
        morphWatermark(morphTarget);
      }

      // Backend event trigger: pulse animation on watermark
      if (watermarkText) {
        watermarkText.classList.remove('is-pulsing');
        void watermarkText.offsetWidth; // Force reflow
        watermarkText.classList.add('is-pulsing');
      }

      const navContainer = document.getElementById('navLinks');
      const hamburger = document.getElementById('hamburgerBtn');
      if (navContainer && navContainer.classList.contains('is-open')) {
        navContainer.classList.remove('is-open');
        if (hamburger) {
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });


  // ═════════════════════════════════════════════════════════════════
  // 3. MOBILE HAMBURGER MENU TOGGLE
  // ═════════════════════════════════════════════════════════════════
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navContainer = document.getElementById('navLinks');

  if (hamburgerBtn && navContainer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navContainer.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }


  // ═════════════════════════════════════════════════════════════════
  // 4. ACTIVE SECTION SCROLL SPY
  // ═════════════════════════════════════════════════════════════════
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.nav-links .nav-link');

  const observerOptions = {
    rootMargin: '-30% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        mainNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            mainNavLinks.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');

            // Also update the default watermark morph target to current section
            const morph = link.getAttribute('data-morph');
            if (morph) {
              defaultWatermark = morph;
              morphWatermark(morph);
            }
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));


  // ═════════════════════════════════════════════════════════════════
  // 5. CERTIFICATE LIGHTBOX MODAL (WITH ESC DISMISSAL)
  // ═════════════════════════════════════════════════════════════════
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxIssuer = document.getElementById('lightboxIssuer');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const certCards = document.querySelectorAll('.cert-card');

  function openLightbox(src, title, issuer) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxIssuer) lightboxIssuer.textContent = issuer;

    lightboxModal.classList.add('is-open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling while viewing
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      const title = card.getAttribute('data-title') || 'Certificate';
      const issuer = card.getAttribute('data-issuer') || 'Accredited Credential';
      openLightbox(fullSrc, title, issuer);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // Dismiss lightbox on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('is-open')) {
      closeLightbox();
    }
  });


  // ═════════════════════════════════════════════════════════════════
  // 6. INTERACTIVE CONTACT FORM & CLIENT-SIDE VALIDATION
  // ═════════════════════════════════════════════════════════════════
  const contactForm = document.getElementById('contactForm');
  const formName = document.getElementById('formName');
  const formEmail = document.getElementById('formEmail');
  const formSubject = document.getElementById('formSubject');
  const formMessage = document.getElementById('formMessage');
  const formSuccess = document.getElementById('formSuccess');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Clear previous error states
      [formName, formEmail, formSubject, formMessage].forEach(inp => {
        if (inp) inp.classList.remove('is-invalid');
      });
      [nameError, emailError, subjectError, messageError].forEach(err => {
        if (err) err.textContent = '';
      });

      // Name validation
      if (!formName || formName.value.trim() === '') {
        if (formName) formName.classList.add('is-invalid');
        if (nameError) nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      // Email validation
      if (!formEmail || !validateEmail(formEmail.value.trim())) {
        if (formEmail) formEmail.classList.add('is-invalid');
        if (emailError) emailError.textContent = 'Please provide a valid email address.';
        isValid = false;
      }

      // Subject validation
      if (!formSubject || formSubject.value.trim() === '') {
        if (formSubject) formSubject.classList.add('is-invalid');
        if (subjectError) subjectError.textContent = 'Please provide a subject.';
        isValid = false;
      }

      // Message validation
      if (!formMessage || formMessage.value.trim().length < 10) {
        if (formMessage) formMessage.classList.add('is-invalid');
        if (messageError) messageError.textContent = 'Message must be at least 10 characters.';
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
            <span>Processing...</span>
          `;
        }

        setTimeout(() => {
          if (formSuccess) formSuccess.classList.add('is-visible');
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              <span>Send Message</span>
            `;
          }

  // ═════════════════════════════════════════════════════════════════
  // 7. LIVE BACKEND TELEMETRY HUD & DYNAMIC CONSOLE SIMULATOR
  // ═════════════════════════════════════════════════════════════════
  const hudElement = document.getElementById('telemetryHud');
  const hudTerminal = document.getElementById('hudTerminal');
  const hudLatency = document.getElementById('hudLatency');
  let hudIdleTimer = null;

  function pushTelemetryLog(logMessage, isHighlight = false) {
    if (!hudTerminal) return;

    // Flash HUD Active status
    if (hudElement) hudElement.classList.add('is-active');

    // Random simulated latency between 0.8ms - 2.8ms
    const randomLatency = (Math.random() * 2 + 0.8).toFixed(1) + 'ms';
    if (hudLatency) hudLatency.textContent = randomLatency;

    const line = document.createElement('div');
    line.className = 'hud-line' + (isHighlight ? ' hud-highlight' : '');
    line.innerHTML = logMessage;
    hudTerminal.appendChild(line);

    // Limit maximum retained terminal log lines to 4
    while (hudTerminal.children.length > 4) {
      hudTerminal.removeChild(hudTerminal.firstChild);
    }

    clearTimeout(hudIdleTimer);
    hudIdleTimer = setTimeout(() => {
      if (hudElement) hudElement.classList.remove('is-active');
      if (hudLatency) hudLatency.textContent = 'IDLE';
    }, 4000);
  }


  // ═════════════════════════════════════════════════════════════════
  // 8. FRONTEND KINETIC MICRO-INTERACTIONS (CLICK SHOCKWAVE RIPPLE)
  // ═════════════════════════════════════════════════════════════════
  const interactiveSelectors = [
    '.btn',
    '.info-chip',
    '.cert-card',
    '.project-card',
    '.nav-link',
    '.nav-brand',
    '.contact-tile',
    '.tech-chip',
    '.skill-card',
    '.philosophy-card'
  ];

  document.querySelectorAll(interactiveSelectors.join(',')).forEach(el => {
    el.classList.add('has-ripple');

    el.addEventListener('mousedown', (e) => {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';

      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);

      // Trigger contextual telemetry based on clicked element
      const text = el.textContent || '';
      if (text.includes('VaultProxy') || el.closest('#projects')) {
        pushTelemetryLog('<strong>[DB-CONCURRENCY]</strong> Acquired atomic lock :: MongoDB transaction isolated :: Latency 1.2ms', true);
      } else if (text.includes('Certificate') || el.closest('#certificates')) {
        pushTelemetryLog('<strong>[STORAGE-GATEWAY]</strong> Hydrating verified credentials :: CDN response 200 OK', true);
      } else if (text.includes('Skills') || el.closest('#skills')) {
        pushTelemetryLog('<strong>[STACK-RESOLVER]</strong> Loaded full-stack profile module :: Cache HIT', false);
      } else if (text.includes('Education') || el.closest('#education')) {
        pushTelemetryLog('<strong>[ACADEMIC-INDEX]</strong> Queried Qarshi University BSCS verification record', false);
      } else if (text.includes('Send') || el.closest('#contact')) {
        pushTelemetryLog('<strong>[AUTH-GATEWAY]</strong> Sanitizing payload :: Handshake validated :: Rate-limit OK', true);
      } else {
        pushTelemetryLog('<strong>[DISPATCH]</strong> Event loop active &bull; User action routed', false);
      }
    });
  });


  // ═════════════════════════════════════════════════════════════════
  // 9. 3D CARD MOUSE TILT & HOVER ILLUMINATION SPOTLIGHT
  // ═════════════════════════════════════════════════════════════════
  const tiltCards = document.querySelectorAll('.project-card, .skill-card, .philosophy-card');

  tiltCards.forEach(card => {
    // Inject spotlight overlay element
    const spotlight = document.createElement('div');
    spotlight.className = 'card-spotlight';
    card.appendChild(spotlight);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight position coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Compute 3D tilt angles (max +/- 7deg)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

});
