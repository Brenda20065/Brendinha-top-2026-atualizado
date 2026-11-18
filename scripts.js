const PAGINAS = ['home', 'sobre', 'servicos', 'cursos', 'contato'];

const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
// links do menu de cima (computador) e da barra de baixo (celular)
const navLinks = document.querySelectorAll('.nav-btn, .bottom-link');

// Mostra a página pedida no endereço (#sobre, #cursos...) e marca o menu
function showPage(pageId) {
    if (!PAGINAS.includes(pageId)) pageId = 'home';

    document.querySelectorAll('.page').forEach(page => {
        page.classList.toggle('active', page.id === pageId);
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + pageId);
    });

    // Sempre começa a nova página do topo
    window.scrollTo(0, 0);
    fecharMenu();
}

// Lê o "#" do endereço. Assim o botão Voltar funciona e dá para
// mandar um link direto, ex.: seusite.com/#cursos
function lerEndereco() {
    showPage(location.hash.replace('#', ''));
}

window.addEventListener('hashchange', lerEndereco);
document.addEventListener('DOMContentLoaded', lerEndereco);

// ----- Menu hambúrguer (celular) -----
function fecharMenu() {
    navbar.classList.remove('menu-aberto');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
}

menuToggle.addEventListener('click', () => {
    const aberto = navbar.classList.toggle('menu-aberto');
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// Clicar no mesmo link da página atual também fecha o menu
navLinks.forEach(link => link.addEventListener('click', fecharMenu));

// ----- Números que se atualizam sozinhos -----
const anoAtual = new Date().getFullYear();

document.querySelectorAll('[data-desde]').forEach(el => {
    const anos = anoAtual - Number(el.dataset.desde);
    el.textContent = anos + '+';
});

document.getElementById('ano').textContent = anoAtual;

// ----- Carrosséis de fotos (aba Serviços e aba Cursos) -----
function iniciarCarrossel(secao) {
    const track = secao.querySelector('.nails-track');
    const itens = track.querySelectorAll('.nail-item');
    const prev = secao.querySelector('.nails-prev');
    const next = secao.querySelector('.nails-next');
    const dots = secao.querySelector('.nails-dots');

    // distância entre o início de uma foto e o da próxima
    const passo = () => itens.length > 1 ? itens[1].offsetLeft - itens[0].offsetLeft : 0;

    // quantas fotos cabem na tela ao mesmo tempo (3, 2 ou 1)
    const porVez = () => Math.max(1, Math.round(track.clientWidth / passo()));

    // uma bolinha para cada posição possível
    function criarBolinhas() {
        if (!passo()) return;   // aba escondida: monta quando ela aparecer
        dots.innerHTML = '';
        const total = itens.length - porVez() + 1;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Ir para a foto ' + (i + 1));
            dot.addEventListener('click', () => track.scrollTo({ left: i * passo() }));
            dots.appendChild(dot);
        }
        atualizar();
    }

    function atualizar() {
        if (!passo()) return;
        const atual = Math.round(track.scrollLeft / passo());
        const max = track.scrollWidth - track.clientWidth;
        dots.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === atual));
        prev.disabled = track.scrollLeft <= 5;
        next.disabled = track.scrollLeft >= max - 5;
    }

    prev.addEventListener('click', () => track.scrollBy({ left: -passo() }));
    next.addEventListener('click', () => track.scrollBy({ left: passo() }));
    track.addEventListener('scroll', atualizar, { passive: true });

    // setas do teclado quando o carrossel está selecionado
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });

    return criarBolinhas;
}

const montarCarrosseis = [...document.querySelectorAll('.nails-section')].map(iniciarCarrossel);
const remontarCarrosseis = () => setTimeout(() => montarCarrosseis.forEach(f => f()), 50);

// as abas começam escondidas: monta as bolinhas quando uma aba aparece,
// ao abrir a página e ao girar o celular ou redimensionar a janela
window.addEventListener('hashchange', remontarCarrosseis);
document.addEventListener('DOMContentLoaded', remontarCarrosseis);
let esperaCarrossel;
window.addEventListener('resize', () => {
    clearTimeout(esperaCarrossel);
    esperaCarrossel = setTimeout(remontarCarrosseis, 150);
});
remontarCarrosseis();