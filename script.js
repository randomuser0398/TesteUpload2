// Script para o site Cassino do Capitão
document.addEventListener('DOMContentLoaded', function() {
    const slots = document.querySelectorAll('.slot');
    const saldoElemento = document.getElementById('saldo');
    const girarBtn = document.getElementById('girar-btn');
    const apostaInput = document.getElementById('valor-aposta');
    const mensagemResultado = document.getElementById('mensagem-resultado');

    let saldo = 100.00;
    const simbolos = ['🍒', '⭐️', '💎'];

    function atualizarSaldo() {
        saldoElemento.textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
    }

    function mostrarMensagem(texto, cor = '#fff') {
        mensagemResultado.textContent = texto;
        mensagemResultado.style.color = cor;
    }

    function girarSlots() {
        const aposta = parseFloat(apostaInput.value);

        if (isNaN(aposta) || aposta < 1 || aposta > 100) {
            mostrarMensagem('Aposta inválida. Insira entre R$1 e R$100.', '#FFD700'); // Amarelo
            return;
        }

        if (aposta > saldo) {
            mostrarMensagem('Saldo insuficiente para essa aposta!', '#FF4136'); // Vermelho
            return;
        }

        saldo -= aposta;
        atualizarSaldo();

        slots.forEach(slot => {
            const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
            slot.textContent = simboloAleatorio;
        });

        // Lógica simples de prêmio
        const resultados = Array.from(slots).map(slot => slot.textContent);
        const todosIguais = resultados.every(symbol => symbol === resultados[0]);

        if (todosIguais) {
            const premio = aposta * 5; // Multiplicador simples
            saldo += premio;
            atualizarSaldo();
            mostrarMensagem(`Jackpot! Você ganhou R$ ${premio.toFixed(2)}!`, '#2ECC40'); // Verde
        } else {
            mostrarMensagem('Tente novamente!', '#7FDBFF'); // Azul claro
        }
    }

    girarBtn.addEventListener('click', girarSlots);
    atualizarSaldo();
});
// Funções para a página da carteira
function setupWalletPage() {
    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const depositInput = document.getElementById('deposit-amount');
    const withdrawInput = document.getElementById('withdraw-amount');

    if (depositBtn && depositInput) {
        depositBtn.addEventListener('click', function() {
            const amount = parseFloat(depositInput.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Digite um valor válido para depositar.');
                return;
            }

            let saldo = parseFloat(localStorage.getItem('userBalance')) || 100;
            saldo += amount;
            localStorage.setItem('userBalance', saldo);
            updateBalance();
            depositInput.value = '';
        });
    }

    if (withdrawBtn && withdrawInput) {
        withdrawBtn.addEventListener('click', function() {
            const amount = parseFloat(withdrawInput.value);
            let saldo = parseFloat(localStorage.getItem('userBalance')) || 100;

            if (isNaN(amount) || amount <= 0) {
                alert('Digite um valor válido para sacar.');
                return;
            }

            if (amount > saldo) {
                alert('Saldo insuficiente para sacar esse valor.');
                return;
            }

            saldo -= amount;
            localStorage.setItem('userBalance', saldo);
            updateBalance();
            withdrawInput.value = '';
        });
    }
                      }
