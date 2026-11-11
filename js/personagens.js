
const personagens = [
    {
        nome: "Bella",
        categoria: "princesas",
        imagem: "img/personagem-bella.jpg",
        descricao: "Leva a turma para um passeio pelo castelo com histórias, valsa e fotos com cada convidado."
    },
    {
        nome: "Pequena Sereia",
        categoria: "princesas",
        imagem: "img/personagem-pequena-sereia.jpg",
        descricao: "Leva a criançada em uma aventura pelo fundo do mar com músicas, danças e muita energia."
    },
    {
        nome: "Cinderela",
        categoria: "princesas",
        imagem: "img/personagem-cinderela.jpg",
        descricao: "Baile real com valsa, coroação do aniversariante e momento de contação de história."
    },
    {
        nome: "Chase",
        categoria: "herois",
        imagem: "img/personagem-chase.jpg",
        descricao: "Missão de resgate com circuito de desafios, brincadeiras em equipe e entrega de distintivo."
    },
    {
        nome: "Stitch",
        categoria: "desenhos",
        imagem: "img/personagem-stitch.jpg",
        descricao: "Muita bagunça do bem, dancinhas divertidas e abraços apertados para toda a turma."
    },
    {
        nome: "Skye",
        categoria: "herois",
        imagem: "img/personagem-skye.jpg",
        descricao: "Treinamento de pilotos com brincadeiras de voo, jogos de reflexo e homenagem ao aniversariante."
    },
    {
        nome: "Mickey",
        categoria: "desenhos",
        imagem: "img/personagem-mickey.jpg",
        descricao: "Dança animada, brincadeiras de roda e muitos abraços para os pequenos."
    },
    {
        nome: "Minnie",
        categoria: "desenhos",
        imagem: "img/personagem-minnie.jpg",
        descricao: "Festa cheia de laços, música e brincadeiras pensadas para crianças de 1 a 5 anos."
    }
];

const nomesCategorias = {
    princesas: "Princesas",
    herois: "Heróis",
    desenhos: "Desenhos"
};

const grade = document.getElementById("grade-personagens");
const contador = document.getElementById("contador-personagens");
const campoBusca = document.getElementById("busca-personagem");
const botoesFiltro = document.querySelectorAll(".filtro");

let categoriaAtual = "todos";

function criarCard(personagem) {
    const coluna = document.createElement("div");
    coluna.className = "col";

    coluna.innerHTML = `
        <article class="card card-personagem h-100">
            <img src="${personagem.imagem}" class="card-img-top arco" alt="${personagem.nome} caracterizado para festa" width="600" height="750">
            <div class="card-body d-flex flex-column">
                <span class="badge rounded-pill align-self-start selo-${personagem.categoria}">${nomesCategorias[personagem.categoria]}</span>
                <h3 class="card-title">${personagem.nome}</h3>
                <p class="card-text">${personagem.descricao}</p>
                <a href="contato.html?personagem=${encodeURIComponent(personagem.nome)}" class="btn btn-sm btn-real mt-auto align-self-start">Quero na minha festa</a>
            </div>
        </article>
    `;

    return coluna;
}

function mostrarPersonagens() {
    const termo = campoBusca.value.trim().toLowerCase();
    let total = 0;

    grade.innerHTML = "";

    for (const personagem of personagens) {
        const combinaCategoria = categoriaAtual === "todos" || personagem.categoria === categoriaAtual;
        const combinaBusca = personagem.nome.toLowerCase().includes(termo);

        if (combinaCategoria && combinaBusca) {
            grade.appendChild(criarCard(personagem));
            total++;
        }
    }

    if (total === 0) {
        grade.innerHTML = '<div class="col-12"><p class="mensagem-vazia mx-auto">Nenhum personagem com esse nome nesta categoria. Tente outra busca ou escolha "Todos".</p></div>';
        contador.textContent = "Nenhum personagem encontrado";
    } else if (total === 1) {
        contador.textContent = "1 personagem encontrado";
    } else {
        contador.textContent = total + " personagens encontrados";
    }
}

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        botoesFiltro.forEach(function (outroBotao) {
            outroBotao.classList.remove("active");
            outroBotao.setAttribute("aria-pressed", "false");
        });

        botao.classList.add("active");
        botao.setAttribute("aria-pressed", "true");
        categoriaAtual = botao.dataset.categoria;
        mostrarPersonagens();
    });
});

campoBusca.addEventListener("input", mostrarPersonagens);

mostrarPersonagens();