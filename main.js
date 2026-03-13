/* ---- Scroll progress bar ---- */
const bar = document.getElementById('scrollProgress');
if (bar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ---- Intersection Observer para fade-in y counters ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.classList.contains('fade-in')) {
      el.classList.add('visible');
    }
    if (el.classList.contains('reveal-up')) {
      el.classList.add('visible');
    }

    if (el.classList.contains('counter') && !el.dataset.done) {
      el.dataset.done = '1';
      const target = +el.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString('es-CO');
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    io.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in, .reveal-up, .counter').forEach(el => io.observe(el));

/* ---- Formulario → WhatsApp (usado en contacto.html) ---- */
function handleSubmit(e) {
  e.preventDefault();
  const nombre   = document.getElementById('inp-nombre').value;
  const telefono = document.getElementById('inp-tel').value;
  const equipo   = document.getElementById('inp-equipo').value;
  const desc     = document.getElementById('inp-desc').value;
  const msg = encodeURIComponent(
    `Hola! Me llamo *${nombre}* (${telefono}).\nEquipo: *${equipo}*\nNecesito: ${desc}`
  );
  window.open(`https://wa.me/573011959854?text=${msg}`, '_blank');
  if (e.target && e.target.style) e.target.style.display = 'none';
  const success = document.getElementById('form-success');
  if (success) success.style.display = 'block';
  return false;
}
if (typeof window !== 'undefined') window.handleSubmit = handleSubmit;

/* ---- Smooth scroll para anclas en la misma página ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    const nav = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');
    if (nav) nav.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  });
});

/* ---- Hamburguesa ---- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav-links');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
}
