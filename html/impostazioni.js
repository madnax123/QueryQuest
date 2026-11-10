// ============================================================
// impostazioni.js — proprietario unico dello stato preferenze
// (questLog, spiegazioni) condiviso tra impostazioni.html e game.html
// Semantica ufficiale: valore assente = attivo (true)
// ============================================================

const spiegazioni = document.getElementById("spiegazioni");
const questLog = document.getElementById("questLog");
const impostazioni = document.getElementById("setting");

// ============ le uniche due funzioni che definiscono lo stato ============
function leggiFlag(nome) {
    const salvato = sessionStorage.getItem(nome);
    return salvato === null ? true : salvato === "true";
}

function salvaFlag(nome, valore) {
    sessionStorage.setItem(nome, String(valore));
}

// ============ sincronizza i checkbox a ogni caricamento pagina ============
if (spiegazioni) {
    spiegazioni.checked = leggiFlag("spiegazioni");
}

if (questLog) {
    questLog.checked = leggiFlag("questLog");
}

// ============ salvataggio al submit del form (solo se esiste) ============
if (impostazioni) {
    impostazioni.addEventListener("submit", function(event) {
        event.preventDefault();

        salvaFlag("spiegazioni", spiegazioni.checked);
        salvaFlag("questLog", questLog.checked);
    });
}

// Espongo la lettura per chi ha solo bisogno di LEGGERE (game.js)
window.leggiFlag = leggiFlag;
