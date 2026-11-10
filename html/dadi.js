// ============================================================
// dadi.js — dado in HTML/CSS: lancio animato e avvio del movimento
// Il risultato puro passa ad avviaMovimento (movimenti.js);
// qui si gestisce solo faccia, testo del pulsante e rilascio.
// ============================================================

import {
    avviaMovimento,
    movimentoInCorso
} from './movimenti.js';

// ================= ELEMENTI E FACCE =================

// Elementi HTML
const pulsanteDado = document.getElementById('lanciaDado');
const facciaDado = document.getElementById('facciaDado');
const testoDado = document.getElementById('testoDado');

// Posizioni dei puntini per ogni faccia
const facce = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
};

// Recupera tutti i puntini del dado
const puntini = facciaDado.querySelectorAll('.punto');

// Mostra una determinata faccia
function mostraFaccia(numero) {

    puntini.forEach(punto => {

        const posizione = Number(punto.dataset.pos);

        punto.hidden = !facce[numero].includes(posizione);

    });

}

// Genera un numero casuale da 1 a 6
function generaRisultato() {

    return Math.floor(Math.random() * 6) + 1;

}

// ================= LANCIO =================

// Lancio del dado
function lanciaDado() {

    if (pulsanteDado.disabled || movimentoInCorso()) {
        return;
    }

    pulsanteDado.disabled = true;
    testoDado.textContent = 'LANCIO...';

    let lanci = 0;

    // Animazione delle facce
    const animazione = setInterval(() => {

        const numeroCasuale = generaRisultato();

        mostraFaccia(numeroCasuale);

        lanci++;

        // Dopo alcuni cambi di faccia,
        // mostra il risultato definitivo
        if (lanci >= 12) {

            clearInterval(animazione);

            const risultato = generaRisultato();

            mostraFaccia(risultato);

            testoDado.textContent = window.traduci(`RISULTATO: ${risultato}`, `RESULT: ${risultato}`);

            // Avvia il movimento della pedina
            const avviato = avviaMovimento(risultato);

            if (!avviato) {

                testoDado.textContent = window.traduci('MOVIMENTO NON AVVIATO', 'MOVEMENT NOT INITIATED');
                pulsanteDado.disabled = false;
                return;

            }

            // Aspetta che la pedina finisca di muoversi
            const controllo = setInterval(() => {

                if (!movimentoInCorso()) {

                    clearInterval(controllo);

                    testoDado.textContent = window.traduci('LANCIA IL DADO', 'ROLL THE DICE');
                    pulsanteDado.disabled = false;

                }

            }, 100);

        }

    }, 90);

}

// ================= INIZIALIZZAZIONE =================

// Collega il pulsante
if (pulsanteDado && facciaDado && testoDado) {

    mostraFaccia(1);

    pulsanteDado.addEventListener('click', lanciaDado);

} else {

    console.error('Elementi del dado non trovati nel documento HTML!');

}
