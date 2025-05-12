// Script do Cassino do Capitão — Fase 2.2: Aposta dinâmica

document.addEventListener('DOMContentLoaded', function() {

const slots = document.querySelectorAll('.slot');
const girarBtn = document.getElementById('girar-btn');

const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const depositInput = document.getElementById('deposit-amount');
const withdrawInput = document.getElementById('withdraw-amount');
const walletMessage = document.getElementById('wallet-message');

const betInput = document.getElementById('bet-amount');
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
    let saldoAtual = getSaldo();
    const valorAposta = parseFloat(betInput.value);

    if (isNaN(valorAposta) || valorAposta <= 0) {
        alert('Informe um valor de aposta válido!');
        return;
    }

    if (saldoAtual < valorAposta) {
        alert('Saldo insuficiente para essa aposta!');
        return;
    }

    saldoAtual -= valorAposta;

    // Sorteia os símbolos
    const resultados = [];
    slots.forEach(slot => {
        const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
        slot.textContent = simboloAleatorio;
        resultados.push(simboloAleatorio);
    });

    // Verifica se houve prêmio
    const premio = calcularPremio(resultados, valorAposta);
    saldoAtual += premio;

    setSaldo(saldoAtual);

    if (premio > 0) {
        alert(`Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
    } else {
        alert('Tente novamente!');
    }
}

// Função para calcular prêmio
function calcularPremio(resultados, aposta) {
    if (resultados[0] === resultados[1] && resultados[1] === resultados[2]) {
        return aposta * 5;
    }

    if (resultados[0] === resultados[1] || resultados[1] === resultados[2] || resultados[0] === resultados[2]) {
        return aposta *

