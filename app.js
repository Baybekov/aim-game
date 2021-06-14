const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeGo = document.querySelector('#time'),
      board = document.querySelector('#board');


const colors = ['#ff0000', '#ff7300', '#fffb00', '#48ff00', '#00ffd5', '#002bff', '#7a00ff', '#ff00c8', '#ff0000'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (e) => {
    if(e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});


function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeGo.innerHTML = `00:${value}`;
}

function finishGame() {
    timeGo.parentNode.remove();
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span> фрагов!</h1>`

}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = randomColor();
    circle.style.background = color;

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max- min) + min);
}

function randomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
 }