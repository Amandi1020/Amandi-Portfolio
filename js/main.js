// ===== SHARED STATE =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');
const navLinks = primaryNav ? Array.from(primaryNav.querySelectorAll('a')) : [];
const sections = Array.from(document.querySelectorAll('main section[id]'));

// ===== SCROLL UI =====
let scrollTicking = false;

function updateScrollUI() {
  const y = window.scrollY;

  if (navbar) navbar.classList.toggle('scrolled', y > 50);
  if (backToTop) backToTop.classList.toggle('show', y > 600);

  if (scrollProgress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
  }

  let current = '';
  sections.forEach(section => {
    if (y >= section.getBoundingClientRect().top + y - 130) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateScrollUI);
    scrollTicking = true;
  }
}, { passive: true });

updateScrollUI();

// ===== MOBILE NAVIGATION =====
function setNavOpen(open) {
  if (!primaryNav || !hamburger) return;
  primaryNav.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    setNavOpen(!primaryNav.classList.contains('open'));
  });

  navLinks.forEach(link => link.addEventListener('click', () => setNavOpen(false)));

  document.addEventListener('click', event => {
    if (primaryNav.classList.contains('open') && !primaryNav.contains(event.target) && !hamburger.contains(event.target)) {
      setNavOpen(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setNavOpen(false);
  });
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach(element => element.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
}

// ===== PROJECT FILTERS =====
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const realProjectCards = projectCards.filter(card => card.dataset.placeholder !== 'true');

['web', 'mobile', 'business-analysis', 'group', 'individual'].forEach(filter => {
  const button = filterButtons.find(item => item.dataset.filter === filter);
  if (!button) return;
  const hasRealProject = realProjectCards.some(card => (card.dataset.category || '').split(/\s+/).includes(filter));
  button.hidden = !hasRealProject;
});

function applyProjectFilter(filter, activeButton) {
  filterButtons.forEach(button => {
    const selected = button === activeButton;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.setAttribute('aria-pressed', String(selected));
  });

  projectCards.forEach(card => {
    const categories = (card.dataset.category || '').split(/\s+/);
    const isPlaceholder = card.dataset.placeholder === 'true';
    const show = filter === 'all' || (!isPlaceholder && categories.includes(filter));
    card.hidden = !show;

    if (show) {
      card.classList.remove('filter-pop');
      void card.offsetWidth;
      if (!prefersReducedMotion) card.classList.add('filter-pop');
    }
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => applyProjectFilter(button.dataset.filter, button));
  button.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const visibleButtons = filterButtons.filter(item => !item.hidden);
    const currentIndex = visibleButtons.indexOf(button);
    if (currentIndex === -1) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? visibleButtons.length - 1
        : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + visibleButtons.length) % visibleButtons.length;
    visibleButtons[nextIndex].focus();
    visibleButtons[nextIndex].click();
  });
});

projectCards.forEach(card => {
  card.addEventListener('animationend', event => {
    if (event.animationName === 'projectPop') card.classList.remove('filter-pop');
  });
});

// ===== PROJECT DETAILS =====
const projectDialog = document.getElementById('projectDialog');
if (projectDialog) {
  const dialogTypes = document.getElementById('projectDialogTypes');
  const dialogTitle = document.getElementById('projectDialogTitle');
  const dialogDesc = document.getElementById('projectDialogDesc');
  const dialogTags = document.getElementById('projectDialogTags');
  const dialogMeta = document.getElementById('projectDialogMeta');
  const dialogLinks = document.getElementById('projectDialogLinks');
  const closeButton = projectDialog.querySelector('.project-dialog-close');

  document.querySelectorAll('.project-details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      if (!card) return;

      const fullDescription = card.querySelector('.project-full-desc');
      const shortDescription = card.querySelector('.project-desc');
      const meta = card.querySelector('.project-meta');

      dialogTypes.replaceChildren(...Array.from(card.querySelectorAll('.project-type'), item => item.cloneNode(true)));
      dialogTitle.textContent = card.querySelector('h3')?.textContent.trim() || '';
      dialogDesc.textContent = (fullDescription || shortDescription)?.textContent.trim() || '';
      dialogTags.replaceChildren(...Array.from(card.querySelectorAll('.project-tags span'), item => item.cloneNode(true)));
      dialogMeta.textContent = meta?.textContent.trim() || '';
      dialogMeta.hidden = !dialogMeta.textContent;
      dialogLinks.replaceChildren(...Array.from(card.querySelectorAll('.project-links > *'), item => item.cloneNode(true)));

      projectDialog.showModal();
      document.body.classList.add('dialog-open');
      closeButton?.focus();
    });
  });

  if (closeButton) closeButton.addEventListener('click', () => projectDialog.close());

  projectDialog.addEventListener('click', event => {
    if (event.target === projectDialog) projectDialog.close();
  });

  projectDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
}

// ===== STAT COUNTERS =====
const statNumbers = document.querySelectorAll('.stat-num');
function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute('data-count'), 10) || 0;
  if (prefersReducedMotion) {
    element.textContent = target;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(tick);
    else element.textContent = target;
  }
  requestAnimationFrame(tick);
}

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  statNumbers.forEach(element => { element.textContent = element.getAttribute('data-count'); });
} else {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(element => counterObserver.observe(element));
}

// ===== CONTACT FORM =====
let toastTimer;
function showToast(message, type = 'success') {
  let toast = document.getElementById('form-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'form-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `form-toast ${type}`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const original = button.innerHTML;
    button.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
    button.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');

      button.innerHTML = 'Message sent <i class="fas fa-check" aria-hidden="true"></i>';
      form.reset();
      showToast('Message sent. I will get back to you soon.', 'success');
      setTimeout(() => {
        button.innerHTML = original;
        button.disabled = false;
      }, 3000);
    } catch {
      button.innerHTML = 'Try again <i class="fas fa-rotate-right" aria-hidden="true"></i>';
      showToast('Something went wrong. Please try again or email me directly.', 'error');
      setTimeout(() => {
        button.innerHTML = original;
        button.disabled = false;
      }, 3000);
    }
  });
}
