const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onButtonStartClick);
buttonStop.addEventListener('click', onButtonStopClick);

let intervalId = null;
let isActive = false;

function onButtonStartClick() {
  if (isActive) {
    return;
  }

  isActive = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log(document.body.style.backgroundColor);
  }, 1000);
}

function onButtonStopClick() {
  isActive = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
