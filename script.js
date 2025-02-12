// Получаем элементы DOM
const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const timeEl = document.getElementById('time')
const board = document.getElementById('board')
const scoreEl = document.createElement('div')
scoreEl.id = 'score'
board.appendChild(scoreEl)

// Переменные для игры
let time = 0
let score = 0
let gameInterval
const colors = ['#006400', '#00FF00', '#FFD700', '#4B0082', '#0000CD']

// Обработчик для кнопки "Перезапустить"
document.getElementById('restart').addEventListener('click', function(e) {
        e.preventDefault()
        location.reload()
 })

// Обработчик для кнопки "Начать игру"
startBtn.addEventListener('click', function(e) {
    e.preventDefault()
    screens[0].classList.add('up')
})

// Обработчик для выбора времени
timeList.addEventListener('click', function(event) {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.dataset.time) * 1000 // Умножаем на 1000 для преобразования в миллисекунды
        screens[1].classList.add('up')
        screens[2].classList.remove('up')
        score = 0
        scoreEl.textContent = score
        startGame()
    }
})

// Обработчик для кликов по кругам
board.addEventListener('click', function(event) {
    if (event.target.classList.contains('circle')) {
        event.target.remove()
        score++
        scoreEl.textContent = score
        createCircle()
    }
})

// Начало игры
function startGame() {
    let remainingTime = time
    let startTime = Date.now()

    // Устанавливаем интервал для таймера
    gameInterval = setInterval(function() {
        remainingTime = time - (Date.now() - startTime);
        if (remainingTime <= 0) {
            finishGame()
            return
        }
        updateTimer(remainingTime)
    }, 100)

    // Создаем первый круг
    createCircle()
}

// Обновление таймера
function updateTimer(remainingTime) {
    const seconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const displaySeconds = seconds % 60
    timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`
}

// Завершение игры
function finishGame() {
    clearInterval(gameInterval); // Останавливаем интервал
    board.innerHTML = `
        <div class="score">
            Игра завершена!<br>
            Ваш счёт: ${score}
        </div>
    `
    document.getElementById('restart').style.display = 'block' // Показываем кнопку "Перезапустить"
}

// Создание круга
function createCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    circle.style.width = `${getRandomNumber(20, 80)}px`
    circle.style.height = circle.style.width
    circle.style.backgroundColor = getRandomColor()
    circle.style.left = `${getRandomNumber(0, board.offsetWidth - parseInt(circle.style.width))}px`
    circle.style.top = `${getRandomNumber(0, board.offsetHeight - parseInt(circle.style.height))}px`
    board.appendChild(circle)
}

// Генерация случайного числа
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
}

// Генерация случайного цвета
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}