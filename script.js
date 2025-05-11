// Elementos do HTML
const slots = document.querySelectorAll('.slot');
const saldoElemento = document.getElementById('saldo');
const girarBtn = document.getElementById('girar-btn');

// Configuração inicial
let saldo = 100.00;
const custoPorGiro = 10.00;
const simbolos = ['🍒', '⭐️', '💎'];

// Atualiza o saldo na tela
function atualizarSaldo() {
    saldoElemento.textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
}

// Função para girar os slots
function girarSlots() {
    if (saldo < custoPorGiro) {
        alert('Saldo insuficiente! Recarregue para continuar.');
        return;
    }

    // Debita o valor do giro
    saldo -= custoPorGiro;
    atualizarSaldo();

    // Sorteia novos símbolos para cada slot
    slots.forEach(slot => {
        const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
        slot.textContent = simboloAleatorio;
    });

    // Aqui no futuro colocaremos lógica de prêmio
}

// Evento de clique no botão
girarBtn.addEventListener('click', girarSlots);

// Atualiza o saldo ao carregar a página
atualizarSaldo();
