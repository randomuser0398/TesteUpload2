// Script para o site Cassino do Capitão
document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    const symbols = ['🍒', '⭐️', '💎']; // Símbolos do caça-níquel
    const custoPorGiro = 10.00;         // Valor fixo por giro
    const saldoInicial = 100.00;        // Saldo inicial
    let saldo = recuperarSaldo();       // Recupera ou inicializa saldo

    // Elementos comuns
    const slots = document.querySelectorAll('.slot');
    const saldoElemento = document.getElementById('saldo');
    const girarBtn = document.getElementById('girar-btn');

    // Atualiza o saldo ao carregar
    atualizarSaldo();

    // Evento de clique no botão GIRAR (se existir na página)
    if (girarBtn) {
        girarBtn.addEventListener('click', girarSlots);
    }

    /**
     * Recupera o saldo do localStorage ou define saldo inicial
     * @returns {number} saldo atual
     */
    function recuperarSaldo() {
        const storedBalance = localStorage.getItem('userBalance');
        return storedBalance ? parseFloat(storedBalance) : saldoInicial;
    }

    /**
     * Atualiza o saldo no elemento da página e salva no localStorage
     */
    function atualizarSaldo() {
        if (saldoElemento) {
            saldoElemento.textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
        }
        localStorage.setItem('userBalance', saldo);
    }

    /**
     * Função para girar os slots
     */
    function girarSlots() {
        if (saldo < custoPorGiro) {
            alert('Saldo insuficiente! Recarregue para continuar.');
            return;
        }

        saldo -= custoPorGiro;
        atualizarSaldo();

        // Sorteia novos símbolos para cada slot
        slots.forEach(slot => {
            const simboloAleatorio = symbols[Math.floor(Math.random() * symbols.length)];
            slot.textContent = simboloAleatorio;
        });

        // Em breve: lógica de prêmio!
    }
});
