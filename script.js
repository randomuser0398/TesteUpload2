document.addEventListener('DOMContentLoaded', function () {
  const slots = document.querySelectorAll('.slot');
  const girarBtn = document.getElementById('girar-btn');
  const valorApostaInput = document.getElementById('valor-aposta');
  const resultadoMensagem = document.getElementById('mensagem-resultado');
  const saldoDisplay = document.getElementById('saldo');

  const simbolos = ['🍒', '⭐️', '💎'];

  if (!localStorage.getItem('userBalance')) {
    localStorage.setItem('userBalance', '100.00');
  }

  function getSaldo() {
    return parseFloat(localStorage.getItem('userBalance'));
  }

  function setSaldo(novoSaldo) {
    localStorage.setItem('userBalance', novoSaldo.toFixed(2));
    atualizarSaldo();
  }

  function atualizarSaldo() {
    saldoDisplay.textContent = `Saldo: R$ ${getSaldo().toFixed(2)}`;
  }

  function girar() {
    const aposta = parseFloat(valorApostaInput.value);
    let saldoAtual = getSaldo();

    if (isNaN(aposta) || aposta <= 0) {
      resultadoMensagem.textContent = 'Insira um valor válido para apostar.';
      return;
    }

    if (saldoAtual < aposta) {
      resultadoMensagem.textContent = 'Saldo insuficiente!';
      return;
    }

    saldoAtual -= aposta;

    const resultados = [];
    slots.forEach(slot => {
      const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];
      slot.textContent = simbolo;
      resultados.push(simbolo);
    });

    const premio = calcularPremio(resultados, aposta);
    saldoAtual += premio;
    setSaldo(saldoAtual);

    if (premio > 0) {
      resultadoMensagem.textContent = `Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`;
    } else {
      resultadoMensagem.textContent = 'Tente novamente!';
    }
  }

  function calcularPremio(resultados, aposta) {
    const [a, b, c] = resultados;
    if (a === b && b === c) return aposta * 5;
    if (a === b || b === c || a === c) return aposta * 2;
    return 0;
  }

  girarBtn.addEventListener('click', girar);
  atualizarSaldo();
});
