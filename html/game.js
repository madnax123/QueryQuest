import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { inizializzaPercorso, impostaPedina, avviaMovimento, aggiornaMovimento } from './movimenti.js';
import './dadi.js';
import './quiz.js';

// ============================================================
// game.js — scena 3D, tabellone GLB, pedina, HUD e impostazioni
// I casi tecnici vivono altrove: percorso → movimenti.js, lancio
// → dadi.js, esercizi → quiz.js. Qui resta scena, pedine e rendering.
// ============================================================

// ================= MANOPOLE: regola qui =================

const EMISSIVE_MAX = 2;   // limite dei neon (nel GLB arrivano a 6)

const LUCE_OPACITA = 0.02;  //  più alto = più opaco
const LUCE_EMISSIVE = 1;   // più basso = meno luminoso

const BLOOM_INTENSITA = 0.2;   // forza dell'alone
const BLOOM_RAGGIO = 0.2;   // ampiezza dell'alone
const BLOOM_SOGLIA = 0.03;  // più bassa = più cose brillano
// ========================================================

// SCENA
const scena = new THREE.Scene();
scena.background = new THREE.Color(0x000000); // Sfondo nero fisso

// TELECAMERA
const telecamera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
telecamera.position.set(0, 7, 9);
telecamera.lookAt(0, 0, 0);

// RENDERER (sfondo nero immediato)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0x000000, 1);

document.getElementById('scena3D').appendChild(renderer.domElement);

// POST-PROCESSING DIRETTO (senza passaggi di trasparenza complessi)
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scena, telecamera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    BLOOM_INTENSITA,
    BLOOM_RAGGIO,
    BLOOM_SOGLIA
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

// CONTROLLI
const controlli = new OrbitControls(telecamera, renderer.domElement);
controlli.target.set(0, 0, 0);
controlli.enableDamping = true;
controlli.dampingFactor = 0.12;
controlli.rotateSpeed = 1.5;
controlli.zoomSpeed = 1.2;
controlli.minDistance = 5;
controlli.maxDistance = 20;
controlli.minPolarAngle = THREE.MathUtils.degToRad(25);
controlli.maxPolarAngle = THREE.MathUtils.degToRad(75);
controlli.enablePan = false;
controlli.update();

// ILLUMINAZIONE (senza tinte blu iniziali)
scena.add(new THREE.HemisphereLight(0xEAF2FF, 0x000000, 0.6));

const lucePrincipale = new THREE.DirectionalLight(0xFFFFFF, 1.5);
lucePrincipale.position.set(0, 10, 5);
scena.add(lucePrincipale);

// CARICAMENTO DEL MODELLO
const loader = new GLTFLoader();
let pedinaGiocatore = null;
let posizioneStart = null;
let mixer = null;
const clock = new THREE.Clock();
mostraNomeGiocatore();
applicaImpostazioniHUD();

loader.load(
    '../queryquest_tabellone/blender/tabellone.glb',

    function (gltf) {
        const modello = gltf.scene;

        // MATERIALI
        modello.traverse((o) => {
            if (o.isMesh) {
                const mats = Array.isArray(o.material) ? o.material : [o.material];

                mats.forEach((m) => {
                    if (m.emissiveIntensity > EMISSIVE_MAX) {
                        m.emissiveIntensity = EMISSIVE_MAX;
                    }

                    if (m.name === "luce.001") {
                        m.transparent = true;
                        m.opacity = LUCE_OPACITA;
                        m.emissiveIntensity = LUCE_EMISSIVE;
                        m.depthWrite = false;
                        m.side = THREE.DoubleSide;
                        m.needsUpdate = true;
                    }

                    if (["tile", "magenta", "gold", "violet"].includes(m.name)) {
                        m.transparent = false;
                        m.emissiveIntensity = 2;
                        m.depthWrite = true;
                        m.needsUpdate = true;
                    }
                });
            }
        });

        scena.add(modello);
        inizializzaPercorso(modello);

        // TROVA START
        modello.updateMatrixWorld(true);

        const start = modello.getObjectByName('casella_START');

        if (!start) {
            console.error('Casella START non trovata!');
            return;
        }

        // Calcola il centro della casella
        const box = new THREE.Box3().setFromObject(start);
        const posizioneStart = box.getCenter(new THREE.Vector3());

        // Carica la pedina scelta nel menu
        caricaPedina(posizioneStart);

        // ANIMAZIONI TABELLONE
        if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(modello);

            gltf.animations.forEach((animazione) => {
                mixer.clipAction(animazione).play();
            });
        }
    },

    undefined,

    function (errore) {
        console.error('Errore nel caricamento:', errore);
    }
);

function mostraNomeGiocatore() {

    const datiGiocatore = JSON.parse(
        sessionStorage.getItem('queryquestGiocatore')
    );

    const elementoNome = document.getElementById('nomeGiocatore');

    if (datiGiocatore && elementoNome) {
        elementoNome.textContent = datiGiocatore.nome;
    }

}


function caricaPedina(posizioneStart) {

    const datiGiocatore = JSON.parse(
        sessionStorage.getItem('queryquestGiocatore')
    );

    if (!datiGiocatore) {
        console.error('Nessun giocatore selezionato!');
        return;
    }

    const loaderPedina = new GLTFLoader();

    loaderPedina.load(
        '../queryquest_tabellone/blender/pedine.glb',

        function (gltf) {

            const originale = gltf.scene.getObjectByName(
                datiGiocatore.pedinaOggetto
            );

            if (!originale) {
                console.error('Pedina non trovata:', datiGiocatore.pedinaOggetto);
                return;
            }

            pedinaGiocatore = originale.clone(true);

            // Dimensione della pedina
            pedinaGiocatore.scale.set(0.5, 0.5, 0.5);

            // Rotazione di 90 gradi sull'asse Y
            pedinaGiocatore.rotation.y = THREE.MathUtils.degToRad(90);

            // Posizione iniziale: casella START
            pedinaGiocatore.position.copy(posizioneStart);

            // Piccolo sollevamento per evitare che affondi nel tabellone
            pedinaGiocatore.position.y += 0.1;

            scena.add(pedinaGiocatore);

            // Collega la pedina al sistema di movimento
            impostaPedina(pedinaGiocatore);
        },

        undefined,

        function (errore) {
            console.error('Errore caricamento pedina:', errore);
        }
    );
}

// ADATTA LA SCENA ALLA FINESTRA
window.addEventListener('resize', () => {
    telecamera.aspect = window.innerWidth / window.innerHeight;
    telecamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});


// ============ PREFERENZE → PANNELLI HUD ============
// Legge SOLO attraverso window.leggiFlag (definita in impostazioni.js,
// proprietario unico dello stato): qui si applica la preferenza,
// mai si definisce.
function applicaImpostazioniHUD() {
    document.getElementById("pannelloSpiegazione").style.display =
        window.leggiFlag("spiegazioni") ? "block" : "none";

    document.getElementById("pannelloCronologia").style.display =
        window.leggiFlag("questLog") ? "block" : "none";
}

// AGGIORNA I PANNELLI QUANDO SI PREME SALVA
// preventDefault di protezione: anche se impostazioni.js non caricasse,
// il form non deve MAI sotterrare la pagina (e la scena 3D) con un reload
document.getElementById("setting").addEventListener("submit", function(event) {
    event.preventDefault();

    applicaImpostazioniHUD();

});

// APERTURA IMPOSTAZIONI
const menuImpostazioni = document.getElementById('menuImpostazioni');

document.getElementById('apriImpostazioni').addEventListener('click', () => {
    menuImpostazioni.style.display = 'block';
});


// CHIUSURA IMPOSTAZIONI
document.getElementById('chiudiImpostazioni').addEventListener('click', () => {
    menuImpostazioni.style.display = 'none';
});


// CARICAMENTO PREFERENZE — RIMOSSO: i checkbox sono già
// sincronizzati da impostazioni.js (proprietario unico dello stato)


// QUIT GAME
document.getElementById('quitGame').addEventListener('click', () => {

    const conferma = confirm(
        window.traduci(
            'Vuoi davvero uscire dalla partita?',
            'Do you really want to quit the game?'
        )
    );

    if (conferma) {
        window.location.href = 'index.html';
    }

});

// ANIMAZIONE
// FPS: requestAnimationFrame senza limite esegue un render
// PER OGNI refresh dello schermo — su monitor ad alta frequenza
// (o su browser col vsync permissivo) la GPU lavora il doppio o il
// quadruplo del necessario. 60 fps bastano per un board game;
// i frame in eccesso vengono scartati e la GPU resta in calma.
// (il delta di Clock.getDelta() resta corretto: misura il tempo
// REALE passato, quindi movimenti e animazioni non si spostano)
const FPS_MASSIMO = 60;
const MS_PER_FRAME = 1000 / FPS_MASSIMO;
let ultimoRender = 0;

function anima(ora) {
    requestAnimationFrame(anima);

    // frame in anticipo rispetto al tetto: si scarta
    if (ora - ultimoRender < MS_PER_FRAME) {
        return;
    }

    // si conserva il resto della divisione, cosi' il ritmo non
    // deriva nel tempo rispetto all'orologio dello schermo
    ultimoRender = ora - ((ora - ultimoRender) % MS_PER_FRAME);

    const delta = clock.getDelta();

    if (mixer) {
        mixer.update(delta);
    }
    aggiornaMovimento(delta);
    controlli.update();

    // Render diretto con post-processing pulito
    composer.render();
}

anima();
