// Seletores de slots
const slots = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

// Símbolos do caça-níquel
const simbolos = ['🍒', '⭐️', '💎', '🍋', '🔔'];

// Sons
const spinSound = new Audio('sounds/spin.mp3');
const winSound = new Audio('sounds/win.mp3');

// Recupera saldo do armazenamento local
function getSaldo() {
  return parseFloat(localStorage.getItem('saldo')) || 0;
}

// Atualiza saldo e exibe na tela
function setSaldo(valor) {
  localStorage.setItem('saldo', valor.toFixed(2));
  const saldoEl = document.getElementById('saldo') || document.getElementById('wallet-balance');
  if (saldoEl) {
    saldoEl.textContent = `Saldo: R$ ${valor.toFixed(2)}`;
  }
}

// Toca som (com tratamento de bloqueio)
function tocarSom(audio) {
  audio.currentTime = 0;
  audio.play().catch(e => console.warn('Som bloqueado:', e));
}

// Gira os slots
function girarSlots() {
  const aposta = parseFloat(document.getElementById('valor-aposta').value) || 10;
  let saldoAtual = getSaldo();

  if (saldoAtual < aposta) {
    alert('Saldo insuficiente! Vá à carteira para recarregar.');
    return;
  }

  tocarSom(spinSound);
  saldoAtual -= aposta;

  const resultados = [];
  slots.forEach(slot => {
    const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];
    slot.textContent = simbolo;
    slot.classList.remove('win-animation');
    resultados.push(simbolo);
  });

  const premio = calcularPremio(resultados, aposta);
  saldoAtual += premio;
  setSaldo(saldoAtual);

  if (premio > 0) {
    tocarSom(winSound);
    slots.forEach(slot => slot.classList.add('win-animation'));
    alert(`Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
  } else {
    alert('Tente novamente!');
  }
}

// Prêmio apenas para 3 símbolos iguais
function calcularPremio([a, b, c], aposta) {
  return (a === b && b === c) ? aposta * 2 : 0;
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  setSaldo(getSaldo()); // Exibe saldo ao carregar

  const girarBtn = document.getElementById('girar-btn');
  if (girarBtn) girarBtn.addEventListener('click', girarSlots);

  const depositBtn = document.getElementById('deposit-btn');
  const withdrawBtn = document.getElementById('withdraw-btn');

  if (depositBtn) {
    depositBtn.addEventListener('click', () => {
      const valor = parseFloat(document.getElementById('deposit-amount').value);
      if (valor && valor > 0) {
        const novoSaldo = getSaldo() + valor;
        setSaldo(novoSaldo);
        showWalletMessage(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
      } else {
        showWalletMessage('Valor inválido para depósito.', true);
      }
    });
  }

  if (withdrawBtn) {
    withdrawBtn.addEventListener('click', () => {
      const valor = parseFloat(document.getElementById('withdraw-amount').value);
      const saldoAtual = getSaldo();
      if (valor && valor > 0 && valor <= saldoAtual) {
        const novoSaldo = saldoAtual - valor;
        setSaldo(novoSaldo);
        showWalletMessage(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
      } else {
        showWalletMessage('Valor inválido ou saldo insuficiente.', true);
      }
    });
  }
});

// Mostra mensagens na carteira
function showWalletMessage(msg, erro = false) {
  const el = document.getElementById('wallet-message');
  if (el) {
    el.textContent = msg;
    el.style.color = erro ? 'red' : 'green';
  }
}
