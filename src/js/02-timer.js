import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";

const dateInputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');
let selectedDate;
let timerId;

startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate.getTime() > options.defaultDate.getTime()){
      startBtnEl.disabled = false;
    } else {
      startBtnEl.disabled = true;
      window.alert('Please choose a future date')
    }
  }
};

const fp = flatpickr(dateInputEl, options);

const handlerOnStart = () => {
  timerId = setInterval(() => {
    const currentDate = new Date();
    const ms = selectedDate.getTime() - currentDate.getTime();
    if (selectedDate.getTime() <= currentDate.getTime()){
      clearInterval(timerId);
      return;
    }
    const timeLeft = convertMs(ms);
    daysEl.textContent = addLeadingZero(timeLeft.days);
    hoursEl.textContent = addLeadingZero(timeLeft.hours);
    minutesEl.textContent = addLeadingZero(timeLeft.minutes);
    secEl.textContent = addLeadingZero(timeLeft.seconds);
  }, 1000)
}

startBtnEl.addEventListener('click', handlerOnStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0')
}