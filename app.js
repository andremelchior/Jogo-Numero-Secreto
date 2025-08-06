let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto;
let tentativas = 1;

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTexto("h1", "Acertou!");
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTexto("p", mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto("p", `O número secreto é menor que ${chute}`);
        } else {
            exibirTexto("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function exibirTexto(tag, texto) {
    let text = document.querySelector(tag);
    text.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMensagemInicial(){
    exibirTexto("h1", "Jogo do número secreto");
    exibirTexto("p", "Escolha um número entre 1 e 10");
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

function main() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
}

main();