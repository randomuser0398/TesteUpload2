// Script do Cassino do Capitão — Fase 3: Carteira
document.addEventListener('DOMContentLoaded', function() {
    // Variáveis
    let saldo = recuperarSaldo();
    atualizarSaldo();

    // Elementos do jogo
    const slots = document.querySelectorAll('.slot');
    const girarBtn = document.getElementById('girar-btn');

    // Elementos da carteira
    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const depositInput = document.getElementById('deposit-amount');
    const withdrawInput = document.getElementById('withdraw-amount');
    const walletMessage = document.getElementById('wallet-message');

    // Configurações
    const custoPorGiro = 10.00;
    const simbolos = ['🍒', '⭐️', '💎'];

    // Funções de saldo
    function recuperarSaldo() {
        const storedBalance = localStorage.getItem('userBalance');
        return storedBalance ? parseFloat(storedBalance) : 100.00;
    }

    function salvarSaldo() {
        localStorage.setItem('userBalance', saldo.toFixed(2));
    }

    function atualizarSaldo() {
        const saldoElementos = document.querySelectorAll('#saldo, #wallet-balance');
        saldoElementos.forEach(el => {
            if (el) {
                el.textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
            }
        });
        salvarSaldo();
    }

    // Função de giro
    function girarSlots() {
        if (saldo < custoPorGiro) {
            alert('Saldo insuficiente! Recarregue para continuar.');
            return;
        }

        saldo -= custoPorGiro;
        atualizarSaldo();

        slots.forEach(slot => {
            const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
            slot.textContent = simboloAleatorio;
        });
    }

    // Função de depósito
    function depositar() {
        const valor = parseFloat(depositInput.value);
        if (isNaN(valor) || valor <= 0) {
            exibirMensagem('Informe um valor válido para depósito.', 'red');
            return;
        }

        saldo += valor;
        atualizarSaldo();
        depositInput.value = '';
        exibirMensagem(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`, 'green');
    }

    // Função de saque
    function sacar() {
        const valor = parseFloat(withdrawInput.value);
        if (isNaN(valor) || valor <= 0) {
            exibirMensagem('Informe um valor válido para saque.', 'red');
            return;
        }

        if (valor > saldo) {
            exibirMensagem('Saldo insuficiente para saque.', 'red');
            return;
        }

        saldo -= valor;
        atualizarSaldo();
        withdrawInput.value = '';
        exibirMensagem(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`, 'green');
    }

    // Exibir mensagens
    function exibirMensagem(msg, cor) {
        if (walletMessage) {
            walletMessage.textContent = msg;
            walletMessage.style.color = cor;
        }
    }

    // Eventos
    if (girarBtn) girarBtn.addEventListener('click', girarSlots);
    if (depositBtn) depositBtn.addEventListener('click', depositar);
    if (withdrawBtn) withdrawBtn.addEventListener('click', sacar);

});
