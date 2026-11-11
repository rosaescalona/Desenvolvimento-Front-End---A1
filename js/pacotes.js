
const pacotes = {
    encanto: { nome: "Encanto", valor: 390 },
    magia: { nome: "Magia", valor: 490 },
    reino: { nome: "Reino Encantado", valor: 890 },
    imperio: { nome: "Império", valor: 1290 }
};

const VALOR_PERSONAGEM_EXTRA = 250;
const VALOR_HORA_EXTRA = 180;
const TAXA_DESLOCAMENTO = 60;
const LIMITE_DESCONTO = 1500;
const PERCENTUAL_DESCONTO = 0.05;

const formSimulador = document.getElementById("form-simulador");
const campoPacote = document.getElementById("sim-pacote");
const campoPersonagens = document.getElementById("sim-personagens");
const campoHoras = document.getElementById("sim-horas");
const campoForaCuritiba = document.getElementById("sim-fora");
const listaDetalhes = document.getElementById("sim-detalhes");
const campoTotal = document.getElementById("sim-total");
const linkPedido = document.getElementById("sim-pedir");

function formatarReais(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function limitarNumero(campo, minimo, maximo) {
    let numero = parseInt(campo.value, 10);

    if (isNaN(numero) || numero < minimo) {
        numero = minimo;
    } else if (numero > maximo) {
        numero = maximo;
    }

    return numero;
}

function calcularOrcamento() {
    const pacoteEscolhido = pacotes[campoPacote.value];
    const personagensExtras = limitarNumero(campoPersonagens, 0, 5);
    const horasExtras = limitarNumero(campoHoras, 0, 3);
    const itens = [];

    itens.push({ descricao: "Pacote " + pacoteEscolhido.nome, valor: pacoteEscolhido.valor });

    if (personagensExtras > 0) {
        itens.push({ descricao: personagensExtras + " personagem(ns) extra(s)", valor: personagensExtras * VALOR_PERSONAGEM_EXTRA });
    }

    if (horasExtras > 0) {
        itens.push({ descricao: horasExtras + " hora(s) extra(s)", valor: horasExtras * VALOR_HORA_EXTRA });
    }

    if (campoForaCuritiba.checked) {
        itens.push({ descricao: "Deslocamento na região metropolitana", valor: TAXA_DESLOCAMENTO });
    }

    let total = 0;
    listaDetalhes.innerHTML = "";

    for (let i = 0; i < itens.length; i++) {
        total = total + itens[i].valor;

        const linha = document.createElement("li");
        linha.textContent = itens[i].descricao + ": " + formatarReais(itens[i].valor);
        listaDetalhes.appendChild(linha);
    }

    if (total > LIMITE_DESCONTO) {
        const desconto = total * PERCENTUAL_DESCONTO;
        total = total - desconto;

        const linhaDesconto = document.createElement("li");
        linhaDesconto.textContent = "Desconto de 5% para orçamentos acima de " + formatarReais(LIMITE_DESCONTO) + ": -" + formatarReais(desconto);
        listaDetalhes.appendChild(linhaDesconto);
    }

    campoTotal.textContent = formatarReais(total);
    linkPedido.href = "contato.html?pacote=" + encodeURIComponent(pacoteEscolhido.nome);
}

formSimulador.addEventListener("input", calcularOrcamento);

formSimulador.addEventListener("submit", function (evento) {
    evento.preventDefault();
    calcularOrcamento();
});

calcularOrcamento();