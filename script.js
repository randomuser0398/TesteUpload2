function girarSlots() {
    let saldoAtual = getSaldo();

    const aposta = parseFloat(document.getElementById('bet-amount').value) || 10;

    if (saldoAtual < aposta) {
        alert('Saldo insuficiente! Recarregue para continuar.');
        return;
    }

    saldoAtual -= aposta;

    // Sorteia os símbolos
    const resultados = [];
    slots.forEach(slot => {
        const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
        slot.textContent = simboloAleatorio;
        resultados.push(simboloAleatorio);
    });

    const premio = calcularPremio(resultados, aposta);
    saldoAtual += premio;

    setSaldo(saldoAtual);

    if (premio > 0) {
        alert(`Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
    } else {
        alert('Tente novamente!');
    }
}

function calcularPremio(resultados, aposta) {
    const [a, b, c] = resultados;

    if (a === b && b === c) {
        return aposta * 5;
    }

    if (a === b || b === c || a === c) {
        return aposta * 2;
    }

    return 0;
}
