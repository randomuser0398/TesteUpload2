// Script do Cassino do Capitão — Fase 3.2: Correções de aposta dinâmica

document.addEventListener('DOMContentLoaded', function() {

const slots = document.querySelectorAll('.slot');
const girarBtn = document.getElementById('girar-btn');

const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const depositInput = document.getElementById('deposit-amount');
const withdrawInput = document.getElementById('withdraw-amount');
const walletMessage = document.getElementById('wallet-message');

const apostaInput = document.getElementById('bet-amount');
const simbolos = ['🍒', '⭐️', '💎'];

// Inicializa saldo no localStorage se não existir
if (!localStorage.getItem('userBalance')) {
    localStorage.setItem('userBalance', '100.00');
}

function getSaldo() {
    return parseFloat(localStorage.getItem('userBalance'));
}

function setSaldo(novoSaldo) {
    localStorage.setItem('userBalance', novoSaldo.toFixed(2));
    atualizarExibicaoSaldo();
}

function atualizarExibicaoSaldo() {
    const saldoAtual = getSaldo();
    const saldoElementos = document.querySelectorAll('#saldo, #wallet-balance');
    saldoElementos.forEach(el => {
        if (el) {
            el.textContent = `Saldo: R$ ${saldoAtual.toFixed(2)}`;
        }
    });
}

function girarSlots() {
    const aposta = parseFloat(apostaInput.value);
    let saldoAtual = getSaldo();

    if (isNaN(aposta) || aposta <= 0) {
        alert('Informe um valor válido para a aposta.');
        return;
    }

    if (saldoAtual < aposta) {
        alert('Saldo insuficiente! Recarregue para continuar.');
        return;
    }

    saldoAtual -= aposta;

    const resultados = [];
    slots.forEach(slot => {
        const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
        slot.textContent = simboloAleatorio;
        resultados.push(simboloAleatorio);
    });

    const premio = calcularPremio(resultados, aposta);
    saldoAtual += premio;

    setSaldo(saldoAtual);

    if (premio > 0) {
        alert(`Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
    } else {
        alert('Tente novamente!');
    }
}

function calcularPremio(resultados, aposta) {
    if (resultados[0] === resultados[1] && resultados[1] === resultados[2]) {
        return aposta * 5;
    }

    if (resultados[0] === resultados[1] || resultados[1] === resultados[2] || resultados[0] === resultados[2]) {
        return aposta * 2;
    }

    return 0;
}

function depositar() {
    const valor = parseFloat(depositInput.value);

    if (isNaN(valor) || valor <= 0) {
        exibirMensagem('Informe um valor válido para depósito.', 'red');
        return;
    }

    const novoSaldo = getSaldo() + valor;
    setSaldo(novoSaldo);
    depositInput.value = '';
    exibirMensagem(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`, 'green');
}

function sacar() {
    const valor = parseFloat(withdrawInput.value);

    if (isNaN(valor) || valor <= 0) {
        exibirMensagem('Informe um valor válido para saque.', 'red');
        return;
    }

    let saldoAtual = getSaldo();
    if (valor > saldoAtual) {
        exibirMensagem('Saldo insuficiente para saque.', 'red');
        return;
    }

    saldoAtual -= valor;
    setSaldo(saldoAtual);
    withdrawInput.value = '';
    exibirMensagem(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`, 'green');
}

function exibirMensagem(msg, cor) {
    if (walletMessage) {
        walletMessage.textContent = msg;
        walletMessage.style.color = cor;
    }
}

if (girarBtn) girarBtn.addEventListener('click', girarSlots);
if (depositBtn) depositBtn.addEventListener('click', depositar);
if (withdrawBtn) withdrawBtn.addEventListener('click', sacar);

atualizarExibicaoSaldo();

});

