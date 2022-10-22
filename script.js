const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");

const countdownTitleEl = document.getElementById("countdown-title");
const countdownButtonEl = document.getElementById("countdown-button");
const timeEl = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeInfoEl = document.getElementById("complete-info");
const completeButtonEl = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";

let countdownValue = Date;
let countdownActive; //count time
let saveCountdown;

let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;

countdownForm.addEventListener("submit", updateCountdown);

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  if (countdownTitle === "") {
    alert("ป้อนข้อมูลไม่ครบ");
  } else {
    saveCountdown = { title: countdownTitle, date: countdownDate };
    localStorage.setItem("countdown", JSON.stringify(saveCountdown));
    countdownValue = new Date(countdownDate).getTime();
    setUpTime();
  }
}

const setUpTime = () => {
  countdownActive = setInterval(() => {
    // set time - current time
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor( ( distance % minute ) / second );

    inputContainer.hidden = true;

    if (distance < 0) {
      //time up
      countdownEl.hidden = true;
      completeEl.hidden = false;
      completeInfoEl.textContent = `${countdownTitle} Date ${countdownDate}`;
      clearInterval(countdownActive);
    } else {
      countdownTitleEl.textContent = `${countdownTitle}`;
      // still count
      timeEl[0].textContent = `${days}`;
      timeEl[1].textContent = `${hours}`;
      timeEl[2].textContent = `${minutes}`;
      timeEl[3].textContent = `${seconds}`;
      countdownEl.hidden = false;
      completeEl.hidden = true;
    }
  }, second);
};

const callDataInStore = () => {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    saveCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = saveCountdown.title;
    countdownDate = saveCountdown.Date;
    countdownValue = new Date(countdownDate).getTime();
    setUpTime();
  }
};

const reset = () => {
  localStorage.removeItem("countdown");
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive); // stop counting time backward
  countdownTitle = "";
  countdownDate = "";
};

callDataInStore();

countdownButtonEl.addEventListener("click", reset);
completeButtonEl.addEventListener("click", reset);
