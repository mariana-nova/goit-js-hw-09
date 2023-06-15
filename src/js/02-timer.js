import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputFecha = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if( new Date(selectedDates).getTime() > new Date().getTime() ) {
      Notiflix.Notify.success('Ok!');
    }
    else {
      Notiflix.Notify.failure('fecha superior a la actual!');
    }
    console.log("onClose():", selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);


function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
 
  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
  if(value <= 9) {
    return `0${value}`;
  }
  return `${value}`;
}


setInterval(() => {
  if( new Date(inputFecha.value).getTime() > new Date().getTime() ) {
    btnStart.disabled = false;
  }
  else {
    btnStart.disabled = true;
  }
}, 400);


btnStart.addEventListener("click", () => {

  setInterval(() => {
    let data = convertMs(new Date(inputFecha.value).getTime() - new Date().getTime());
    
    document.querySelector("span[data-days]").textContent = addLeadingZero(data.days);
    document.querySelector("span[data-hours]").textContent = addLeadingZero(data.hours);
    document.querySelector("span[data-minutes]").textContent = addLeadingZero(data.minutes);
    document.querySelector("span[data-seconds]").textContent = addLeadingZero(data.seconds);
  }, 1000);
});