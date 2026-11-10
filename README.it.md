# QueryQuest 🎲

> 🇮🇹 Leggilo in italiano · [🇬🇧 Read it in English](README.en.md)

Board game educativo in stile **cyberpunk**: una pedina 3D si muove su un tabellone lanciando un dado e, a ogni casella su cui si ferma, il gioco pesca un **esercizio di programmazione**. Il tema della domanda dipende dal *materiale* della casella stessa.

## Come funziona

Ogni casella del tabellone ha un materiale 3D che ne determina la categoria:

| Materiale | Casella | Categoria delle domande |
|---|---|---|
| violet | casella viola | **Java** |
| magenta | casella rosa/magenta | **HTML/CSS** |
| gold | casella dorata | **SQL** |
| tile (grigio) | casella neutra | **MIX** — pool misto di tutte le categorie |
| stop_red | casella rossa | **STOP** — la casella della sfida ⚠️ |

### Punteggio

- Risposta corretta: **+10 punti**
- Casella **STOP** (rossa): risposta corretta **0 punti**, risposta errata **−10 punti**
- Il punteggio riparte da zero al refresh della pagina
- Premere CONFERMA con il campo vuoto **non è un errore**: appare solo un avviso, la domanda resta aperta e nessun punto viene toccato

## Caratteristiche

- 🎲 **Tabellone 3D** in Three.js con dado animato
- 🧑‍🚀 **Scelta della pedina** (menu dedicato con 3 modelli 3D)
- 🌐 **Bilingue IT/EN** — l'intera interfaccia e tutti i 54 esercizi cambiano lingua in tempo reale, anche a quiz aperto
- 📜 **Quest log e spiegazioni in stile terminale** (cursore lampeggiante compreso)
- 🛠️ **Pannello impostazioni**: lingua, musica, quest log
- 🎵 Musica e suoni di sottofondo

## Il banco di esercizi

**54 esercizi bilingue** in `html/esercizi.js`, di due tipi:

- **sceltaMultipla**: 2–4 opzioni cliccabili, con o senza snippet di codice
- **inserimento**: si compila il codice mancante nel campo di testo e si preme CONFERMA (confronto case-insensitive)

Convenzione del progetto: il **codice negli esercizi è sempre in INGLESE** (stringhe, nomi, commenti), come avviene in un contesto professionale reale; domande e spiegazioni sono tradotte in entrambe le lingue.

### Aggiungere esercizi

Si aggiungono in `html/esercizi.js`, dentro l'array `ESERCIZI`, seguendo lo schema dei due tipi esistenti. Regole ferree:

1. `id` unico e crescente
2. *esattamente una* `corretta: true` per ogni scelta multipla
3. `codice` in inglese, prose `it` + `en`
4. una `spiegazione` per ogni esercizio (con anche il perché delle risposte errate)

I layout (griglia compatta per opzioni brevi, griglia 2×2 per le opzioni con snippet, pannello largo per gli esercizi con blocco di codice) sono **automatici**: non si scelgono a mano.

## Struttura del progetto

```
GameTest/
├── html/                     # pagine e codice del gioco
│   ├── index.html            # menu principale
│   ├── menuPedina.html       # scelta della pedina
│   ├── impostazioni.html     # pannello opzioni
│   ├── game.html             # partita: tabellone + HUD
│   ├── game.js               # scena 3D, caricamento GLB
│   ├── dadi.js               # dado 3D
│   ├── movimenti.js          # percorso, avanzamento della pedina
│   ├── quiz.js               # quiz, punteggio, quest log
│   ├── esercizi.js           # BANCA dati dei 54 esercizi (bilingue)
│   ├── lingue.js             # cambio lingua IT/EN
│   ├── impostazioni.js       # preferenze di gioco
│   └── audio.js              # musica e suoni
├── audio/                    # tracce audio
├── img/                      # immagini dell'interfaccia
└── queryquest_tabellone/
    ├── blender/
    │   ├── tabellone.glb     # tabellone 3D (modello runtime)
    │   └── pedine.glb        # le 3 pedine 3D (modello runtime)
    └── textures/             # texture delle caselle
```

## Come avviarlo

Il progetto usa **moduli ES** e carica i modelli `.glb` via fetch: non funziona aprendo `game.html` direttamente dal disco (`file://`). Serve un **qualsiasi server HTTP statico** — nessuna dipendenza da installare: Three.js viene scaricato da CDN all'avvio.

Alcune opzioni, dalla cartella del progetto:

```bash
# con Python
python -m http.server 8000
# → poi apri http://localhost:8000/html/game.html
```

Oppure:

- **VS Code**: estensione *Live Server* → "Open with Live Server"
- **GitHub Pages**: dopo aver caricato il progetto su GitHub, Settings → Pages → branch `main` → il gioco gira online su `https://<utente>.github.io/<repo>/html/game.html`

## Tecnologie

- **Three.js 0.180** (via CDN, importmap) — scena 3D, dado, pedine, tabellone
- **JavaScript vanilla** (moduli ES) — nessun framework
- **HTML/CSS** — HUD e pannelli in stile terminale cyberpunk
- **Blender** — modellazione di tabellone e pedine, esportati in glTF (`.glb`)

## Flusso di gioco

1. **Menu principale** → si sceglie nome e pedina (3 modelli 3D disponibili)
2. Si lancia il dado: la pedina avanza del numero uscito lungo il percorso
3. Sulla casella di arrivo si apre una domanda in base al materiale della casella
4. Risposta corretta → +10 punti; su casella STOP → 0 se corretto, −10 se errato
5. Dopo ogni risposta si apre la **spiegazione**, con la logica dietro la soluzione
6. CONTINUA, poi di nuovo dado — fino alla casella finale

---

*In fondo al percorso sta la casella rossa STOP: domande dal pool misto e punteggio in pericolo. Scegli bene quando fermarti.* 🎲
