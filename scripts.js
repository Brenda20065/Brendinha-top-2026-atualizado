// Função para mostrar página e atualizar navegação
function showPage(pageId) {
    // Esconde todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Mostra a página selecionada
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Atualiza botões de navegação
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Encontra e marca o botão correto como ativo
    const activeBtn = Array.from(navButtons).find(btn => 
        btn.getAttribute('onclick') === `showPage('${pageId}')`
    );
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});