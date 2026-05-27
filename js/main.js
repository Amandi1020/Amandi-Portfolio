// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  
  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const width = e.target.getAttribute('data-w');
      if (width) {
        e.target.style.width = width + '%';
      }
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.bar-fill').forEach(bar => barObserver.observe(bar));

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (!isNaN(target)) {
        let count = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = count;
          }
        }, 50);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== PARTICLE ANIMATION =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    particlesContainer.appendChild(p);
  }
}

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 120;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' + current) {
      link.style.color = 'var(--rose-light)';
    } else {
      link.style.color = '';
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== CONTACT FORM =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    
    const original = btn.innerHTML;
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (res.ok) {
        btn.innerHTML = 'Message Sent ✓';
        btn.style.background = 'linear-gradient(135deg,#2d7a5e,#3aaa80)';
        form.reset();
        setTimeout(() => { 
          btn.innerHTML = original; 
          btn.style.background = ''; 
          btn.disabled = false; 
        }, 3000);
      } else {
        throw new Error();
      }
    } catch {
      btn.innerHTML = 'Error — email me directly';
      setTimeout(() => { 
        btn.innerHTML = original; 
        btn.style.background = ''; 
        btn.disabled = false; 
      }, 3000);
    }
  });
}

// ===== SUBTLE CURSOR GLOW =====
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(183,110,121,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.12s, top 0.12s;
`;
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ===== PRELOADER / LOADING ANIMATION (Optional) =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ===== FIX TIMELINE RESPONSIVE =====
function fixTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (window.innerWidth <= 768) {
    timelineItems.forEach(item => {
      const dot = item.querySelector('.timeline-dot');
      const card = item.querySelector('.timeline-card');
      if (dot && card) {
        // Ensure proper spacing on mobile
        card.style.marginLeft = '0';
      }
    });
  }
}

window.addEventListener('resize', fixTimeline);
fixTimeline();

// ===== HANDLE CERTIFICATE IMAGE ERROR =====
document.querySelectorAll('.cert-img-wrap img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const placeholder = this.nextElementSibling;
    if (placeholder && placeholder.classList.contains('cert-img-placeholder')) {
      placeholder.style.display = 'flex';
    }
  });
});

// ===== SCROLL TO TOP BUTTON (Optional) =====
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--rose), var(--gold));
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(183,110,121,0.4);
`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.visibility = 'visible';
  } else {
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== DYNAMIC YEAR IN FOOTER =====
const footerYear = document.querySelector('.footer p');
if (footerYear && footerYear.innerHTML.includes('2026')) {
  // Keep as is or update dynamically
  const currentYear = new Date().getFullYear();
  if (currentYear > 2026) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', `2026 - ${currentYear}`);
  }
}

// ===== LOG CONSOLE MESSAGE (Developer Info) =====
console.log('%c✨ Amandi Rajapaksha Portfolio ✨', 'color: #D4919D; font-size: 16px; font-weight: bold;');
console.log('%cPortfolio built with 💖 | MIS Undergraduate @ NSBM', 'color: #C8A97E; font-size: 12px;');