// Текущий год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// Открытие/закрытие политики
const modal = document.getElementById('policy');
const openers = document.querySelectorAll('[data-open-policy]');
const closers = document.querySelectorAll('[data-close-modal]');
let scrollTopBeforeOpen = 0;

function lockBodyScroll() {
  scrollTopBeforeOpen = window.scrollY || document.documentElement.scrollTop;
  document.body.style.top = `-${scrollTopBeforeOpen}px`;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

function unlockBodyScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo({ top: scrollTopBeforeOpen, behavior: 'instant' });
}

function openModal(){
  if (modal.getAttribute('aria-hidden') === 'false') return;
  modal.setAttribute('aria-hidden','false');
  lockBodyScroll(); // блокируем прокрутку страницы при открытии
}

function closeModal(){
  if (modal.getAttribute('aria-hidden') === 'true') return;
  modal.setAttribute('aria-hidden','true');
  unlockBodyScroll(); // возвращаем прокрутку
}

openers.forEach(btn => btn.addEventListener('click', openModal));
closers.forEach(btn => btn.addEventListener('click', closeModal));
modal.addEventListener('click', (e) => {
  if (e.target.matches('.modal__overlay')) closeModal();
});

window.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') closeModal();
});
