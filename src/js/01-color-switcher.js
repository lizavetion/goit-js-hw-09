const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]');
let timerId;

stopBtn.disabled = true;

const handlerOnStart = () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

const handlerOnStop = () => {
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

startBtn.addEventListener('click', handlerOnStart);
stopBtn.addEventListener('click', handlerOnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}