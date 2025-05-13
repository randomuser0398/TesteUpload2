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

// Listener de evento
document.addEventListener('DOMContentLoaded', () => {
  const girarBtn = document.getElementById('girar-btn');
  if (girarBtn) {
    girarBtn.addEventListener('click', girarSlots);
  }
});
