// ============================================================
// audio.js — gestione centralizzata audio
// Ruoli distinti:
//   1. slider volume      (solo nelle pagine col form impostazioni)
//   2. musica del menu    (solo nelle pagine con <audio id="musicaMenu">)
// Nessuno dei due blocchi assume l'esistenza dell'altro elemento.
// ============================================================

const srcPagina = document.body.dataset.musica;
let musicaMenu = document.getElementById("musicaMenu");

// Pagine senza <audio id="musicaMenu">: crea l'audio dal data-musica del body
if (!musicaMenu && srcPagina) {
    musicaMenu = new Audio(srcPagina);
    musicaMenu.loop = true;
}
// Ogni brano ha la sua chiave per la posizione
const CHIAVE_POSIZIONE = "posizioneMusica" + (srcPagina ? ":" + srcPagina : "");
const sliderVolume = document.getElementById("volume");

// ------------------------------------------------------------
// CURVA DI VOLUME (audio taper percettivo)
// La posizione dello slider (0-100) NON è l'ampiezza reale:
// ampiezza = (posizione/100)². A metà pista si sente il 25%,
// che all'orecchio è un volume "basso" ma non muto.
// ESPO_CURVA = 2 → taper classico; aumenta (es. 3) se vuoi
// che la corsa iniziale sia ancora più silenziosa.
// ------------------------------------------------------------
const VOLUME_PREDEFINITO = 50;   // pallino iniziale: metà pista
const ESPO_CURVA = 2;

function valoreSliderAGuadagno(valore) {
    return Math.pow(Number(valore) / 100, ESPO_CURVA);
}

// ------------------------------------------------------------
// RUOLO 1 — SLIDER VOLUME
// ------------------------------------------------------------

if (sliderVolume) {

    // Ripristina la posizione dello slider,
    // oppure la porta al punto di default (metà pista)
    const volumeSalvato = sessionStorage.getItem("volumeMusica");

    if (volumeSalvato !== null) {
        sliderVolume.value = volumeSalvato;
    } else {
        sliderVolume.value = VOLUME_PREDEFINITO;
    }

    // Salva il volume solo premendo SALVA IMPOSTAZIONI
    const formImpostazioni = document.getElementById("setting");

    if (formImpostazioni) {
        formImpostazioni.addEventListener("submit", function() {
            sessionStorage.setItem("volumeMusica", sliderVolume.value);
        });
    }

}

// ------------------------------------------------------------
// RUOLO 2 — MUSICA DEL MENU
// ------------------------------------------------------------

if (musicaMenu) {

    // Volume: derivato dalla posizione salvata o di default,
    // SEMPRE attraverso la curva percettiva
    const volumeSalvato = sessionStorage.getItem("volumeMusica");

    musicaMenu.volume = volumeSalvato !== null
        ? valoreSliderAGuadagno(volumeSalvato)
        : valoreSliderAGuadagno(VOLUME_PREDEFINITO);

    // Slider presente in pagina → aggiornamento live del volume
    if (sliderVolume) {
        sliderVolume.addEventListener("input", function() {
            musicaMenu.volume = valoreSliderAGuadagno(sliderVolume.value);
        });
    }
        // Ripristina la posizione precedente della traccia
    const posizioneSalvata = sessionStorage.getItem(CHIAVE_POSIZIONE);

    // Partenza rallentata: da DA (0.7 = 70%) a velocità normale in DURATA ms
    let rampaFatta = false;

    function rampaIniziale() {
        if (rampaFatta) return;
        rampaFatta = true;

        const DA = 0.7;
        const DURATA = 4000;

        musicaMenu.preservesPitch = false;   // true = rallenta senza abbassare il tono
        musicaMenu.playbackRate = DA;

        const inizio = performance.now();

        function passo(ora) {
            const p = Math.min((ora - inizio) / DURATA, 1);
            musicaMenu.playbackRate = DA + (1 - DA) * p;
            if (p < 1) requestAnimationFrame(passo);
        }

        requestAnimationFrame(passo);
    }

    // Ripiego autoplay: se il browser rifiuta il play() automatico
    // si riprova al primo click o al primo tasto finché non riesce.
    function avviaMusica() {

        musicaMenu.play().then(function() {

            // Riuscito → i listener di ripiego si autorimuovono
            document.removeEventListener("pointerdown", avviaMusica);
            document.removeEventListener("keydown", avviaMusica);

            // Rallenta solo alla prima partenza, non quando riprende da una pagina all'altra
            if (posizioneSalvata === null) rampaIniziale();

        }).catch(function(errore) {

            console.log("Autoplay bloccato: riprovo al primo input dell'utente");

        });

    }

    // Ripristina la posizione e prova ad avviare
    // quando i metadati sono disponibili
    musicaMenu.addEventListener("loadedmetadata", function() {

        if (posizioneSalvata !== null) {
            musicaMenu.currentTime = Number(posizioneSalvata);
        }

        avviaMusica();

    });

    // Ripiego: primo click o primo tasto dell'utente
    document.addEventListener("pointerdown", avviaMusica);
    document.addEventListener("keydown", avviaMusica);

    // Salva la posizione prima di cambiare pagina
    window.addEventListener("beforeunload", function() {
        sessionStorage.setItem(CHIAVE_POSIZIONE, musicaMenu.currentTime);
    });

}
