const PAGINAS = ['home', 'sobre', 'servicos', 'cursos', 'contato'];

const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-btn');

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

// ----- Carrossel de unhas (aba Sobre) -----
const nailsTrack = document.querySelector('.nails-track');

if (nailsTrack) {
    const nailItems = nailsTrack.querySelectorAll('.nail-item');
    const nailsPrev = document.querySelector('.nails-prev');
    const nailsNext = document.querySelector('.nails-next');
    const nailsDots = document.querySelector('.nails-dots');

    // distância entre o início de uma foto e o da próxima
    const passo = () => nailItems[1].offsetLeft - nailItems[0].offsetLeft;

    // quantas fotos cabem na tela ao mesmo tempo (3, 2 ou 1)
    const porVez = () => Math.max(1, Math.round(nailsTrack.clientWidth / passo()));

    // uma bolinha para cada posição possível
    function criarBolinhas() {
        nailsDots.innerHTML = '';
        const total = nailItems.length - porVez() + 1;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Ir para a foto ' + (i + 1));
            dot.addEventListener('click', () => irPara(i));
            nailsDots.appendChild(dot);
        }
        atualizar();
    }

    function irPara(indice) {
        nailsTrack.scrollTo({ left: indice * passo() });
    }

    function atualizar() {
        const atual = Math.round(nailsTrack.scrollLeft / passo());
        const max = nailsTrack.scrollWidth - nailsTrack.clientWidth;
        nailsDots.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === atual));
        nailsPrev.disabled = nailsTrack.scrollLeft <= 5;
        nailsNext.disabled = nailsTrack.scrollLeft >= max - 5;
    }

    nailsPrev.addEventListener('click', () => nailsTrack.scrollBy({ left: -passo() }));
    nailsNext.addEventListener('click', () => nailsTrack.scrollBy({ left: passo() }));
    nailsTrack.addEventListener('scroll', atualizar, { passive: true });

    // setas do teclado quando o carrossel está selecionado
    nailsTrack.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); nailsNext.click(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); nailsPrev.click(); }
    });

    // refaz as bolinhas ao girar o celular ou redimensionar a janela
    let espera;
    window.addEventListener('resize', () => {
        clearTimeout(espera);
        espera = setTimeout(criarBolinhas, 150);
    });

    // a aba Sobre começa escondida; monta quando ela é aberta
    window.addEventListener('hashchange', () => {
        if (location.hash === '#sobre') setTimeout(criarBolinhas, 50);
    });

    criarBolinhas();
}