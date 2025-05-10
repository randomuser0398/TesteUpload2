// Script para o site Cassino do Capitão
document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let userBalance = 100; // Saldo inicial em R$
    
    // Atualiza o saldo em todas as páginas que o exibem
    updateBalance();
    
    // Handlers específicos para cada página
    setupHomePage();
    setupGamePage();
    setupWalletPage();
});

/**
 * Atualiza o saldo do usuário em todos os elementos que o exibem
 */
function updateBalance() {
    // Recupera o saldo do localStorage (ou usa o valor padrão se não existir)
    const storedBalance = localStorage.getItem('userBalance');
    const userBalance = storedBalance ? parseFloat(storedBalance) : 100;
    
    // Atualiza os elementos de saldo em todas as páginas
    const balanceElements = document.querySelectorAll('#user-balance, #wallet-balance');
    balanceElements.forEach(element => {
        if (element) {
            element.textContent = `R$ ${userBalance.toFixed(2)}`;
        }
    });
}

/**
 * Configura eventos e funcionalidades da página inicial
 */
function setupHomePage() {
    // Código específico para a página Home (se necessário)
}

/**
 * Configura eventos e funcionalidades da página de jogo
 */
function setupGamePage() {
    const spinButton = document.getElementById('spin-button');
    const resultMessage = document.getElementById('result-message');
    const betInput = document.getElementById('bet');
    
    // Símbolos disponíveis no caça-níquel
    const symbols = ['🍒', '🍋', '🍊', '🍇', '7️⃣', '💎', '🎰'];
    
    if (spinButton) {
        spinButton.addEventListener('click', function() {
            // Recupera o saldo atual
            const storedBalance = localStorage.getItem('userBalance');
            let userBalance = storedBalance ? parseFloat(storedBalance) : 100;
            
            // Obtém o valor da aposta
            const betAmount = parseInt(betInput.value);
            
            // Verifica se o usuário tem saldo suficiente
            if (betAmount > userBalance) {
                resultMessage.textContent = 'Saldo insuficiente! Faça um depósito.';
                resultMessage.style.color = 'var(--color-red)';
                return;
            }
            
            // Desconta o valor da aposta
            userBalance -= betAmount;
            
            // Anima os rolos (simplificado para demonstração)
            animateReels().then(results => {
                // Verifica o resultado do jogo
                const winAmount = calculateWin(results, betAmount);
                
                // Atualiza o saldo com possíveis ganhos
                userBalance += winAmount;
                
                // Armazena o novo saldo
                localStorage.setItem('userBalance', userBalance);
                
                // Atualiza a exibição do saldo
                updateBalance();
                
                // Exibe mensagem de resultado
                if (winAmount > 0) {
                    resultMessage.textContent = `Você ganhou R$ ${winAmount.toFixed(2)}!`;
                    resultMessage.style.color = 'var(--color-win)';
                } else {
                    resultMessage.textContent = 'Tente novamente!';
                    resultMessage.style.color = 'var(--color-text)';
                }
            });
        });
    }
    
    /**
     * Anima os rolos do caça-níquel (simulação simples)
     * @returns {Promise} Promise com o resultado dos rolos
     */
    function animateReels() {
        return new Promise(resolve => {
            const reel1 = document.getElementById('reel1');
            const reel2 = document.getElementById('reel2');
            const reel3 = document.getElementById('reel3');
            
            if (!reel1 || !reel2 || !reel3) return;
            
            // Desabilita o botão durante a animação
            if (spinButton) spinButton.disabled = true;
            
            // Simula a animação trocando os símbolos rapidamente
            let counter = 0;
            const maxIterations = 20; // Total de iterações da animação
            const results = [];
            
            const animationInterval = setInterval(() => {
                // Gera símbolos aleatórios para cada rolo
                const symbol1 = symbols[Math.floor(Math.random() * symbols.length)];
                const symbol2 = symbols[Math.floor(Math.random() * symbols.length)];
                const symbol3 = symbols[Math.
