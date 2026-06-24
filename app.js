// === SCROLL REVEAL ANIMATION ===
const revealElements = document.querySelectorAll(
  '.section-head, .intro > div, .business > div, .grid_4_4 div, .route-grid article, .object-card, .events div, .Map, .scheme, form, .footer-info, .footer-colum-1, .footer-colum-2'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Останавливаем наблюдение после появления
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));


// === STICKY TOPBAR SHADOW ===
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
});


// === SCHEME TABS WITH FADE EFFECT ===
const schemeImage = document.querySelector("#schemeImage");
document.querySelectorAll("[data-layer]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-layer]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    
    // Плавная смена картинки
    schemeImage.style.opacity = '0';
    schemeImage.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      schemeImage.src = button.dataset.layer;
      schemeImage.style.opacity = '1';
      schemeImage.style.transform = 'scale(1)';
    }, 200);
  });
});


// === CATALOG FILTER WITH ANIMATION ===
const catalogItems = document.querySelectorAll(".catalog-grid article");
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    
    catalogItems.forEach((item) => {
      const shouldBeVisible = filter === "all" || item.dataset.type === filter;
      
      if (shouldBeVisible) {
        item.classList.remove("is-hidden");
        // Форсируем reflow для перезапуска анимации
        void item.offsetWidth; 
        item.classList.add("is-showing");
      } else {
        item.classList.add("is-hidden");
        item.classList.remove("is-showing");
      }
    });
  });
});