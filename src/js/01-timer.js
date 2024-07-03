// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";
// Opisany w dokumentacji
import iziToast from "izitoast";
// Kolejny import stylów
import "izitoast/dist/css/iziToast.min.css";


const button = document.querySelector("button[data-start]")
const input = document.getElementById("datetime-picker")
const days = document.querySelector("span[data-days]")
const hours = document.querySelector("span[data-hours]")
const minutes = document.querySelector("span[data-minutes]")
const seconds = document.querySelector("span[data-seconds]")
let userSelectedDate;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates.length > 0) {
        userSelectedDate = selectedDates[0];
        let userSelectedDateTimestamp = userSelectedDate.getTime();
        let dateNow = Date.now();

        if (userSelectedDateTimestamp <= dateNow) {
          iziToast.error({
            message: 'Please choose a date in the future',
            position: 'topRight',
            zindex: '999',
            close: '',
            closeOnClick: 'true'
        });
            button.disabled = true;
        } else {
            button.disabled = false;
        }
        console.log(userSelectedDate);
      }
    },
};
  
  flatpickr(input, options);

  button.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
  }
});

function startCountdown(targetDate) {
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        days.innerHTML = d < 10 ? '0' + d : d;
        hours.innerHTML = h < 10 ? '0' + h : h;
        minutes.innerHTML = m < 10 ? '0' + m : m;
        seconds.innerHTML = s < 10 ? '0' + s : s;

        if(distance <= 1000) {
          clearInterval(interval);
        }

    }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}