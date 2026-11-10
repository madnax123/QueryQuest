// ============================================================
// lingue.js — cambio lingua it/en (sessionStorage "lingua")
// Traduce i nodi statici [data-it]; per i contenuti dinamici
// (quiz, spiegazioni) emette l'evento "linguacambiata": chi
// costruisce testi via JS si aggancia lì e si riscrive da solo.
// ============================================================

// Recupera la lingua salvata, oppure usa l'italiano come predefinito
function getLingua() {
    return sessionStorage.getItem("lingua") || "it";
}

// Traduce i testi generati da JavaScript
function traduci(testoIt, testoEn) {
    return getLingua() === "it" ? testoIt : testoEn;
}

// Applica la lingua selezionata agli elementi HTML
function cambiaLingua(lingua) {
    const elementi = document.querySelectorAll("[data-it]");

    elementi.forEach(function (elemento) {
        elemento.textContent = elemento.getAttribute("data-" + lingua);
    });

    document.documentElement.lang = lingua;

    // avviso i moduli con contenuti dinamici (quiz, spiegazioni):
    // i loro testi non hanno [data-it] e devono riscriversi da soli
    document.dispatchEvent(
        new CustomEvent("linguacambiata", { detail: { lingua: lingua } })
    );
}

// Applica la lingua all'apertura della pagina
document.addEventListener("DOMContentLoaded", function () {
    const lingua = getLingua();

    cambiaLingua(lingua);

    // Se siamo nella pagina delle impostazioni, seleziona il radio corretto
    const radioLingua = document.querySelector(
        `input[name="lang"][value="${lingua}"]`
    );

    if (radioLingua) {
        radioLingua.checked = true;
    }
});

// Salva la lingua quando vengono confermate le impostazioni
document.addEventListener("DOMContentLoaded", function () {
    const impostazioni = document.getElementById("setting");

if (impostazioni) {
    impostazioni.addEventListener("submit", function(event) {

        const linguaSelezionata = document.querySelector(
            'input[name="lang"]:checked'
        );

        if (linguaSelezionata) {
            const nuovaLingua = linguaSelezionata.value;

            // Salva la nuova lingua
            sessionStorage.setItem("lingua", nuovaLingua);

            // Applica immediatamente la traduzione
            cambiaLingua(nuovaLingua);
        }

    });
}
});
window.traduci = traduci;