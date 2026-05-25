// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      target.style.width = target.getAttribute('data-w') + '%';
      setTimeout(() => target.classList.add('animated'), 1400);
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });
bars.forEach(bar => barObserver.observe(bar));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) link.style.color = 'var(--rose-light)';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== CONTACT FORM FEEDBACK =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST', body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.innerHTML = 'Message Sent ✓';
        btn.style.background = 'linear-gradient(135deg, #2d7a5e, #3aaa80)';
        form.reset();
        setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; }, 3000);
      } else throw new Error();
    } catch {
      btn.innerHTML = 'Error — try email directly';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; }, 3000);
    }
  });
}

// ===== SUBTLE CURSOR GLOW =====
const glow = document.createElement('div');
glow.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(183,110,121,0.05) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left 0.15s,top 0.15s;`;
document.body.appendChild(glow);
window.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});