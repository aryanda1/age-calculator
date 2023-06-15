const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const button = document.querySelector("button");

const outputs = document.getElementsByClassName("purple");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const msg = document.getElementsByClassName("msg");

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    ageCalc();
  }
});

function ageCalc() {
  reset();
  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;

  const curDate = new Date();
  let curYear = curDate.getFullYear();
  let curMonth = curDate.getMonth() + 1;
  let curDay = curDate.getDate();

  const errs = new Array(3);
  if (day == "" || month == "" || year == "") {
    if (day == "") errs[0] = "This field is required";
    if (month == "") errs[1] = "This field is required";
    if (year == "") errs[2] = "This field is required";
  }

  if (month != "" && (month > 12 || month < 1))
    errs[1] = "Must be a valid month";
  else if (day != "" && (day > getDaysinMonth(month, year) || day < 1))
    errs[0] = "Must be a valid date";

  if (day != "" && (day > 31 || day < 1)) errs[0] = "Must be a valid day";
  if (year != "" && new Date() - new Date(year, month - 1, day) < 0)
    errs[2] = "Must be in the past";

  for (let i = 0; i < 3; i++) {
    if (errs[i] != undefined) {
      msg[i].innerHTML = errs[i];
      msg[i].classList.remove("hidden");
    }
  }
  if (errs[0] != undefined || errs[1] != undefined || errs[2] != undefined) {
    addError();
    return;
  }

  if (curDay < day) {
    curMonth--;
    if (curMonth < 1) {
      curYear--;
      curMonth = 12;
    }
    curDay += getDaysinMonth(curMonth, curYear);
  }
  if (curMonth < month) {
    curYear--;
    curMonth += 12;
  }
  const dayDif = curDay - day;
  const monthDif = curMonth - month;
  const yearDif = curYear - year;
  outputs[2].innerHTML = dayDif;
  outputs[1].innerHTML = monthDif;
  outputs[0].innerHTML = yearDif;
}

function getDaysinMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function reset() {
  for (let i = 0; i < 3; i++) {
    inputs[i].classList.remove("error");
    labels[i].classList.remove("error");
    msg[i].classList.add("hidden");
    outputs[i].innerHTML = "- -";
  }
}

function addError() {
  for (let i = 0; i < 3; i++) {
    inputs[i].classList.add("error");
    labels[i].classList.add("error");
  }
}
