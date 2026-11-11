
const CHAVE_PEDIDOS = "imperio-pedidos";

const nomesServicos = {
    festa: "Animação de festa",
    danca: "Dança com os personagens",
    leitura: "Hora da leitura",
    brincadeiras: "Brincadeiras"
};

const formulario = document.getElementById("form-orcamento");
const botaoEnviar = document.getElementById("botao-enviar");
const campoServico = document.getElementById("servico");
const campoData = document.getElementById("data-evento");
const campoMensagem = document.getElementById("mensagem");
const contadorCaracteres = document.getElementById("contador-caracteres");
const areaAlerta = document.getElementById("area-alerta");
const listaPedidos = document.getElementById("lista-pedidos");
const totalPedidos = document.getElementById("total-pedidos");
const botaoLimpar = document.getElementById("botao-limpar");

function escaparTexto(texto) {
    const elemento = document.createElement("div");
    elemento.textContent = texto;
    return elemento.innerHTML;
}

function carregarPedidos() {
    const dadosSalvos = localStorage.getItem(CHAVE_PEDIDOS);

    if (dadosSalvos === null) {
        return [];
    }

    try {
        return JSON.parse(dadosSalvos);
    } catch (erro) {
        return [];
    }
}

function salvarPedidos(pedidos) {
    localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(pedidos));
}

function formatarData(dataIso) {
    if (!dataIso) {
        return "A combinar";
    }

    const partes = dataIso.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function mostrarAlerta(mensagem, tipo) {
    areaAlerta.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar aviso"></button>
        </div>
    `;
}

function atualizarContador() {
    const quantidade = campoMensagem.value.length;
    contadorCaracteres.textContent = quantidade + " de " + campoMensagem.maxLength + " caracteres";
}

function renderizarPedidos() {
    const pedidos = carregarPedidos();

    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
        listaPedidos.innerHTML = '<p class="mensagem-vazia">Nenhum pedido salvo ainda. Preencha o formulário para registrar o primeiro.</p>';
        totalPedidos.textContent = "0";
        botaoLimpar.hidden = true;
        return;
    }

    totalPedidos.textContent = pedidos.length;
    botaoLimpar.hidden = false;

    for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];
        const cartao = document.createElement("article");
        cartao.className = "card pedido";

        cartao.innerHTML = `
            <div class="card-body">
                <h3>${escaparTexto(pedido.nome)}</h3>
                <dl>
                    <dt>Serviço:</dt>
                    <dd>${nomesServicos[pedido.servico] || pedido.servico}</dd>
                    <dt>Data do evento:</dt>
                    <dd>${formatarData(pedido.data)}</dd>
                    <dt>Contato:</dt>
                    <dd>${escaparTexto(pedido.email)} | ${escaparTexto(pedido.telefone)}</dd>
                    <dt>Mensagem:</dt>
                    <dd>${escaparTexto(pedido.mensagem)}</dd>
                </dl>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <small class="text-body-secondary">Salvo em ${pedido.criadoEm}</small>
                    <button type="button" class="btn btn-sm btn-outline-danger" data-id="${pedido.id}">Excluir pedido</button>
                </div>
            </div>
        `;

        listaPedidos.appendChild(cartao);
    }
}

botaoEnviar.addEventListener("click", function () {
    formulario.classList.add("validado");
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const pedido = {
        id: Date.now(),
        nome: formulario.nome.value.trim(),
        email: formulario.email.value.trim(),
        telefone: formulario.telefone.value.trim(),
        servico: campoServico.value,
        data: campoData.value,
        mensagem: campoMensagem.value.trim(),
        criadoEm: new Date().toLocaleString("pt-BR")
    };

    const pedidos = carregarPedidos();
    pedidos.unshift(pedido);
    salvarPedidos(pedidos);

    formulario.reset();
    formulario.classList.remove("validado");
    atualizarContador();
    renderizarPedidos();

    mostrarAlerta("<strong>Pedido salvo.</strong> O pedido de " + escaparTexto(pedido.nome) + " continua na lista mesmo se você atualizar ou fechar a página.", "success");
});

listaPedidos.addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-id]");

    if (!botao) {
        return;
    }

    const idExcluir = Number(botao.dataset.id);
    const pedidosRestantes = carregarPedidos().filter(function (pedido) {
        return pedido.id !== idExcluir;
    });

    salvarPedidos(pedidosRestantes);
    renderizarPedidos();
    mostrarAlerta("Pedido excluído da lista.", "warning");
});

botaoLimpar.addEventListener("click", function () {
    const confirmou = confirm("Excluir todos os pedidos salvos neste navegador?");

    if (confirmou) {
        localStorage.removeItem(CHAVE_PEDIDOS);
        renderizarPedidos();
        mostrarAlerta("Todos os pedidos foram excluídos.", "warning");
    }
});

campoMensagem.addEventListener("input", atualizarContador);

const hoje = new Date();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");
campoData.min = hoje.getFullYear() + "-" + mes + "-" + dia;

const parametros = new URLSearchParams(window.location.search);
const personagemEscolhido = parametros.get("personagem");
const pacoteEscolhido = parametros.get("pacote");

if (personagemEscolhido) {
    campoServico.value = "festa";
    campoMensagem.value = "Olá! Quero a presença de " + personagemEscolhido + " na minha festa.";
} else if (pacoteEscolhido) {
    campoServico.value = "festa";
    campoMensagem.value = "Olá! Tenho interesse no pacote " + pacoteEscolhido + ".";
}

atualizarContador();
renderizarPedidos();