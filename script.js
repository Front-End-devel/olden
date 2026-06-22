const days = [
    "DOMINGO",
    "SEGUNDA",
    "TERÇA",
    "QUARTA",
    "QUINTA",
    "SEXTA",
    "SÁBADO"
];

// cria estrutura do dígito
function createDigit(id) {

    const el = document.getElementById(id);

    const topStatic = document.createElement("div");
    const bottomStatic = document.createElement("div");

    const flipTop = document.createElement("div");
    const flipBottom = document.createElement("div");

    topStatic.className = "top-static";
    bottomStatic.className = "bottom-static";

    flipTop.className = "flip-top";
    flipBottom.className = "flip-bottom";

    el.appendChild(topStatic);
    el.appendChild(bottomStatic);
    el.appendChild(flipTop);
    el.appendChild(flipBottom);

    return {
        topStatic,
        bottomStatic,
        flipTop,
        flipBottom,
        value: null
    };
}

// inicializa dígitos
const digits = [
    createDigit("h1"),
    createDigit("h2"),
    createDigit("m1"),
    createDigit("m2"),
    createDigit("s1"),
    createDigit("s2")
];

// anima flip de um dígito
function flip(digit, newValue) {

    if (digit.value === newValue) return;

    const oldValue = digit.value ?? newValue;

    // set valores iniciais
    digit.topStatic.textContent = oldValue;
    digit.bottomStatic.textContent = oldValue;

    digit.flipTop.textContent = oldValue;
    digit.flipBottom.textContent = newValue;

    // reset animação
    digit.flipTop.classList.remove("animate");
    digit.flipBottom.classList.remove("animate");

    void digit.flipTop.offsetWidth;

    // ativa animação
    digit.flipTop.classList.add("animate");
    digit.flipBottom.classList.add("animate");

    // depois da animação, atualiza estado fixo
    setTimeout(() => {
        digit.topStatic.textContent = newValue;
        digit.bottomStatic.textContent = newValue;

        digit.flipTop.classList.remove("animate");
        digit.flipBottom.classList.remove("animate");
    }, 350);

    digit.value = newValue;
}

// atualiza relógio
function updateClock() {

    const now = new Date();

    const time = [
        String(now.getHours()).padStart(2, "0"),
        String(now.getMinutes()).padStart(2, "0"),
        String(now.getSeconds()).padStart(2, "0")
    ].join("").split("");

    digits.forEach((d, i) => {
        flip(d, time[i]);
    });

    document.getElementById("weekday").textContent =
        days[now.getDay()];
}

// inicia
updateClock();

// loop
setInterval(updateClock, 1000);
