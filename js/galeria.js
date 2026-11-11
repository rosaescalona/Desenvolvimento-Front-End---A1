
const itensGaleria = document.querySelectorAll(".galeria-item");
const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.getElementById("lightbox-imagem");
const legendaAmpliada = document.getElementById("lightbox-legenda");
const botaoFechar = document.getElementById("lightbox-fechar");
const botaoAnterior = document.getElementById("lightbox-anterior");
const botaoProxima = document.getElementById("lightbox-proxima");

let indiceAtual = 0;

function abrirFoto(indice) {
    const item = itensGaleria[indice];
    const imagem = item.querySelector("img");
    const legenda = item.querySelector("figcaption");

    indiceAtual = indice;
    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt;
    legendaAmpliada.textContent = legenda.textContent + " (" + (indice + 1) + " de " + itensGaleria.length + ")";

    lightbox.classList.add("aberto");
    document.body.style.overflow = "hidden";
    botaoFechar.focus();
}

function fecharFoto() {
    lightbox.classList.remove("aberto");
    document.body.style.overflow = "";
    itensGaleria[indiceAtual].focus();
}

function navegar(passo) {
    let novoIndice = indiceAtual + passo;

    if (novoIndice < 0) {
        novoIndice = itensGaleria.length - 1;
    } else if (novoIndice >= itensGaleria.length) {
        novoIndice = 0;
    }

    abrirFoto(novoIndice);
}

itensGaleria.forEach(function (item, indice) {
    item.addEventListener("click", function () {
        abrirFoto(indice);
    });

    item.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirFoto(indice);
        }
    });
});

botaoFechar.addEventListener("click", fecharFoto);

botaoAnterior.addEventListener("click", function () {
    navegar(-1);
});

botaoProxima.addEventListener("click", function () {
    navegar(1);
});

lightbox.addEventListener("click", function (evento) {
    if (evento.target === lightbox) {
        fecharFoto();
    }
});

document.addEventListener("keydown", function (evento) {
    if (!lightbox.classList.contains("aberto")) {
        return;
    }

    switch (evento.key) {
        case "Escape":
            fecharFoto();
            break;
        case "ArrowLeft":
            navegar(-1);
            break;
        case "ArrowRight":
            navegar(1);
            break;
    }
});