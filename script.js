/**
 * Abdul Rafay — Portfolio & CV Interactive Engine
 * 
 * 1. 10-Second Event Color Overdrive System (Frontend & Backend Synced)
 * 2. Section-Specific Live Background Animation Canvas Engine
 * 3. Mouse Drag Chromatic Flow Interaction
 * 4. Dynamic Parallax Background & Reactive Watermark Morphing
 * 5. Reactive Navbar Drift & Section Scroll Spy
 * 6. Elastic Lightbox Modal Gallery for Verified Certificates
 * 7. Live Backend Telemetry HUD & Runtime Simulator
 * 8. Frontend Kinetic Shockwaves & Radial Ripples
 * 9. 3D Card Mouse Perspective Tilt & Cursor Spotlight
 * 10. Interactive Contact Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {

  // ═════════════════════════════════════════════════════════════════
  // 1. LIVE BACKEND TELEMETRY HUD
  // ═════════════════════════════════════════════════════════════════
  const hudElement = document.getElementById('telemetryHud');
  const hudTerminal = document.getElementById('hudTerminal');
  const hudLatency = document.getElementById('hudLatency');
  const hudCountdown = document.getElementById('hudCountdown');
  let hudIdleTimer = null;

  function pushTelemetryLog(logMessage, isHighlight = false) {
    if (!hudTerminal) return;

    if (hudElement) hudElement.classList.add('is-active');

    // Realistic simulated latency
    const randomLatency = (Math.random() * 1.8 + 0.8).toFixed(1) + 'ms';
    if (hudLatency) hudLatency.textContent = randomLatency;

    const line = document.createElement('div');
    line.className = 'hud-line' + (isHighlight ? ' hud-highlight' : '');
    line.innerHTML = logMessage;
    hudTerminal.appendChild(line);

    while (hudTerminal.children.length > 4) {
      hudTerminal.removeChild(hudTerminal.firstChild);
    }

    clearTimeout(hudIdleTimer);
    hudIdleTimer = setTimeout(() => {
      if (hudElement && !document.body.classList.contains('is-overdrive')) {
        hudElement.classList.remove('is-active');
        if (hudLatency) hudLatency.textContent = 'ONLINE';
      }
    }, 4000);
  }


  // ═════════════════════════════════════════════════════════════════
  // 2. 10-SECOND EVENT COLOR OVERDRIVE SYSTEM (FRONTEND & BACKEND)
  // ═════════════════════════════════════════════════════════════════
  let overdriveTimer = null;
  let countdownInterval = null;
  let remainingSeconds = 10;
  let activeFocusElement = null;

  function triggerOverdrive(category, element = null) {
    // Clear previous timers
    clearTimeout(overdriveTimer);
    clearInterval(countdownInterval);

    // Remove previous focus glow
    if (activeFocusElement) {
      activeFocusElement.classList.remove('section-overdrive-focus');
    }

    // Set new category on body
    document.body.setAttribute('data-overdrive', category);
    document.body.classList.add('is-overdrive');

    // Focus target element or parent section for 10 seconds
    if (element) {
      const targetCard = element.closest('.project-card, .skill-card, .philosophy-card, .cert-card, .edu-card, .hero-section, section') || element;
      targetCard.classList.add('section-overdrive-focus');
      activeFocusElement = targetCard;
    }

    // Watermark burst
    if (watermarkText) {
      watermarkText.classList.remove('is-pulsing');
      void watermarkText.offsetWidth; // force reflow
      watermarkText.classList.add('is-pulsing');
    }

    // Update HUD Countdown badge
    remainingSeconds = 10;
    if (hudCountdown) {
      hudCountdown.textContent = `${remainingSeconds}s OVERDRIVE`;
      hudCountdown.classList.add('is-active');
    }

    pushTelemetryLog(`<strong>[OVERDRIVE: 10s]</strong> ${category.toUpperCase()} ENGAGED :: Hyper-color shaders activated`, true);

    // 1-second interval countdown
    countdownInterval = setInterval(() => {
      remainingSeconds--;
      if (hudCountdown) {
        hudCountdown.textContent = `${remainingSeconds}s OVERDRIVE`;
      }

      if (remainingSeconds <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    // Reset after exactly 10 seconds (10,000ms)
    overdriveTimer = setTimeout(() => {
      document.body.removeAttribute('data-overdrive');
      document.body.classList.remove('is-overdrive');

      if (activeFocusElement) {
        activeFocusElement.classList.remove('section-overdrive-focus');
        activeFocusElement = null;
      }

      if (hudCountdown) {
        hudCountdown.classList.remove('is-active');
      }

      pushTelemetryLog(`<strong>[OVERDRIVE-COMPLETE]</strong> 10s window elapsed :: Returning to standard baseline`, false);
    }, 10000);
  }


  // ═════════════════════════════════════════════════════════════════
  // 3. SECTION-SPECIFIC LIVE BACKGROUND CANVAS ANIMATION
  // ═════════════════════════════════════════════════════════════════
  const canvas = document.getElementById('sectionLiveCanvas');
  let ctx = null;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let particles = [];
  let currentSectionMode = 'about';

  if (canvas) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.floor(Math.min(canvasWidth, 1200) / 22);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 1,
          hue: 45, // default gold
          alpha: Math.random() * 0.4 + 0.15,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01
        });
      }
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    function renderCanvas() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const isOverdrive = document.body.classList.contains('is-overdrive');
      const speedMultiplier = isOverdrive ? 2.4 : 1;

      // Color hues per section
      let baseHue = 45; // Gold
      if (currentSectionMode === 'skills') baseHue = 195; // Cyan
      else if (currentSectionMode === 'projects') baseHue = 345; // Rose/Crimson
      else if (currentSectionMode === 'philosophy') baseHue = 265; // Violet
      else if (currentSectionMode === 'certificates') baseHue = 155; // Emerald
      else if (currentSectionMode === 'education') baseHue = 215; // Blue
      else if (currentSectionMode === 'contact') baseHue = 320; // Magenta

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Animate particles based on section mode
        if (currentSectionMode === 'skills') {
          // Matrix rising stream
          p.y -= (p.radius * 0.8) * speedMultiplier;
          if (p.y < 0) p.y = canvasHeight;
        } else if (currentSectionMode === 'projects') {
          // High-speed horizontal cyber telemetry
          p.x += (p.radius * 1.5) * speedMultiplier;
          if (p.x > canvasWidth) p.x = 0;
        } else {
          // Organic drift
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;
          if (p.x < 0) p.x = canvasWidth;
          if (p.x > canvasWidth) p.x = 0;
          if (p.y < 0) p.y = canvasHeight;
          if (p.y > canvasHeight) p.y = 0;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (isOverdrive ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${baseHue}, 90%, 65%, ${p.alpha * (isOverdrive ? 1.6 : 1)})`;
        ctx.shadowBlur = isOverdrive ? 14 : 6;
        ctx.shadowColor = `hsla(${baseHue}, 90%, 60%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connecting constellation lines in philosophy mode
        if (currentSectionMode === 'philosophy' || currentSectionMode === 'about') {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `hsla(${baseHue}, 90%, 65%, ${(1 - dist / 100) * 0.15 * (isOverdrive ? 2 : 1)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    requestAnimationFrame(renderCanvas);
  }


  // ═════════════════════════════════════════════════════════════════
  // 4. MOUSE DRAG CHROMATIC INTERACTION (LIQUID PRISMATIC FLOW)
  // ═════════════════════════════════════════════════════════════════
  const dragSpotlight = document.getElementById('mouseDragSpotlight');
  let isDragging = false;
  let dragHue = 45;

  document.addEventListener('mousedown', (e) => {
    // Only drag on non-text elements
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    isDragging = true;
    document.body.classList.add('is-mouse-dragging');
    updateDragPosition(e);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateDragPosition(e);
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.classList.remove('is-mouse-dragging');
    }
  });

  function updateDragPosition(e) {
    if (dragSpotlight) {
      dragSpotlight.style.left = `${e.clientX}px`;
      dragSpotlight.style.top = `${e.clientY}px`;
    }

    // Calculate angle from screen center to cursor
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    dragHue = (angle + 360) % 360;

    document.body.style.setProperty('--drag-hue', dragHue.toFixed(1));
    document.body.style.setProperty('--drag-angle', `${angle.toFixed(1)}deg`);
  }


  // ═════════════════════════════════════════════════════════════════
  // 5. DYNAMIC PARALLAX WATERMARK (KINETIC TYPOGRAPHY)
  // ═════════════════════════════════════════════════════════════════
  const watermarkWrapper = document.getElementById('parallaxWatermark');
  const watermarkText = document.getElementById('watermarkText');

  let latestScrollY = window.scrollY || window.pageYOffset;
  let currentTranslateX = 0;
  let targetTranslateX = 0;
  let isTicking = false;

  function updateParallax() {
    latestScrollY = window.scrollY || window.pageYOffset;
    targetTranslateX = -(latestScrollY * 0.35);
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

  requestAnimationFrame(updateParallax);


  // ═════════════════════════════════════════════════════════════════
  // 6. REACTIVE NAVBAR DRIFT & WATERMARK MORPH
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
    }, 200);
  }

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const morphTarget = link.getAttribute('data-morph');
      if (morphTarget) morphWatermark(morphTarget);
    });

    link.addEventListener('mouseleave', () => {
      const activeLink = document.querySelector('.nav-link.is-active');
      const activeMorph = activeLink ? activeLink.getAttribute('data-morph') : defaultWatermark;
      morphWatermark(activeMorph || defaultWatermark);
    });

    link.addEventListener('click', () => {
      const morphTarget = link.getAttribute('data-morph');
      if (morphTarget) {
        defaultWatermark = morphTarget;
        morphWatermark(morphTarget);
      }

      // Map nav link to overdrive category
      const href = link.getAttribute('href') || '';
      let cat = 'about';
      if (href.includes('skills')) cat = 'skills';
      else if (href.includes('projects')) cat = 'projects';
      else if (href.includes('philosophy')) cat = 'philosophy';
      else if (href.includes('certificates')) cat = 'certificates';
      else if (href.includes('education')) cat = 'education';
      else if (href.includes('contact')) cat = 'contact';

      triggerOverdrive(cat, link);

      // Close mobile menu if open
      const navContainer = document.getElementById('navLinks');
      const hamburger = document.getElementById('hamburgerBtn');
      if (navContainer && navContainer.classList.contains('is-open')) {
        navContainer.classList.remove('is-open');
        if (hamburger) hamburger.classList.remove('is-active');
      }
    });
  });


  // ═════════════════════════════════════════════════════════════════
  // 7. ACTIVE SECTION SCROLL SPY & CANVAS LIVE MODE SYNC
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
        currentSectionMode = id;

        mainNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            mainNavLinks.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');

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
  // 8. FRONTEND KINETIC CLICK SHOCKWAVE RIPPLES & OVERDRIVE HOOK
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
    '.philosophy-card',
    '.edu-card'
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

      // Determine category and trigger 10-second overdrive
      const text = el.textContent || '';
      let cat = 'about';

      if (text.includes('VaultProxy') || el.closest('#projects')) {
        cat = 'projects';
        pushTelemetryLog('<strong>[DB-CONCURRENCY]</strong> Acquired atomic lock :: MongoDB transaction isolated :: Latency 1.2ms', true);
      } else if (text.includes('Certificate') || el.closest('#certificates')) {
        cat = 'certificates';
        pushTelemetryLog('<strong>[STORAGE-GATEWAY]</strong> Hydrating verified credentials :: CDN response 200 OK', true);
      } else if (text.includes('Skills') || el.closest('#skills')) {
        cat = 'skills';
        pushTelemetryLog('<strong>[STACK-RESOLVER]</strong> Loaded full-stack profile module :: Cache HIT', false);
      } else if (text.includes('Philosophy') || el.closest('#philosophy')) {
        cat = 'philosophy';
        pushTelemetryLog('<strong>[CORE-LOGIC]</strong> Evaluating architectural principles &amp; concurrency paradigm', false);
      } else if (text.includes('Education') || el.closest('#education')) {
        cat = 'education';
        pushTelemetryLog('<strong>[ACADEMIC-INDEX]</strong> Queried Qarshi University BSCS verification record', false);
      } else if (text.includes('Send') || el.closest('#contact')) {
        cat = 'contact';
        pushTelemetryLog('<strong>[AUTH-GATEWAY]</strong> Sanitizing payload :: Handshake validated :: Rate-limit OK', true);
      } else {
        pushTelemetryLog('<strong>[DISPATCH]</strong> Event loop active &bull; User action routed', false);
      }

      // Trigger the 10-second Overdrive color & animation shift!
      triggerOverdrive(cat, el);
    });
  });


  // ═════════════════════════════════════════════════════════════════
  // 9. 3D CARD MOUSE TILT & HOVER ILLUMINATION SPOTLIGHT
  // ═════════════════════════════════════════════════════════════════
  const tiltCards = document.querySelectorAll('.project-card, .skill-card, .philosophy-card, .cert-card, .edu-card');

  tiltCards.forEach(card => {
    let spotlight = card.querySelector('.card-spotlight');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.className = 'card-spotlight';
      card.appendChild(spotlight);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });


  // ═════════════════════════════════════════════════════════════════
  // 10. CERTIFICATE LIGHTBOX MODAL (WITH ESC DISMISSAL)
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
    document.body.style.overflow = 'hidden';

    triggerOverdrive('certificates');
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full') || './certs/cert1.png';
      const title = card.getAttribute('data-title') || 'Certificate';
      const issuer = card.getAttribute('data-issuer') || 'Accredited Credential';
      openLightbox(fullSrc, title, issuer);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('is-open')) {
      closeLightbox();
    }
  });


  // ═════════════════════════════════════════════════════════════════
  // 11. INTERACTIVE CONTACT FORM & CLIENT-SIDE VALIDATION
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

      [formName, formEmail, formSubject, formMessage].forEach(inp => {
        if (inp) inp.classList.remove('is-invalid');
      });
      [nameError, emailError, subjectError, messageError].forEach(err => {
        if (err) err.textContent = '';
      });

      if (!formName || formName.value.trim() === '') {
        if (formName) formName.classList.add('is-invalid');
        if (nameError) nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      if (!formEmail || !validateEmail(formEmail.value.trim())) {
        if (formEmail) formEmail.classList.add('is-invalid');
        if (emailError) emailError.textContent = 'Please provide a valid email address.';
        isValid = false;
      }

      if (!formSubject || formSubject.value.trim() === '') {
        if (formSubject) formSubject.classList.add('is-invalid');
        if (subjectError) subjectError.textContent = 'Please provide a subject.';
        isValid = false;
      }

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

        triggerOverdrive('contact', contactForm);

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
        }, 1200);
      }
    });
  }


  // ═════════════════════════════════════════════════════════════════
  // 12. MOBILE HAMBURGER MENU TOGGLE
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

  // Welcome log
  setTimeout(() => {
    pushTelemetryLog('<strong>[READY]</strong> Abdul Rafay Executive Single-Page Portfolio loaded', true);
  }, 350);

});
