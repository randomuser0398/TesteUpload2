const slots = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

const simbolos = ['🍒', '⭐️', '💎', '🍋', '🔔'];

const spinSound = new Audio('sounds/spin.mp3');
const winSound = new Audio('sounds/win.mp3');

// Lê o saldo atual
function getSaldo() {
  const saldoText = document.getElementById('saldo').textContent;
  return parseFloat(saldoText.replace('Saldo: R$ ', '').replace(',', '.'));
}

// Atualiza o saldo
function setSaldo(valor) {
  document.getElementById('saldo').textContent = `Saldo: R$ ${valor.toFixed(2)}`;
}

// Função principal do botão GIRAR
function girarSlots() {
  const aposta = parseFloat(document.getElementById('valor-aposta').value) || 10;
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

// Lógica de premiação: só ganha com 3 iguais
function calcularPremio([a, b, c], aposta) {
  return (a === b && b === c) ? aposta * 2 : 0;
}

// Reproduz som
function tocarSom(audio) {
  audio.currentTime = 0;
  audio.play().catch(e => console.warn('Som bloqueado pelo navegador:', e));
}

// Inicializa os eventos após DOM pronto
window.addEventListener('DOMContentLoaded', () => {
  const girarBtn = document.getElementById('girar-btn');
  if (girarBtn) {
    girarBtn.addEventListener('click', girarSlots);
  }
});
// Funções utilitárias
function getSaldo() {
  return parseFloat(localStorage.getItem('saldo')) || 0;
}

function setSaldo(valor) {
  localStorage.setItem('saldo', valor.toFixed(2));
}

// Atualiza o saldo na carteira
function atualizarSaldoCarteira() {
  const saldo = getSaldo();
  document.getElementById('wallet-balance').textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
}

// Mensagem
function mostrarMensagem(msg, isErro = false) {
  const div = document.getElementById('wallet-message');
  div.textContent = msg;
  div.style.color = isErro ? 'red' : 'green';
}

// Eventos após o carregamento
document.addEventListener('DOMContentLoaded', () => {
  atualizarSaldoCarteira();

  document.getElementById('deposit-btn').addEventListener('click', () => {
    const valor = parseFloat(document.getElementById('deposit-amount').value);
    if (valor > 0) {
      const novoSaldo = getSaldo() + valor;
      setSaldo(novoSaldo);
      atualizarSaldoCarteira();
      mostrarMensagem(`Depósito de R$ ${valor.toFixed(2)} realizado.`);
    } else {
      mostrarMensagem('Digite um valor válido para depósito.', true);
    }
  });

  document.getElementById('withdraw-btn').addEventListener('click', () => {
    const valor = parseFloat(document.getElementById('withdraw-amount').value);
    const saldoAtual = getSaldo();
    if (valor > 0 && valor <=
