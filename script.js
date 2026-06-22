const days = [
  "DOMINGO",
  "SEGUNDA",
  "TERÇA",
  "QUARTA",
  "QUINTA",
  "SEXTA",
  "SÁBADO"
];

function createDigit(id) {

  const el = document.getElementById(id);

  const top = document.createElement("div");
  const bottom = document.createElement("div");

  const flipTop = document.createElement("div");
  const flipBottom = document.createElement("div");

  top.className = "top-static";
  bottom.className = "bottom-static";

  flipTop.className = "flip-top";
  flipBottom.className = "flip-bottom";

  el.appendChild(top);
  el.appendChild(bottom);
  el.appendChild(flipTop);
  el.appendChild(flipBottom);

  return {
    top,
    bottom,
    flipTop,
    flipBottom,
    value: null
  };
}

const digits = [
  createDigit("h1"),
  createDigit("h2"),
  createDigit("m1"),
  createDigit("m2"),
  createDigit("s1"),
  createDigit("s2")
];

function animateFlip(digit, oldVal, newVal) {

  if (oldVal === newVal) return;

  digit.top.textContent = oldVal;
  digit.bottom.textContent = oldVal;

  digit.flipTop.textContent = oldVal;
  digit.flipBottom.textContent = newVal;

  digit.flipTop.classList.remove("animate");
  digit.flipBottom.classList.remove("animate");

  void digit.flipTop.offsetWidth;

  digit.flipTop.classList.add("animate");
  digit.flipBottom.classList.add("animate");

  setTimeout(() => {
    digit.top.textContent = newVal;
    digit.bottom.textContent = newVal;

    digit.flipTop.classList.remove("animate");
    digit.flipBottom.classList.remove("animate");
  }, 350);
}

function updateClock() {

  const now = new Date();

  const time = (
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0")
  ).split("");

  digits.forEach((digit, i) => {

    const newVal = time[i];
    const oldVal = digit.value ?? newVal;

    if (oldVal !== newVal) {
      animateFlip(digit, oldVal, newVal);
      digit.value = newVal;
    }
  });

  document.getElementById("weekday").textContent =
    days[now.getDay()];
}

updateClock();
setInterval(updateClock, 1000);updateClock();

// loop
setInterval(updateClock, 1000);
