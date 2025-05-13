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

    // Paga apenas se os 3 símbolos forem iguais
    if (a === b && b === c) {
        return aposta * 2;
    }

    return 0;
}
// Som de giro e vitória
const audioGiro = new Audio('sounds/spin.mp3');
const audioVitoria = new Audio('sounds/win.mp3');

// Gira slots com som
function girarSlots() {
    let saldoAtual = getSaldo();
    const aposta = parseFloat(document.getElementById('valor-aposta').value);

    if (saldoAtual < aposta) {
        alert('Saldo insuficiente! Recarregue para continuar.');
        return;
    }

    saldoAtual -= aposta;
    audioGiro.play(); // Som de giro

    const resultados = [];
    slots.forEach(slot => {
        const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
        slot.textContent = simboloAleatorio;
        slot.classList.remove('win-animation');
        resultados.push(simboloAleatorio);
    });

    const premio = calcularPremio(resultados, aposta);
    saldoAtual += premio;
    setSaldo(saldoAtual);

    if (premio > 0) {
        audioVitoria.play(); // Som de vitória
        slots.forEach(slot => slot.classList.add('win-animation'));
        alert(`Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
    } else {
        alert('Tente novamente!');
    }
}
// Sons
const spinSound = new Audio('sounds/spin.mp3');
const winSound = new Audio('sounds/win.mp3');

function tocarSom(audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.warn('Som bloqueado pelo navegador:', e));
}

// Altere o início da função girarSlots() para tocar o som de spin
function girarSlots() {
    let saldoAtual = getSaldo();

    if (saldoAtual < custoPorGiro) {
        alert('Saldo insuficiente! Recarregue para continuar.');
        return;
    }

    // Toca som de spin
    tocarSom(spinSound);

    saldoAtual -= custoPorGiro;

    // Resto da função continua...
}

// E dentro da verificação de prêmio:
if (premio > 0) {
    tocarSom(winSound);
    alert(`Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
            }
