/* =============================================
   GLOSS GARAGE DETAILING — Main JavaScript
   =============================================
   File: js/main.js
   ============================================= */

// ── Smooth navbar shadow on scroll ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(10,12,16,0.97)';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.background = 'rgba(10,12,16,0.85)';
    nav.style.boxShadow = 'none';
  }
});

// ── Scroll-reveal animation for sections ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.step-card, .plan-card, .why-card, .gallery-item, .role-card, .perk-item'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Inject reveal CSS dynamically
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

// ── Mobile menu toggle ──
// Creates a hamburger button for mobile since nav-links are hidden on mobile
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');

const hamburger = document.createElement('button');
hamburger.innerHTML = `
  <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="26" height="26">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;
hamburger.style.cssText = `
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;
nav.appendChild(hamburger);

// Mobile menu overlay
const mobileMenu = document.createElement('div');
mobileMenu.style.cssText = `
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10,12,16,0.97);
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;
mobileMenu.innerHTML = `
  <button id="close-menu" style="position:absolute;top:22px;right:6vw;background:none;border:none;cursor:pointer;">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="28" height="28">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>
  <a href="#how"     style="color:white;text-decoration:none;font-size:1.6rem;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;">How It Works</a>
  <a href="#gallery" style="color:white;text-decoration:none;font-size:1.6rem;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;">Gallery</a>
  <a href="#pricing" style="color:white;text-decoration:none;font-size:1.6rem;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;">Pricing</a>
  <a href="#area"    style="color:white;text-decoration:none;font-size:1.6rem;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;">Service Area</a>
  <a href="#careers" style="color:white;text-decoration:none;font-size:1.6rem;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;">Careers</a>
  <a href="#order"   style="color:white;text-decoration:none;font-size:1.6rem;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;background:#0057FF;padding:14px 36px;border-radius:50px;">Book Now</a>
`;
document.body.appendChild(mobileMenu);

// Show hamburger on small screens
const checkMobile = () => {
  hamburger.style.display = window.innerWidth <= 768 ? 'block' : 'none';
};
checkMobile();
window.addEventListener('resize', checkMobile);

hamburger.addEventListener('click', () => {
  mobileMenu.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

document.getElementById('close-menu').addEventListener('click', closeMobileMenu);

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
  mobileMenu.style.display = 'none';
  document.body.style.overflow = '';
}
