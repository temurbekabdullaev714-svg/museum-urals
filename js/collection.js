// Фильтр коллекции по залам: переключение без перезагрузки страницы.

const filterButtons = document.querySelectorAll('.filter-button');
const exhibits = document.querySelectorAll('.exhibit');
const filterStatus = document.querySelector('#filter-status');

const hallNames = {
  all: 'все залы',
  hall1: 'Зал природы и древней истории',
  hall2: 'Зал истории и народного быта',
  hall3: 'Зал истории XX века'
};

function applyFilter(filter) {
  let visible = 0;

  exhibits.forEach((exhibit) => {
    const match = filter === 'all' || exhibit.dataset.hall === filter;
    exhibit.classList.toggle('is-hidden', !match);
    if (match) visible += 1;
  });

  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  if (filterStatus) {
    filterStatus.textContent =
      filter === 'all'
        ? `Показаны все ${visible} предметов. Фильтры обновляют подборку без перезагрузки страницы.`
        : `Фильтр: ${hallNames[filter]} — показано предметов: ${visible}.`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => applyFilter(button.dataset.filter));
});
