// Квиз «Проверь себя»: 10 вопросов, проверка ответа, результат и повтор.
// Вопросы составлены авторами проекта по материалам официального сайта музея.

const questions = [
  {
    question: 'По какому адресу находится музей?',
    options: ['ул. Труда, 100', 'пр. Ленина, 49', 'ул. Елькина, 50', 'ул. Кирова, 60А'],
    correct: 0,
    explain: 'Новое здание музея стоит в историческом центре Челябинска на ул. Труда, 100, на набережной реки Миасс.'
  },
  {
    question: 'Сколько залов в постоянной экспозиции?',
    options: ['Один', 'Два', 'Три', 'Пять'],
    correct: 2,
    explain: 'Постоянная экспозиция состоит из трёх залов: природы и древней истории, истории и народного быта, истории XX века.'
  },
  {
    question: 'Сколько весит самый крупный фрагмент метеорита «Челябинск» в экспозиции?',
    options: ['Более 60 кг', 'Более 200 кг', 'Более 600 кг', 'Более 1000 кг'],
    correct: 2,
    explain: 'Фрагмент весом более 600 килограммов стоит под стеклянным колпаком в центре первого зала. Его доставили в музей 17 октября 2013 года.'
  },
  {
    question: 'Где в музее находится макет первой Челябинской крепости?',
    options: ['В Зале природы', 'В Зале истории и народного быта', 'В Зале XX века', 'На крыше музея'],
    correct: 1,
    explain: 'Макет крепости и действующая модель доменной печи XVIII века размещены во втором зале — Зале истории и народного быта.'
  },
  {
    question: 'В каком году открылось новое здание музея на набережной Миасса?',
    options: ['1998', '2003', '2006', '2013'],
    correct: 2,
    explain: 'Первый камень заложили в 2003 году, а первых посетителей музей принял 1 июня 2006 года. Здание напоминает крепость с башнями.'
  },
  {
    question: 'Что изображено в Зале XX века?',
    options: ['Подводная лодка', 'Городская улица с купеческими лавками и пролёткой', 'Палеонтологическая реконструкция', 'Сад камней'],
    correct: 1,
    explain: 'Через третий зал тянется улица столетней давности с лавками и настоящим конным экипажем — пролёткой с откидным верхом.'
  },
  {
    question: 'Как называется музей с 2016 года?',
    options: ['Челябинский краеведческий музей', 'Музей Южного Урала', 'Государственный исторический музей Южного Урала', 'Музей Уральского края'],
    correct: 2,
    explain: 'В 2016 году учреждение получило современное название — Государственный исторический музей Южного Урала.'
  },
  {
    question: 'Сколько единиц хранения насчитывает собрание музея?',
    options: ['Более 30 тысяч', 'Более 100 тысяч', 'Более 300 тысяч', 'Более 1 миллиона'],
    correct: 2,
    explain: 'За сто лет сформировалось уникальное собрание более 300 тысяч единиц хранения, включая памятники общероссийского значения.'
  },
  {
    question: 'Какой раздел посвящён археологическим находкам Аркаима и Синташты?',
    options: ['Зал природы и древней истории', 'Зал истории и народного быта', 'Зал XX века', 'Дом общественного собрания'],
    correct: 0,
    explain: 'Археологические находки с раскопок Аркаима и Синташты, а также реконструкция из Бурановской пещеры — в первом зале.'
  },
  {
    question: 'Когда музей открыли для посетителей в его нынешнем здании?',
    options: ['1 июня 2006 года', '17 октября 2013 года', '9 января 1924 года', '28 июня 2025 года'],
    correct: 0,
    explain: '1 июня 2006 года музей принял первых посетителей. Дата 17 октября 2013 года — день появления метеорита в экспозиции, а 28 июня 2025 — открытие пространства «Атом».'
  }
];

const stepEl = document.querySelector('#quiz-step');
const scoreEl = document.querySelector('#quiz-score');
const progressEl = document.querySelector('.quiz-progress');
const progressFill = document.querySelector('#quiz-progress-fill');
const questionBox = document.querySelector('#quiz-question-box');
const questionEl = document.querySelector('#quiz-question');
const optionsEl = document.querySelector('#quiz-options');
const feedbackEl = document.querySelector('#quiz-feedback');
const nextButton = document.querySelector('#quiz-next');
const resultBox = document.querySelector('#quiz-result');
const scoreRing = document.querySelector('#score-ring');
const resultTitle = document.querySelector('#result-title');
const resultText = document.querySelector('#result-text');
const restartButton = document.querySelector('#quiz-restart');

let current = 0;
let score = 0;
let answered = false;

const letters = ['А', 'Б', 'В', 'Г'];

function renderQuestion() {
  answered = false;
  const item = questions[current];
  const number = String(current + 1).padStart(2, '0');

  stepEl.textContent = `Вопрос ${number} / ${String(questions.length).padStart(2, '0')}`;
  scoreEl.textContent = `Верных ответов: ${score}`;
  questionEl.textContent = item.question;
  feedbackEl.textContent = '';
  nextButton.hidden = true;
  nextButton.textContent =
    current === questions.length - 1 ? 'Показать результат' : 'Следующий вопрос →';

  progressEl.setAttribute('aria-valuenow', String(current));
  progressEl.setAttribute('aria-valuetext', `Вопрос ${current + 1} из ${questions.length}`);
  progressFill.style.width = `${(current / questions.length) * 100}%`;

  optionsEl.querySelectorAll('.option').forEach((node) => node.remove());

  item.options.forEach((text, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option';
    button.innerHTML = `<span class="key">${letters[index]}</span><span></span>`;
    button.lastElementChild.textContent = text;
    button.addEventListener('click', () => selectAnswer(index, button));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(index, button) {
  if (answered) return;
  answered = true;

  const item = questions[current];
  const options = optionsEl.querySelectorAll('.option');
  const correct = index === item.correct;

  options.forEach((option) => { option.disabled = true; });

  if (correct) {
    score += 1;
    button.classList.add('is-correct');
    feedbackEl.innerHTML = `<strong>Верно!</strong> ${item.explain}`;
  } else {
    button.classList.add('is-wrong');
    options[item.correct].classList.add('is-correct');
    feedbackEl.innerHTML = `<strong>Не совсем.</strong> ${item.explain}`;
  }

  scoreEl.textContent = `Верных ответов: ${score}`;
  nextButton.hidden = false;
  nextButton.focus();
}

function showResult() {
  questionBox.hidden = true;
  resultBox.hidden = false;

  const percent = Math.round((score / questions.length) * 100);
  scoreRing.style.setProperty('--score', `${percent}%`);
  scoreRing.textContent = `${score}/${questions.length}`;

  let title;
  let text;

  if (score === questions.length) {
    title = 'Безупречно!';
    text = 'Вы знаете экспозицию так, как будто уже прошли маршрут по всем трём залам. Музей ждёт вас на ул. Труда, 100.';
  } else if (score >= 8) {
    title = 'Отличный результат';
    text = 'Почти идеально. Загляните в раздел «Коллекция», чтобы повторить детали, — и можно идти в музей.';
  } else if (score >= 5) {
    title = 'Хорошая база';
    text = 'Основные залы вы уже знаете. Пройдите виртуальный маршрут ещё раз — и результат станет увереннее.';
  } else {
    title = 'Есть куда расти';
    text = 'Начните с маршрута по трём залам: он занимает пару минут и сразу собирает картину истории музея воедино.';
  }

  resultTitle.textContent = `${title} — ${score} из ${questions.length}`;
  resultText.textContent = text;
  progressFill.style.width = '100%';
  progressEl.setAttribute('aria-valuenow', String(questions.length));
  progressEl.setAttribute('aria-valuetext', 'Тест завершён');
  restartButton.focus();
}

function restart() {
  current = 0;
  score = 0;
  questionBox.hidden = false;
  resultBox.hidden = true;
  renderQuestion();
  questionEl.focus?.();
}

nextButton.addEventListener('click', () => {
  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
    questionEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  } else {
    showResult();
  }
});

restartButton.addEventListener('click', restart);

renderQuestion();
