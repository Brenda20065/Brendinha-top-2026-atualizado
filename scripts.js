const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numbersIndicator = document.querySelector('.numbers');

let active = 0;
const total = items.length;
let timer;

// Atualiza o slide ativo
function update(direction) {
    items[active].classList.remove('active');
    dots[active].classList.remove('active');

    if (direction > 0) {
        active = (active + 1) % total;
    } else if (direction < 0) {
        active = (active - 1 + total) % total;
    }

    items[active].classList.add('active');
    dots[active].classList.add('active');
    numbersIndicator.textContent = String(active + 1).padStart(2, '0');
}

// FIX: reseta o timer ao clicar, evitando pulo duplo
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => update(1), 5000);
}

// Inicia o autoplay
resetTimer();

// Botões de seta
prevButton.addEventListener('click', () => {
    update(-1);
    resetTimer();
});

nextButton.addEventListener('click', () => {
    update(1);
    resetTimer();
});

// Clique direto nos dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        items[active].classList.remove('active');
        dots[active].classList.remove('active');
        active = index;
        items[active].classList.add('active');
        dots[active].classList.add('active');
        numbersIndicator.textContent = String(active + 1).padStart(2, '0');
        resetTimer();
    });
});

console.log("scripts.js carregado com sucesso!");