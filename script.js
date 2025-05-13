const slots = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

const simbolos = ['🍒', '⭐️', '💎', '🍋', '🔔'];

const spinSound = new Audio('sounds/spin.mp3');
const winSound = new Audio('sounds/win.mp3');

// Lê o saldo atual (usado no Cassino)
function getSaldo() {
  return parseFloat(localStorage.getItem('saldo') || '0');
}

// Atualiza o saldo no index.html
function setSaldo(valor) {
  localStorage.setItem('saldo', valor.toString());
  const saldoElem = document.getElementById('saldo');
  if (saldoElem) {
    saldoElem.textContent = `Saldo: R$ ${valor.toFixed(2)}`;
  }
}

// Gira os slots
function girarSlots() {
  const apostaInput = document.getElementById('valor-aposta');
  const aposta = parseFloat(apostaInput?.value) || 10;
  let saldoAtual = getSaldo();

  if (saldoAtual < aposta) {
    alert('Saldo insuficiente! Recarregue para continuar.');
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

// Cálculo do prêmio
function calcularPremio([a, b, c], aposta) {
  return (a === b && b === c) ? aposta * 2 : 0;
}

// Reproduz som
function tocarSom(audio) {
  audio.currentTime = 0;
  audio.play().catch(e => console.warn('Som bloqueado pelo navegador:', e));
}

// Atualiza saldo na carteira.html
function atualizarSaldoCarteira() {
  const saldo = localStorage.getItem('saldo') || '0';
  const walletElem = document.getElementById('wallet-balance');
  if (walletElem) {
    walletElem.textContent = `Saldo: R$ ${parseFloat(saldo).toFixed(2)}`;
  }
}

// Depósito
function depositar() {
  const valor = parseFloat(document.getElementById('deposit-amount').value);
  if (valor > 0) {
    const saldoAtual = parseFloat(localStorage.getItem('saldo') || '0');
    localStorage.setItem('saldo', (saldoAtual + valor).toString());
    atualizarSaldoCarteira();
  }
}

// Saque
function sacar() {
  const valor = parseFloat(document.getElementById('withdraw-amount').value);
  let saldoAtual = parseFloat(localStorage.getItem('saldo') || '0');
  if (valor > 0 && valor <= saldoAtual) {
    saldoAtual -= valor;
    localStorage.setItem('saldo', saldoAtual.toString());
    atualizarSaldoCarteira();
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Cassino
  const girarBtn = document.getElementById('girar-btn');
  if (girarBtn) {
    girarBtn.addEventListener('click', girarSlots);
    setSaldo(getSaldo()); // Atualiza saldo na tela
  }

  // Carteira
  if (document.getElementById('deposit-btn')) {
    document.getElementById('deposit-btn').addEventListener('click', depositar);
    document.getElementById('withdraw-btn').addEventListener('click', sacar);
    atualizarSaldoCarteira();
  }
});
