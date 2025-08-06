// === Лепестки при клике ===
function createPetalClick(e) {
  const petals = document.querySelector('.petals');
  const x = e.clientX;
  const y = e.clientY;

  for (let i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = x + 'px';
    petal.style.top = y + 'px';
    petal.style.opacity = '1';

    const size = Math.random() * 12 + 8;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    const angle = Math.random() * 360;
    petal.style.transform = `rotate(${angle}deg)`;
    petal.style.animation = `float ${Math.random() * 3 + 4}s ease-out forwards`;

    petals.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 5000);
  }
}

// === Обратный отсчёт до 3 сентября 2025, 11:20 ===
const countdownEl = document.getElementById('countdown');
const weddingDate = new Date('September 3, 2025 11:20:00').getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = weddingDate - now;
  if (gap < 0) {
    countdownEl.innerHTML = "Мы поженились! 💍";
    return;
  }

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((gap % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${d}д ${h}ч ${m}м ${s}с до свадьбы`;
}, 1000);

// === Универсальная карусель для всех слайдеров ===
document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carousel-wrapper');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('.carousel-indicators');
    const leftBtn = carousel.querySelector('.carousel-btn.left');
    const rightBtn = carousel.querySelector('.carousel-btn.right');

    if (images.length === 0) return;

    let currentIndex = 0;

    // Создание индикаторов
    if (dotsContainer) {
      images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    // Обновление активного слайда
    function updateCarousel() {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === currentIndex);
      });

      const dots = dotsContainer?.querySelectorAll('.dot');
      dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    }

    leftBtn?.addEventListener('click', prevSlide);
    rightBtn?.addEventListener('click', nextSlide);

    updateCarousel();
  });

  // === Автовоспроизведение музыки при первом клике ===
  function initMusic() {
    const music = document.getElementById('bgMusic');
    music.play().catch(() => {
      console.log('Автовоспроизведение заблокировано.');
    });
    document.body.removeEventListener('click', initMusic);
  }
  document.body.addEventListener('click', initMusic);

  // === Счётчик посещений через CountAPI ===
  fetch('https://api.countapi.xyz/hit/victoria-farit-wedding/visits')
    .then(res => res.json())
    .then(data => {
      const el = document.getElementById('counter');
      if (el) el.textContent = data.value;
    })
    .catch(err => {
      console.error('Не удалось обновить счётчик:', err);
    });
});
