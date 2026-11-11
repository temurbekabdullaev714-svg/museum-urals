// Маршрут по трём залам: данные остановок и переключение карточки.
// Данные хранятся локально в массиве — база данных не используется.

const stops = [
  {
    badge: 'Зал природы',
    title: 'Зал природы и древней истории',
    description:
      'В центре зала под стеклянным колпаком находится фрагмент метеорита «Челябинск» весом более 600 килограммов. Здесь же — шерстистый носорог и другие гиганты ледникового периода, чучела зверей и птиц Южного Урала, изготовленные профессиональными таксидермистами.',
    focus:
      'Найдите крупный фрагмент метеорита, затем рассмотрите коллекцию минералов и археологические находки с раскопок Аркаима и Синташты, а также реконструкцию погребения из Бурановской пещеры.'
  },
  {
    badge: 'Зал быта',
    title: 'Зал истории и народного быта',
    description:
      'Зал рассказывает о кочевниках, купцах, золотодобытчиках и промышленниках Южного Урала вплоть до конца XIX века. Подлинные костюмы и хозяйственные предметы соседствуют с объёмными композициями в реконструированной среде бытования.',
    focus:
      'Зайдите в крестьянскую избу, найдите макет первой Челябинской крепости и действующую модель доменной печи XVIII века, побывайте в купеческой гостиной и на уральской ярмарке.'
  },
  {
    badge: 'Зал XX века',
    title: 'Зал истории XX века',
    description:
      'Через зал тянется городская улица столетней давности с купеческими лавками и модными салонами, чайными сервизами и настоящим конным экипажем — пролёткой. Экспозиция показывает, как Челябинск изменился после железной дороги, революции и индустриализации.',
    focus:
      'Обратите внимание на участие области в Великой Отечественной войне и строительство Танкограда, а затем — на культурную, промышленную, спортивную и научную жизнь края в эпоху СССР.'
  }
];

const counter = document.querySelector('#stop-counter');
const badge = document.querySelector('#stop-badge');
const title = document.querySelector('#stop-title');
const description = document.querySelector('#stop-description');
const focus = document.querySelector('#stop-focus');
const progress = document.querySelector('.route-progress');
const progressFill = document.querySelector('#progress-fill');
const prevButton = document.querySelector('#prev-stop');
const nextButton = document.querySelector('#next-stop');
const stopButtons = document.querySelectorAll('[data-stop]');

let currentStop = 0;

function showStop(index) {
  currentStop = Math.max(0, Math.min(index, stops.length - 1));
  const stop = stops[currentStop];
  const number = String(currentStop + 1).padStart(2, '0');

  counter.textContent = `Остановка ${number} / ${String(stops.length).padStart(2, '0')}`;
  badge.textContent = stop.badge;
  title.textContent = stop.title;
  description.textContent = stop.description;
  focus.textContent = stop.focus;

  stopButtons.forEach((button) => {
    const selected = Number(button.dataset.stop) === currentStop;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  const percent = ((currentStop + 1) / stops.length) * 100;
  progressFill.style.width = `${percent}%`;
  progress.setAttribute('aria-valuenow', String(currentStop + 1));
  progress.setAttribute('aria-valuetext', `Остановка ${currentStop + 1} из ${stops.length}`);

  prevButton.disabled = currentStop === 0;
  nextButton.disabled = currentStop === stops.length - 1;
}

stopButtons.forEach((button) => {
  button.addEventListener('click', () => showStop(Number(button.dataset.stop)));
});

prevButton.addEventListener('click', () => showStop(currentStop - 1));
nextButton.addEventListener('click', () => showStop(currentStop + 1));

showStop(0);
