// === Лепестки при клике — с плавным движением и исчезновением ===
function createPetalClick(e) {
  const petals = document.querySelector('.petals');
  const x = e.clientX;
  const y = e.clientY;

  for (let i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Начальная позиция — где кликнули
    petal.style.left = x + 'px';
    petal.style.top = y + 'px';
    petal.style.opacity = '1';

    // Случайный размер
    const size = Math.random() * 12 + 8;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    // Случайное направление и анимация
    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;
    petal.style.transform = `rotate(${angle}deg)`;
    petal.style.animation = `float ${Math.random() * 3 + 4}s ease-out forwards`;

    petals.appendChild(petal);

    // Удаление после анимации
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

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((gap % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${d}д ${h}ч ${m}м ${s}с до свадьбы`;

  if (gap < 0) {
    clearInterval();
    countdownEl.innerHTML = "Мы поженились! 💍";
  }
}, 1000);

// === Карусель пары: простой фейд ===
let coupleIndex = 0;
const coupleImages = document.querySelectorAll('.couple-carousel .carousel-track img');
const coupleTotal = coupleImages.length;

function updateCoupleCarousel() {
  coupleImages.forEach((img, i) => {
    img.classList.toggle('active', i === coupleIndex);
  });
}

function nextCouple() {
  coupleIndex = (coupleIndex + 1) % coupleTotal;
  updateCoupleCarousel();
}

function prevCouple() {
  coupleIndex = (coupleIndex - 1 + coupleTotal) % coupleTotal;
  updateCoupleCarousel();
}

// === Карусель с плавной анимацией ===
let indices = { venue: 0, banquet: 0 };
const galleries = {
  venue: document.querySelectorAll('#venue img'),
  banquet: document.querySelectorAll('#banquet img')
};
const counts = { venue: galleries.venue.length, banquet: galleries.banquet.length };

function showImage(group, index) {
  galleries[group].forEach(img => {
    img.classList.remove('active');
    img.style.zIndex = '1';
  });
  const current = galleries[group][index];
  current.style.zIndex = '2';
  setTimeout(() => {
    current.classList.add('active');
  }, 10);
}

function nextImage(group) {
  indices[group] = (indices[group] + 1) % counts[group];
  showImage(group, indices[group]);
}

function prevImage(group) {
  indices[group] = (indices[group] - 1 + counts[group]) % counts[group];
  showImage(group, indices[group]);
}

// Автоматическая смена каждые 4 сек
setInterval(() => {
  nextImage('venue');
  nextImage('banquet');
}, 4000);

// Инициализация при загрузке
window.addEventListener('load', () => {
  updateCoupleCarousel();
  showImage('venue', 0);
  showImage('banquet', 0);
});

// Вместо этого — в вашем createPetalClick или отдельным слушателем:
document.body.addEventListener('click', function initMusic() {
  const music = document.getElementById('bgMusic');
  music.play().catch(() => {
    console.log('Автовоспроизведение заблокировано.');
  });
  // Отвяжем этот обработчик, чтобы не дергать play() каждый раз
  document.body.removeEventListener('click', initMusic);
});

// === Счётчик посещений через CountAPI ===
(function(){
  // URL: делаем «хит», и CountAPI вернёт JSON с новым значением
  fetch('https://api.countapi.xyz/hit/victoria-farit-wedding/visits')
    .then(res => res.json())
    .then(data => {
      // data.value — текущее значение счётчика
      const el = document.getElementById('counter');
      if (el) el.textContent = data.value;
    })
    .catch(err => {
      console.error('Не удалось обновить счётчик:', err);
    });
})();
