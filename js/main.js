
const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
const linksMenu = document.querySelectorAll(".link-menu, .link-submenu");

for (let i = 0; i < linksMenu.length; i++) {
    const link = linksMenu[i];

    if (link.getAttribute("href") === paginaAtual) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");

        if (link.classList.contains("link-submenu")) {
            const grupo = link.closest(".dropdown, .tem-submenu");
            const linkPai = grupo.querySelector(".link-menu");
            linkPai.classList.add("active");
        }
    }
}

const campoAno = document.getElementById("ano");

if (campoAno) {
    campoAno.textContent = new Date().getFullYear();
}

const botaoMenu = document.getElementById("menu-botao");
const menuPuro = document.getElementById("menu-puro");

if (botaoMenu && menuPuro) {
    botaoMenu.addEventListener("click", function () {
        const estaAberto = menuPuro.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", estaAberto);
        botaoMenu.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");
    });
}