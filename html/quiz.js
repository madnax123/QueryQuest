// ============================================================
// quiz.js — pesca gli esercizi quando la pedina si ferma
// su una casella, in base al MATERIALE della casella:
//   violet → Java, magenta → HTML/CSS, gold → SQL,
//   stop_red → casella rossa (corretto = 0 punti,sbagliato = -10),
//    domande dal pool misto tile → pool misto (categoria "random": tutte)
// ============================================================

import { suArrivo } from './movimenti.js';

const ESERCIZI = window.ESERCIZI || [];

const PUNTI_RISPOSTA = 10;

// la casella rossa rovescia il frontale: niente punti se giusto,
// -PENALITA -10 punti se sbagliato
const PENALITA_STOP = 10;

// Da Materiale della mesh a Materia: il log legge "SQL" e non "gold", "JAVA" e non "violet", ecc.
const ETICHETTE_LOG = {
    violet: 'JAVA',
    magenta: 'HTML/CSS',
    gold: 'SQL',
    random: 'MIX',
    stop_red: 'STOP'
};

// Dispositivo anti-ripetizione: ultimo esercizio uscito per materiale
const ultimoEstratto = {};

// ================= ELEMENTI UI =================

const pannelloQuiz = document.getElementById('pannelloQuiz');
const etichettaCategoria = document.getElementById('quizCategoriaLabel');
const domanda = document.getElementById('quizDomanda');
const bloccoCodice = document.getElementById('quizCodice');
const areaRisposta = document.getElementById('quizAreaRisposta');
const bloccoFeedback = document.getElementById('quizFeedback');
const esito = document.getElementById('quizEsito');
const spiegazione = document.getElementById('quizSpiegazione');
const continua = document.getElementById('quizContinua');

// pannello SPIEGAZIONE in alto a sinistra 
const titoloSpiegazioneHud = document.getElementById('titoloSpiegazione');
const testoSpiegazioneHud = document.getElementById('testoSpiegazione');
const pannelloSpiegazioneHud = document.getElementById('pannelloSpiegazione');

// ================= STATO =================

let esercizioAttivo = null;
let quizAperto = false;
let sulloStop = false;          // fermati sulla casella rossa stop_red

// re-translate al cambio lingua: i testi di gioco sono dinamici,
//  il cambio lingua li riscrive subito
let argomentoCorrente = null;   // titolo del pannello spiegazione
let esitoCorrente = null;       // esito dell'ultima risposta nel quiz
let statoSpiegazione = null;    // dati per ricostruire la spiegazione
let avvisoAttivo = false;       // avviso "campo vuoto" mostrato nel feedback

// Flag consultabile da dadi.js: blocca il dado mentre il quiz è aperto
window.quizAperto = () => quizAperto;

// ================= UTILITY LINGUA =================
// (default IT come la banca dati; la lingua di gioco è in sessionStorage)

function linguaCorrente() {
    return sessionStorage.getItem('lingua') === 'en' ? 'en' : 'it';
}

function testo(oggettoTesto) {
    if (!oggettoTesto) return '';
    return oggettoTesto[linguaCorrente()] || oggettoTesto.it || '';
}

/**
 * Testo dell'esito in funzione della casella: normale (+10 o ERRATO) 
 * oppure sullo stop_red (0 punti se corretto, -10 se sbagliato).
 */
function testoEsito(corretto) {

    if (corretto) {
        return sulloStop
            ? testo({ it: 'CORRETTO (nessun punto)', en: 'CORRECT (no points)' })
            : testo({ it: 'CORRETTO! +' + PUNTI_RISPOSTA + ' punti', en: 'CORRECT! +' + PUNTI_RISPOSTA + ' points' });
    }

    return sulloStop
        ? testo({ it: 'ERRATO, -' + PENALITA_STOP + ' punti', en: 'WRONG, -' + PENALITA_STOP + ' points' })
        : testo({ it: 'ERRATO', en: 'WRONG' });
}

/**
 * Ricostruisce il testo della spiegazione dallo stato salvato:
 * prende la lingua DEL MOMENTO, cosi' un cambio lingua riscrive
 * il pannello senza aspettare la prossima domanda.
 */
function testoSpiegazioneDaStato(stato) {

    let testoFinale = testo(stato.spiegazione);

    // negli inserimenti sbagliati resta anche la risposta attesa
    if (!stato.corretto && stato.tipo === 'inserimento' && stato.accettate.length > 0) {
        testoFinale = testo({
            it: 'Risposta attesa: ' + stato.accettate[0] + '. ',
            en: 'Expected answer: ' + stato.accettate[0] + '. '
        }) + testoFinale;
    }

    return testoFinale;
}

// ================= PESCA =================

function poolPerMateriale(materiale) {

    if (materiale === 'violet' || materiale === 'magenta' || materiale === 'gold') {
        return ESERCIZI.filter((e) => e.categoria === materiale);
    }

    // tile, oppure casella senza materiale riconosciuto: pool misto
    return ESERCIZI.filter((e) => e.categoria === 'random');
}

function estraiEsercizio(materiale) {

    const pool = poolPerMateriale(materiale);

    if (pool.length === 0) {
        return null;
    }

    const chiave = materiale || 'tile';

    // evita di ripescare l'ultimo uscito, quando possibile
    let candidati = pool.filter((e) => e.id !== ultimoEstratto[chiave]);

    if (candidati.length === 0) {
        candidati = pool;
    }

    const scelto = candidati[Math.floor(Math.random() * candidati.length)];

    ultimoEstratto[chiave] = scelto.id;

    return scelto;
}

// ================= PUNTI =================

function aggiornaPunti(cambio) {

    const totale = Number(sessionStorage.getItem('queryquestPunti') || 0) + (cambio || 0);

    sessionStorage.setItem('queryquestPunti', String(totale));

    const display = document.getElementById('valorePunti');

    if (display) {
        display.textContent = String(totale).padStart(3, '0');
    }
}

// ================= QUEST LOG =================

/**
 * Cancella il messaggio "vuoto" una lettera alla volta,
 * come un terminale che riceve backspace, poi esegue al termine.
 */
function cancellaMessaggioVuota(messaggio, alTermine) {

    const testoOriginale = messaggio.textContent;
    let lunghezza = testoOriginale.length;

    const cancellazione = setInterval(() => {

        lunghezza--;
        messaggio.textContent = testoOriginale.slice(0, Math.max(lunghezza, 0));

        if (lunghezza <= 0) {
            clearInterval(cancellazione);
            messaggio.remove();
            alTermine();
        }

    }, 30);
}

function aggiungiVoce(categoria, corretto) {

    const lista = document.getElementById('listaCronologia');
    if (!lista) return;

    const voce = document.createElement('div');
    voce.className = 'voce-cronologia ' + (corretto ? 'corretto' : 'errato');

    const colonnaCategoria = document.createElement('span');
    colonnaCategoria.textContent = ETICHETTE_LOG[categoria] || 'MIX';

    const colonnaEsito = document.createElement('span');
    colonnaEsito.textContent = corretto ? '✓' : '✕';

    voce.appendChild(colonnaCategoria);
    voce.appendChild(colonnaEsito);

    // alla prima voce reale, il messaggio "vuoto" viene
    // cancellato lettera per lettera prima dell'ingresso
    const vuota = lista.querySelector('.cronologia-vuota');

    // le voci nuove in cima; a schermo restano solo le ultime 3
    const inserisciVoce = () => {

        lista.prepend(voce);

        // tutto cio' che e' piu' vecchio della terza voce sparisce.
        const voci = lista.querySelectorAll('.voce-cronologia');

        voci.forEach((voceVecchia, indice) => {
            if (indice >= 3) {
                voceVecchia.remove();
            }
        });
    };

    if (vuota) {
        cancellaMessaggioVuota(vuota, inserisciVoce);
    } else {
        inserisciVoce();
    }
}

// ================= RENDERING =================

function costruireOpzioni() {

    esercizioAttivo.opzioni.forEach((opzione, indice) => {

        const bottone = document.createElement('button');
        bottone.type = 'button';
        bottone.className = 'quiz-opzione';

        const rigaTesto = document.createElement('span');
        rigaTesto.textContent = testo(opzione.testo);
        bottone.appendChild(rigaTesto);

        if (opzione.codice) {
            const rigaCodice = document.createElement('pre');
            rigaCodice.className = 'quiz-codice-opzione';
            rigaCodice.textContent = opzione.codice;
            bottone.appendChild(rigaCodice);
        }

        bottone.addEventListener('click', () => rispondiScelta(indice));

        areaRisposta.appendChild(bottone);
    });
}

function costruireInserimento() {

    const campo = document.createElement('input');
    campo.type = 'text';
    campo.id = 'quizRispostaUtente';
    campo.autocomplete = 'off';
    campo.placeholder = testo({ it: 'Scrivi la risposta...', en: 'Type your answer...' });

    const invia = document.createElement('button');
    invia.type = 'button';
    invia.id = 'quizInvia';
    invia.textContent = testo({ it: 'CONFERMA', en: 'CHECK' });

    const reazione = () => rispondiInserimento(campo, invia);

    invia.addEventListener('click', reazione);
    campo.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            reazione();
        }
    });

    const contenitore = document.createElement('div');
    contenitore.className = 'quiz-inserimento';
    contenitore.appendChild(campo);
    contenitore.appendChild(invia);

    areaRisposta.appendChild(contenitore);

    campo.focus();
}

// ================= VERIFICA =================

function rispondiScelta(indiceScelto) {

    const pulsanti = areaRisposta.querySelectorAll('.quiz-opzione');

    pulsanti.forEach((b) => { b.disabled = true; });

    const corretto = !!(
        esercizioAttivo.opzioni[indiceScelto] &&
        esercizioAttivo.opzioni[indiceScelto].corretta
    );

    pulsanti.forEach((b, i) => {
        if (esercizioAttivo.opzioni[i] && esercizioAttivo.opzioni[i].corretta) {
            b.classList.add('corretta');
        } else if (i === indiceScelto) {
            b.classList.add('errata');
        }
    });

    chiudiConEsito(corretto);
}

function rispondiInserimento(campo, invia) {

    const risposta = String(campo ? campo.value : '').trim().toLowerCase();

    // campo vuoto: non e' una risposta errata, e' un NON rispondere.
    // L'esercizio resta aperto, solo un avviso neutro appare
    if (risposta === '') {

        avvisoAttivo = true;

        if (esito) {
            esito.textContent = testo({
                it: 'Scrivi prima una risposta...',
                en: 'Type an answer first...'
            });
            esito.className = 'avviso';
        }

        if (bloccoFeedback) bloccoFeedback.hidden = false;

        if (campo) campo.focus();

        return;
    }

    const accettate = (
        esercizioAttivo.rispostaAttesa &&
        esercizioAttivo.rispostaAttesa.accetta
    ) || [];

    const corretto = accettate.some((a) => String(a).trim().toLowerCase() === risposta);

    if (campo) campo.disabled = true;
    if (invia) invia.disabled = true;

    chiudiConEsito(corretto);
}

function chiudiConEsito(corretto) {

    esitoCorrente = corretto;
    avvisoAttivo = false;

    // snapshot per il re-translate: se la lingua cambia col
    // pannello ancora montato, il testo si ricostruisce qui
    statoSpiegazione = {
        corretto,
        spiegazione: esercizioAttivo.spiegazione,
        tipo: esercizioAttivo.tipo,
        accettate: (
            esercizioAttivo.rispostaAttesa &&
            esercizioAttivo.rispostaAttesa.accetta
        ) || []
    };

    if (esito) {
        esito.textContent = testoEsito(corretto);
        esito.className = corretto ? 'corretta' : 'errata';
    }

    if (spiegazione) {

        const testoFinale = testoSpiegazioneDaStato(statoSpiegazione);

        spiegazione.textContent = testoFinale;

        // stessa spiegazione nel pannello in alto a sinistra,
        // dove resta visibile dopo la chiusura del quiz
        if (testoSpiegazioneHud) {
            scriviComeTerminale(testoSpiegazioneHud, testoFinale);
        }
    }

    if (bloccoFeedback) bloccoFeedback.hidden = false;
    if (continua) continua.hidden = false;

    aggiungiVoce(esercizioAttivo.categoria, corretto);

    // le caselle normali danno punti se corretti, la
    // rossa stop_red toglie punti se sbagliato (corretta = nulla)
    if (corretto && !sulloStop) {
        aggiornaPunti(PUNTI_RISPOSTA);
    } else if (!corretto && sulloStop) {
        aggiornaPunti(-PENALITA_STOP);
    }
}

/**
 * Antepone i numeri di riga al codice mostrato nel pannello.
 * Numeri solo se il blocco ha piu' righe: alla query di due
 * righe dentro un'opzione il numero non serve.
 */
function aggiungiNumeriRighe(codice) {

    const righe = String(codice).split('\n');

    if (righe.length < 3) {
        return codice;
    }

    const larghezza = String(righe.length).length;

    return righe
        .map((riga, indice) =>
            String(indice + 1).padStart(larghezza, ' ') + ' | ' + riga)
        .join('\n');
}

/**
 * La freccia apri/chiudi compare solo se il testo
 * sborda davvero dal pannello collassato.
 * Misura fatta a pannello CHIUSO: aperto non c'e' overflow.
 */
function aggiornaIndicatoreEspansione() {

    if (!pannelloSpiegazioneHud || !testoSpiegazioneHud) {
        return;
    }

    if (pannelloSpiegazioneHud.classList.contains('aperta')) {
        return;
    }

    pannelloSpiegazioneHud.classList.toggle(
        'espandibile',
        testoSpiegazioneHud.scrollHeight > testoSpiegazioneHud.clientHeight
    );
}

let battituraSpiegazione = null;

/**
 * Scrive il testo un carattere alla volta, stile terminale.
 * Una battitura gia' in corso viene cancellata se ne parte un'altra.
 */
function scriviComeTerminale(elemento, testoCompleto) {

    if (battituraSpiegazione) {
        clearInterval(battituraSpiegazione);
    }

    elemento.textContent = '';

    let scritti = 0;

    battituraSpiegazione = setInterval(() => {

        scritti += 2; // due caratteri a tick: tempo dimezzato
        elemento.textContent = testoCompleto.slice(0, scritti);

        if (scritti >= testoCompleto.length) {
            clearInterval(battituraSpiegazione);
            battituraSpiegazione = null;
            aggiornaIndicatoreEspansione();
        }

    }, 6);
}

// ================= APERTURA E CHIUSURA =================

function apriQuiz(materiale, indiceCasella) {

    if (quizAperto || !pannelloQuiz) {
        return;
    }

    esercizioAttivo = estraiEsercizio(materiale);

    if (!esercizioAttivo) {
        return; // nessun esercizio disponibile: la partita continua
    }

    quizAperto = true;

    // casella rossa: esiti a saldo zero/negativo, gestiti in chiusura
    sulloStop = materiale === 'stop_red';

    // lo stato di re-translate riparte pulito a ogni domanda
    esitoCorrente = null;
    statoSpiegazione = null;
    avvisoAttivo = false;
    argomentoCorrente = esercizioAttivo.argomento;

    if (etichettaCategoria) {
        etichettaCategoria.textContent = ETICHETTE_LOG[materiale] || 'MIX';
    }

    if (domanda) {
        domanda.textContent = testo(esercizioAttivo.domanda);
    }

    // il pannello spiegazioni si azzera a ogni nuova domanda:
    // il tema sale subito in titolo, il testo aspetta la risposta
    if (titoloSpiegazioneHud) {
        // da qui in poi e' contenuto di gioco: via i traduttori
        // statici, cosi' il cambio lingua non sovrascrive piu'
        titoloSpiegazioneHud.removeAttribute('data-it');
        titoloSpiegazioneHud.removeAttribute('data-en');

        titoloSpiegazioneHud.textContent = testo(esercizioAttivo.argomento);
    }

    if (testoSpiegazioneHud) {
        // il dattilografo fermo se era ancora in corsa, e azzera
        if (battituraSpiegazione) {
            clearInterval(battituraSpiegazione);
            battituraSpiegazione = null;
        }

        testoSpiegazioneHud.removeAttribute('data-it');
        testoSpiegazioneHud.removeAttribute('data-en');

        testoSpiegazioneHud.textContent = '';
    }

    // le classi di stato vivono sul pannello, che abbandona
    // (per sempre) lo stato "benvenuto" alla prima domanda
    if (pannelloSpiegazioneHud) {
        pannelloSpiegazioneHud.classList.remove('aperta');
        pannelloSpiegazioneHud.classList.remove('espandibile');
        pannelloSpiegazioneHud.classList.remove('home');
    }

    if (bloccoCodice) {
        if (esercizioAttivo.codice) {
            bloccoCodice.textContent = aggiungiNumeriRighe(esercizioAttivo.codice);
            bloccoCodice.hidden = false;
        } else {
            bloccoCodice.textContent = '';
            bloccoCodice.hidden = true;
        }
    }

    if (areaRisposta) {
        areaRisposta.innerHTML = '';

        // le opzioni uguali tra loro si centrano da sole; l'input no
        areaRisposta.classList.toggle(
            'scelte',
            esercizioAttivo.tipo === 'sceltaMultipla'
        );

        // opzioni con snippet: griglia 2x2, cosi' niente scroll
        // del pannello per vedere tutte le risposte
        const opzioniCodice = (
            esercizioAttivo.tipo === 'sceltaMultipla' &&
            Array.isArray(esercizioAttivo.opzioni) &&
            esercizioAttivo.opzioni.some((o) => o.codice)
        );

        areaRisposta.classList.toggle('snip', opzioniCodice);

        if (pannelloQuiz) {
            pannelloQuiz.classList.toggle('snip', opzioniCodice);

            // blocco codice principale: pannello largo (v. CSS),
            // i comandi di risposta non escono dallo schermo
            pannelloQuiz.classList.toggle('codice', !!esercizioAttivo.codice);
        }

        // opzioni cortissime (numeri e simili): griglia compatta,
        // la stessa cura anti-scroll delle opzioni con snippet
        const opzioniBreve = (
            esercizioAttivo.tipo === 'sceltaMultipla' &&
            !opzioniCodice &&
            Array.isArray(esercizioAttivo.opzioni) &&
            esercizioAttivo.opzioni.every((o) => testo(o.testo).length <= 6)
        );

        areaRisposta.classList.toggle('breve', opzioniBreve);

        if (esercizioAttivo.tipo === 'sceltaMultipla') {
            costruireOpzioni();
        } else {
            costruireInserimento();
        }
    }

    if (bloccoFeedback) {

        bloccoFeedback.hidden = true;

        // non basta nasconderlo: il contenuto va svuotato,
        // altrimenti l'avviso del campo vuoto riporta IN VISTA
        // esito e spiegazione della domanda precedente
        // (e con essi la soluzione che non c'entra nulla)
        if (esito) {
            esito.textContent = '';
            esito.className = '';
        }

        if (spiegazione) {
            spiegazione.textContent = '';
        }
    }

    if (continua) continua.hidden = true;

    pannelloQuiz.hidden = false;
}

function chiudiQuiz() {
    quizAperto = false;
    esercizioAttivo = null;

    if (pannelloQuiz) {
        pannelloQuiz.hidden = true;
    }
}

// ================= CAMBIO LINGUA IN CORSA =================

/**
 * Il cambio lingua traduce solo i nodi [data-it] statici:
 * i contenuti di gioco (quiz aperto, spiegazioni battute,
 * pulsanti generati via codice) vengono riscritti qui,
 * a evento, senza aspettare la prossima domanda.
 */
document.addEventListener('linguacambiata', () => {

    // pannello spiegazione: il titolo segue sempre
    if (titoloSpiegazioneHud && argomentoCorrente) {
        titoloSpiegazioneHud.textContent = testo(argomentoCorrente);
    }

    // il corpo segue solo se c'e' una spiegazione battuta;
    // nello stato home (o vuoto in attesa) toccano i statici
    if (
        testoSpiegazioneHud &&
        pannelloSpiegazioneHud &&
        !pannelloSpiegazioneHud.classList.contains('home') &&
        statoSpiegazione
    ) {
        testoSpiegazioneHud.textContent = testoSpiegazioneDaStato(statoSpiegazione);
        aggiornaIndicatoreEspansione();
    }

    // pulsante del pannello esercizi: era impostato solo
    // all'avvio, ora segue il cambio lingua
    if (continua) {
        continua.textContent = testo({ it: 'CONTINUA', en: 'CONTINUE' });
    }

    if (!quizAperto || !esercizioAttivo) {
        return;
    }

    // quiz aperto: domanda e risposte si riscrivono al volo
    if (domanda) {
        domanda.textContent = testo(esercizioAttivo.domanda);
    }

    if (areaRisposta) {

        if (esercizioAttivo.tipo === 'sceltaMultipla') {

            // i bottoni restano al loro posto: cambia solo la riga
            // di testo, gli stati corretta/errata non si toccano
            const pulsanti = areaRisposta.querySelectorAll('.quiz-opzione');

            pulsanti.forEach((bottone, indice) => {
                const opzione = esercizioAttivo.opzioni[indice];
                const riga = bottone.querySelector('span');

                if (opzione && riga) {
                    riga.textContent = testo(opzione.testo);
                }
            });

        } else {

            const campo = areaRisposta.querySelector('#quizRispostaUtente');
            const invia = areaRisposta.querySelector('#quizInvia');

            if (campo) {
                campo.placeholder = testo({ it: 'Scrivi la risposta...', en: 'Type your answer...' });
            }

            if (invia) {
                invia.textContent = testo({ it: 'CONFERMA', en: 'CHECK' });
            }
        }
    }

    // feedback: esito reale se la risposta e' stata data,
    // altrimenti l'avviso del campo vuoto se e' quello in vista
    if (avvisoAttivo && esito) {
        esito.textContent = testo({
            it: 'Scrivi prima una risposta...',
            en: 'Type an answer first...'
        });

    } else if (esitoCorrente !== null && esito) {
        esito.textContent = testoEsito(esitoCorrente);
    }

    if (statoSpiegazione && spiegazione) {
        spiegazione.textContent = testoSpiegazioneDaStato(statoSpiegazione);
    }
});

// ================= INIZIALIZZAZIONE =================

// la spiegazione lunga si apre/chiude cliccandola
if (pannelloSpiegazioneHud) {
    pannelloSpiegazioneHud.addEventListener('click', () => {
        pannelloSpiegazioneHud.classList.toggle('aperta');
    });
}

if (continua) {
    continua.textContent = testo({ it: 'CONTINUA', en: 'CONTINUE' });
    continua.addEventListener('click', chiudiQuiz);
}

// a ogni refresh della pagina la partita riparte da capo:
// il punteggio accumulato non sopravvive, si azzera
sessionStorage.setItem('queryquestPunti', '0');
aggiornaPunti(0);

// quando la pedina si ferma, pesciamo
suArrivo(apriQuiz);
