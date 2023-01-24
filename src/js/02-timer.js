import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
      return;
    } else {
      options.defaultDate = selectedDates[0];
    }

    buttonStart.removeAttribute('disabled');
  },
};

flatpickr('input[id=datetime-picker]', options);

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const buttonStart = document.querySelector('button[data-start]');

buttonStart.setAttribute('disabled', '');
buttonStart.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  intervalId = setInterval(() => {
    const currentDate = new Date();
    let diff = options.defaultDate - currentDate;
    if (diff <= 0) {
      diff = 0;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;

    if (diff <= 0) {
      clearInterval(intervalId);
    }
    buttonStart.setAttribute('disabled', '');
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
