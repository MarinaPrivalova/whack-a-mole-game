const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".container__score");
const startButton = document.querySelector(".container__start-btn");
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(20, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function timer() {
  var timeleft = 10;
  var downloadTimer = setInterval(function () {
    if (timeleft >= 0) {
      startButton.textContent = timeleft;
    } else {
      clearInterval(downloadTimer);
      startButton.textContent = "start";
    }
    timeleft -= 1;
  }, 1000);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  timer();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

startButton.addEventListener("click", startGame);
moles.forEach((mole) => mole.addEventListener("click", bonk));
