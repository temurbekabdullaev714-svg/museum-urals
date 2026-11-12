// Общие скрипты сайта: меню, активный раздел, появление блоков, год в подвале.

// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Подсветка текущего раздела в навигации
const currentFile = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach((link) => {
  const target = link.getAttribute('href').split('/').pop() || 'index.html';
  if (target === currentFile) link.setAttribute('aria-current', 'page');
});

// Год в подвале
const yearSlot = document.querySelector('#current-year');
if (yearSlot) yearSlot.textContent = new Date().getFullYear();

// Появление блоков при прокрутке
const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
