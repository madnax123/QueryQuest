# QueryQuest 🎲

> 🇬🇧 Read it in English · [🇮🇹 Leggilo in italiano](README.md)

A **cyberpunk-style** educational board game: a 3D token moves around a board by rolling a dice, and every time it lands on a tile the game draws a **programming exercise**. The topic of the question depends on the tile's *material*.

## How it works

Each tile on the board has a 3D material that determines its category:

| Material | Tile | Question category |
|---|---|---|
| violet | violet tile | **Java** |
| magenta | pink/magenta tile | **HTML/CSS** |
| gold | golden tile | **SQL** |
| tile (grey) | neutral tile | **MIX** — mixed pool of all categories |
| stop_red | red tile | **STOP** — the challenge tile ⚠️ |

### Scoring

- Correct answer: **+10 points**
- **STOP** tile (red): correct answer **0 points**, wrong answer **−10 points**
- The score resets to zero on page refresh
- Pressing CHECK with an empty field **is not a wrong answer**: only a warning appears, the question stays open and no points are touched

## Features

- 🎲 **3D board** built with Three.js, animated dice included
- 🧑‍🚀 **Token selection** (dedicated menu with 3 3D models)
- 🌐 **Bilingual IT/EN** — the whole interface and all 54 exercises switch languages in real time, even with the quiz open
- 📜 **Terminal-style quest log and explanations** (blinking cursor included)
- 🛠️ **Settings panel**: language, music, quest log
- 🎵 Background music and sounds

## The exercise bank

**54 bilingual exercises** in `html/esercizi.js`, of two kinds:

- **sceltaMultipla** (multiple choice): 2–4 clickable options, with or without code snippets
- **inserimento** (fill-in): you complete the missing code in a text field and press CHECK (case-insensitive comparison)

Project convention: **the code inside exercises is always in ENGLISH** (strings, names, comments), exactly as in a real professional environment; questions and explanations are translated into both languages.

### Adding exercises

Add them in `html/esercizi.js`, inside the `ESERCIZI` array, following the schema of the two existing types. Iron rules:

1. unique, increasing `id`
2. *exactly one* `corretta: true` per multiple-choice exercise
3. code in English, prose `it` + `en`
4. one `spiegazione` per exercise (including why the wrong ones are wrong)

The layouts (compact grid for short options, 2×2 grid for code-snippet options, wide panel for exercises with a main code block) are **automatic**: you never pick them by hand.

## Project structure

```
GameTest/
├── html/                     # game pages and code
│   ├── index.html            # main menu
│   ├── menuPedina.html       # token selection
│   ├── impostazioni.html     # settings panel
│   ├── game.html             # match: board + HUD
│   ├── game.js               # 3D scene, GLB loading
│   ├── dadi.js               # 3D dice
│   ├── movimenti.js          # path, token movement
│   ├── quiz.js               # quiz, score, quest log
│   ├── esercizi.js           # exercise bank (54, bilingual)
│   ├── lingue.js             # IT/EN language switch
│   ├── impostazioni.js       # game preferences
│   └── audio.js              # music and sounds
├── audio/                    # audio tracks
├── img/                      # interface images
└── queryquest_tabellone/
    ├── blender/
    │   ├── tabellone.glb     # 3D board (runtime model)
    │   └── pedine.glb        # the 3 3D tokens (runtime model)
    └── textures/             # tile textures
```

## How to run it

The project uses **ES modules** and loads the `.glb` models via fetch: opening `game.html` straight from disk (`file://`) will not work. It needs **any static HTTP server** — no dependencies to install: Three.js is downloaded from a CDN at startup.

A few options, from the project folder:

```bash
# with Python
python -m http.server 8000
# → then open http://localhost:8000/html/game.html
```

Alternatively:

- **VS Code**: *Live Server* extension → "Open with Live Server"
- **GitHub Pages**: after uploading the project to GitHub, go to Settings → Pages → branch `main` → the game runs online at `https://<user>.github.io/<repo>/html/game.html`

## Tech stack

- **Three.js 0.180** (via CDN, importmap) — 3D scene, dice, tokens, board
- **Vanilla JavaScript** (ES modules) — no framework
- **HTML/CSS** — HUD and terminal/cyberpunk-style panels
- **Blender** — board and token modeling, exported to glTF (`.glb`)

## Game flow

1. **Main menu** → pick a name and a token (3 3D models available)
2. Roll the dice: the token advances that many tiles along the path
3. On arrival a question opens, based on the tile's material
4. Correct answer → +10 points; on a STOP tile → 0 if right, −10 if wrong
5. Every answer opens the **explanation**, with the logic behind the solution
6. CONTINUE, roll again — until the final tile

---

*At the end of the path sits the red STOP tile: questions from the mixed pool and your score at stake. Choose carefully when to stop.* 🎲
