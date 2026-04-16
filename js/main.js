/* ============================
   EDGAR SALAZAR — PORTFOLIO
   Main JavaScript
   ============================ */

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover states
const hoverTargets = document.querySelectorAll('a, button, .nav-card, .project-card, .featured-card, .thumbnail-item, input, textarea');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicked'));


// ---- Scroll Reveal (Intersection Observer) ----
const revealElements = document.querySelectorAll('.reveal-up');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(el => {
  // Only pause if not already in view
  const rect = el.getBoundingClientRect();
  if (rect.top > window.innerHeight) {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  }
});


// ---- Page Transition ----
const links = document.querySelectorAll('a[href$=".html"]');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    e.preventDefault();

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
      window.location.href = href;
    }, 250);
  });
});


// ---- Nav active state ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
if (navLinks.length > 0) {
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.style.color = '#CC0000';
    }
  });
}

// ---- Nav scroll animation ----
const nav = document.querySelector('nav');
const handleNavScroll = () => {
  if (!nav) return;
  if (window.scrollY > 10) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
};
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ---- Menu reveal on scroll / wheel / touch ----
const menuSection = document.querySelector('.menu-section');
let menuVisible = false;
const heroSection = document.querySelector('.hero-section');
const showMenu = () => {
  if (!menuSection || menuVisible) return;
  menuSection.classList.add('visible');
  heroSection?.classList.add('dimmed');
  menuVisible = true;
};
const hideMenu = () => {
  if (!menuSection || !menuVisible) return;
  menuSection.classList.remove('visible');
  heroSection?.classList.remove('dimmed');
  menuVisible = false;
};
const handleMenuReveal = () => {
  if (!menuSection) return;
  if (window.scrollY > 100) {
    showMenu();
  } else {
    hideMenu();
  }
};

window.addEventListener('scroll', handleMenuReveal, { passive: true });
window.addEventListener('wheel', (event) => {
  if (!menuSection) return;
  if (event.deltaY > 25) {
    showMenu();
  } else if (event.deltaY < -25) {
    hideMenu();
  }
}, { passive: true });

let touchStartY = null;
window.addEventListener('touchstart', (event) => {
  if (event.touches.length === 1) {
    touchStartY = event.touches[0].clientY;
  }
}, { passive: true });
window.addEventListener('touchmove', (event) => {
  if (!menuSection || touchStartY === null) return;
  const touchCurrentY = event.touches[0].clientY;
  const delta = touchStartY - touchCurrentY;
  if (delta > 25) {
    showMenu();
    touchStartY = null;
  } else if (delta < -25) {
    hideMenu();
    touchStartY = null;
  }
}, { passive: true });

handleMenuReveal();


// ---- Lazy image placeholder removal ----
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', () => {
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('img-placeholder')) {
      placeholder.style.opacity = '0';
      placeholder.style.transition = 'opacity 0.3s ease';
    }
  });

  // If image already loaded (cached)
  if (img.complete && img.naturalWidth > 0) {
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('img-placeholder')) {
      placeholder.style.display = 'none';
    }
  }
});
