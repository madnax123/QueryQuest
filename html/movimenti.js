
// ============================================================
// movimenti.js — percorso del tabellone e movimento della pedina
// 36 caselle: START + casella01-17 + STOP + casella18-34.
// Lo STOP (indice 18) interrompe sempre la tratta e notifica
// l'arrivo agli ascoltatori (il quiz si pesca lì).
// ============================================================

import * as THREE from 'three';

// ================= STATO =================

// Percorso del tabellone
let percorsoCaselle = [];

// Materiale di ogni casella (violet/magenta/gold/tile/stop_red)
// per la pesca del quiz
let materialiCaselle = [];

// Funzioni notificate quando la pedina si ferma su una casella
const ascoltatoriArrivo = [];

// Posizione attuale della pedina
let posizioneCasella = 0;

// Pedina selezionata nel menu
let pedina = null;

// Stato dell'animazione
let inMovimento = false;
let passiDaPercorrere = [];
let casellaDestinazione = null;
let tempoMovimento = 0;

// Parametri dell'animazione
const DURATA_PASSO = 0.35;
const ALTEZZA_SALTO = 0.45;
const INDICE_STOP = 18;

// Offset verticale della pedina
let offsetY = 0;


// ================= PERCORSO E MATERIALI =================

/**
 * Inizializza il percorso recuperando
 * le caselle dal modello GLB.
 */
export function inizializzaPercorso(modello) {

    const nomiCaselle = [
        'casella_START',

        ...Array.from({ length: 17 }, (_, i) =>
            `casella${String(i + 1).padStart(2, '0')}`
        ),

        'casella_STOP',

        ...Array.from({ length: 17 }, (_, i) =>
            `casella${String(i + 18).padStart(2, '0')}`
        )
    ];

    percorsoCaselle = [];
    materialiCaselle = [];

    modello.updateMatrixWorld(true);

    for (const nome of nomiCaselle) {

        const casella = modello.getObjectByName(nome);

        if (!casella) {
            console.error('Casella non trovata:', nome);
            percorsoCaselle = [];
            materialiCaselle = [];
            return;
        }

        const box = new THREE.Box3().setFromObject(casella);
        const centro = box.getCenter(new THREE.Vector3());

        centro.y = box.max.y;

        percorsoCaselle.push(centro);
        materialiCaselle.push(trovaMaterialeCasella(casella));
    }
}


/**
 * Cerca nel gruppo della casella la prima mesh con materiale
 * noto (violet/magenta/gold/tile/stop_red). Ritorna null se
 * non la trova: senza nome noto la casella finisce nel pool
 * random del quiz, generico per design.
 */
function trovaMaterialeCasella(casella) {

    // stop_red: la casella rossa di congelamento punteggio
    // (corretto = 0 punti, sbagliato = penalita')
    const nomiNFeature = ["tile", "magenta", "gold", "violet", "stop_red"];

    let nomeTrovato = null;

    casella.traverse((oggetto) => {

        if (nomeTrovato || !oggetto.isMesh) {
            return;
        }

        const materiali = oggetto.material &&
            (Array.isArray(oggetto.material) ? oggetto.material : [oggetto.material]);

        materiali.forEach((m) => {
            if (!nomeTrovato && m && nomiNFeature.includes(m.name)) {
                 nomeTrovato = m.name;
            }
        });
    });

    return nomeTrovato;
}

// ================= ARRIVO =================

/**
 * Registra una funzione che viene richiamata quando la pedina
 * si ferma su una casella, con (materiale, indice della casella).
 */
export function suArrivo(funzione) {
    ascoltatoriArrivo.push(funzione);
}

/**
 * Notifica a tutti gli ascoltatori l'arrivo della pedina.
 */
function notificaArrivo() {
    ascoltatoriArrivo.forEach((f) => f(materialiCaselle[posizioneCasella], posizioneCasella));
}


// ================= PEDINA E MOVIMENTO =================

/**
 * Imposta la pedina scelta dal giocatore.
 */
export function impostaPedina(modelloPedina) {

    pedina = modelloPedina;
    posizioneCasella = 0;

    if (percorsoCaselle.length > 0) {
        offsetY = pedina.position.y - percorsoCaselle[0].y;
    }

}


/**
 * Avvia il movimento in base al risultato del dado.
 */
export function avviaMovimento(risultatoDado) {

    if (
        inMovimento ||
        !pedina ||
        percorsoCaselle.length !== 36 ||
        !Number.isInteger(risultatoDado) ||
        risultatoDado < 1 ||
        risultatoDado > 6
    ) {
        return false;
    }

    passiDaPercorrere = [];

    let destinazione = posizioneCasella;

    for (let i = 0; i < risultatoDado; i++) {

        destinazione = (destinazione + 1) % percorsoCaselle.length;

        passiDaPercorrere.push(destinazione);

        // Se raggiunge STOP, interrompe il movimento
        if (destinazione === INDICE_STOP) {
            break;
        }

    }

    inMovimento = true;
    tempoMovimento = 0;

    preparaProssimoPasso();
    return true;
}


// ================= ANIMAZIONE =================

/**
 * Prepara lo spostamento verso la prossima casella.
 */
function preparaProssimoPasso() {

    if (passiDaPercorrere.length === 0) {

        inMovimento = false;
        casellaDestinazione = null;

        notificaArrivo();

        return;
    }

    casellaDestinazione = percorsoCaselle[passiDaPercorrere[0]];
    tempoMovimento = 0;

}


/**
 * Aggiorna l'animazione a ogni frame.
 * Questa funzione va richiamata nel ciclo anima().
 */
export function aggiornaMovimento(delta) {

    if (!inMovimento || !pedina || !casellaDestinazione) {
        return;
    }

    tempoMovimento += delta;

    let t = Math.min(tempoMovimento / DURATA_PASSO, 1);

    // Interpolazione morbida
    const progressione = t * t * (3 - 2 * t);

    const posizioneIniziale = percorsoCaselle[posizioneCasella];

    const x = THREE.MathUtils.lerp(
        posizioneIniziale.x,
        casellaDestinazione.x,
        progressione
    );

    const z = THREE.MathUtils.lerp(
        posizioneIniziale.z,
        casellaDestinazione.z,
        progressione
    );

    const yBase = THREE.MathUtils.lerp(
        posizioneIniziale.y,
        casellaDestinazione.y,
        progressione
    );

    // Piccolo salto durante lo spostamento
    const salto = Math.sin(Math.PI * t) * ALTEZZA_SALTO;

    pedina.position.set(
        x,
        yBase + offsetY + salto,
        z
    );

    // Passaggio alla casella successiva
    if (t >= 1) {

        posizioneCasella = passiDaPercorrere.shift();

        pedina.position.set(
            casellaDestinazione.x,
            casellaDestinazione.y + offsetY,
            casellaDestinazione.z
        );

        preparaProssimoPasso();
    }

}

export function movimentoInCorso() {
    return inMovimento;
}
