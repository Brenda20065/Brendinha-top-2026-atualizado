const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numbersIndicator = document.querySelector('.numbers'); 
const list = document.querySelector('.list');

let active = 0;
const total = items.length;

function update(direction) {
    const currentActiveItem = document.querySelector('.item.active');
    const currentActiveDot = document.querySelector('.dot.active');

    if (currentActiveItem) currentActiveItem.classList.remove('active');
    if (currentActiveDot) currentActiveDot.classList.remove('active');

    if (direction > 0) {
        active = active + 1;
        if (active === total) {
            active = 0;
        }
    } 
    else if (direction < 0) {
        active = active - 1;
        if (active < 0) {
            active = total - 1;
        }
    }

    if (items[active]) items[active].classList.add('active');
    if (dots[active]) dots[active].classList.add('active');

    if (numbersIndicator) {
        numbersIndicator.textContent = String(active + 1).padStart(2, '0');
    }
}

prevButton.addEventListener('click', () => update(-1));
nextButton.addEventListener('click', () => update(1));

console.log("O arquivo script.js foi carregado com sucesso!");