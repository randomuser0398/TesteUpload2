// Script do Cassino do Capitão — Fase 3.1: Carteira corrigida
document.addEventListener('DOMContentLoaded', function() {

    const slots = document.querySelectorAll('.slot');
    const girarBtn = document.getElementById('girar-btn');

    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const depositInput = document.getElementById('deposit-amount');
    const withdrawInput = document.getElementById('withdraw-amount');
    const walletMessage = document.getElementById('wallet-message');

    const custoPorGiro = 10.00;
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

    // Função de girar os slots
    function girarSlots() {
        let saldoAtual = getSaldo();

        if (saldoAtual < custoPorGiro) {
            alert('Saldo insuficiente! Recarregue para continuar.');
            return;
        }

        saldoAtual -= custoPorGiro;
        setSaldo(saldoAtual);

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

        const novoSaldo = getSaldo() + valor;
        setSaldo(novoSaldo);
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

    // Atualiza saldo ao carregar a página
    atualizarExibicaoSaldo();

});
