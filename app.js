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

// === ИНТЕРАКТИВНАЯ КАРТА ===
const mapPoints = document.querySelectorAll('.map-point');
const legendToggle = document.querySelector('.legend-toggle');
const legendContent = document.querySelector('.legend-content');

// Обработка наведения на точки карты (для десктопа)
mapPoints.forEach(point => {
  point.addEventListener('mouseenter', function() {
    // Можно добавить дополнительную логику при наведении
    console.log('Наведение на:', this.dataset.name);
  });
  
  point.addEventListener('click', function() {
    // На мобильных устройствах показываем tooltip при клике
    if (window.innerWidth <= 640) {
      // Закрываем другие tooltip
      mapPoints.forEach(p => {
        if (p !== this) {
          p.querySelector('.point-tooltip').style.opacity = '0';
          p.querySelector('.point-tooltip').style.visibility = 'hidden';
        }
      });
      
      const tooltip = this.querySelector('.point-tooltip');
      const isVisible = tooltip.style.opacity === '1';
      
      tooltip.style.opacity = isVisible ? '0' : '1';
      tooltip.style.visibility = isVisible ? 'hidden' : 'visible';
    }
  });
});

// Закрытие tooltip при клике вне карты
document.addEventListener('click', function(e) {
  if (!e.target.closest('.map-point')) {
    mapPoints.forEach(point => {
      point.querySelector('.point-tooltip').style.opacity = '0';
      point.querySelector('.point-tooltip').style.visibility = 'hidden';
    });
  }
});

// Обработка раскрытия легенды на мобильных
if (legendToggle) {
  legendToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    legendContent.classList.toggle('show');
  });
}

// Закрытие легенды при клике вне её
document.addEventListener('click', function(e) {
  if (!e.target.closest('.mobile-legend') && window.innerWidth <= 640) {
    if (legendToggle && legendContent) {
      legendToggle.classList.remove('active');
      legendContent.classList.remove('show');
    }
  }
});

// === MODAL FOR SCHEME IMAGES ===
// === MODAL FOR SCHEME IMAGES ===
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
// Переменная schemeImage уже объявлена выше, используем её повторно
const modalClose = document.querySelector('.image-modal__close');

// Открытие модального окна при клике на изображение
if (schemeImage) {
  schemeImage.addEventListener('click', () => {
    const activeButton = document.querySelector('.scheme__tabs button.active');
    const imageName = activeButton ? activeButton.textContent : 'Схема проекта';
    
    modalImage.src = schemeImage.src;
    modalCaption.textContent = imageName;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
  });
}

// Закрытие модального окна
function closeModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = ''; // Возвращаем прокрутку
  setTimeout(() => {
    modalImage.src = '';
  }, 300);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Закрытие по клику вне изображения
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Закрытие по клавише Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});