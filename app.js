const roundsData = [
    {
        'image': 'https://goronok.ru/wp-content/uploads/2017/05/Nova_44_front.jpg',
        'options': ['Скрипка', 'Гитара', 'Фортепиано', 'Барабан'],
        'correct': 'Скрипка'
    },
    {
        'image': 'https://img.muzline.ua/image/catalog/articles/duhovie-instrumenti/truby/interesnie-facty-truba-duhovoy-instrument-1.jpg',
        'options': ['Труба', 'Саксофон', 'Флейта', 'Тромбон'],
        'correct': 'Труба'
    },
    {
        'image': 'https://www.belcanto.ru/media/images/term/19071502.jpg',
        'options': ['Орган', 'Аккордеон', 'Фортепиано', 'Арфа'],
        'correct': 'Фортепиано'
    },
    {
        'image': 'https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-baraban-png-2.png',
        'options': ['Бонги', 'Литавры', 'Тарелки', 'Барабаны'],
        'correct': 'Барабаны'
    },
    {
        'image': 'https://gitaraclub.ru/upload/iblock/145/3xr3rtl2ttosq0onqhozaqnf1qqslq4w.jpg',
        'options': ['Балалайка', 'Гитара', 'Лютня', 'Укулеле'],
        'correct': 'Гитара'
    }
];

let currentRound = 0;
const userAnswers = [];

function updateProgress() {
    document.getElementById('progress').textContent = 
        `Раунд ${currentRound + 1} из ${roundsData.length}`;
}

function showRound(roundIndex) {
    document.querySelectorAll('.round').forEach(round => {
        round.classList.remove('active');
    });
    document.querySelector(`[data-round="${roundIndex}"]`).classList.add('active');
    updateProgress();
}

function handleAnswer(selectedOption) {
    // Сохраняем только выбранный ответ
    userAnswers.push(selectedOption);

    // Переходим к следующему раунду или завершаем игру
    if (currentRound < roundsData.length - 1) {
        currentRound++;
        showRound(currentRound);
    } else {
        // Игра завершена - отправляем результаты
        sendGameResults();
    }
}

function sendGameResults() {
    // Отправляем только массив выбранных ответов
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.sendData(JSON.stringify(userAnswers));
    } else {
        console.log('Выбранные ответы:', userAnswers);
        alert('Игра завершена! Ответы отправлены.');
    }
}

function initializeGame() {
    updateProgress();
    
    // Назначаем обработчики для всех кнопок
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = (e) => {
            handleAnswer(e.target.textContent);
        };
    });
    
    console.log('Игра "Угадай инструмент" инициализирована');
}

// Запускаем игру после загрузки DOM
document.addEventListener('DOMContentLoaded', initializeGame);

Telegram.WebApp.ready();
