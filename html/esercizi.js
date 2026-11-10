// ============================================================
// esercizi.js — banca dati esercizi QueryQuest
//
// DECISIONI DI PROGETTO:
//   - LINGUA_DEFAULT = "it" (default italiano, testo UI/didattica)
//   - Gli snippet di codice sono in INGLESE (stringhe e nomi),
//     perché così è il codice reale in un contesto professionale
//   - categorie caselle: "violet" = Java, "magenta" = HTML/CSS,
//     "gold" = SQL, "random" = pool misto (pesca da tutte le categorie)
//   - tipi: "sceltaMultipla" (opzioni con flag corretta),
//           "inserimento" (risposta libera a token,
//            confronto case-insensitive su `accetta`)
//   - `codice` (opzionale): snippet mostrato in monospace nel pannello
// ============================================================

const LINGUA_DEFAULT = "it";

function getLinguaCorrente() {
    const lingua = sessionStorage.getItem("lingua");

    if (lingua === "it" || lingua === "en") {
        return lingua;
    }

    return LINGUA_DEFAULT;
}

// Ritorna il testo nella lingua corrente, con fallback ITALIANO
function testo(oggettoTesto) {
    if (!oggettoTesto) return "";
    return oggettoTesto[getLinguaCorrente()] || oggettoTesto.it || "";
}

const ESERCIZI = [

    // ========================================================
    // JAVA — VIOLET (10 esercizi)
    // ========================================================

    {
        id: 1,
        categoria: "violet",
        argomento: { it: "Polimorfismo", en: "Polymorphism" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Cos'è il polimorfismo in Java?",
            en: "What is polymorphism in Java?"
        },
        opzioni: [
            {
                testo: {
                    it: "La capacità di una classe di ereditare campi e metodi da un'altra classe genitrice.",
                    en: "The ability of a class to inherit fields and methods from a parent class."
                },
                corretta: false
            },
            {
                testo: {
                    it: "La capacità di un oggetto di assumere molte forme: un riferimento di tipo superclasse può richiamare a runtime metodi sovrascritti (override) in una sottoclasse.",
                    en: "The ability of an object to take many forms: a superclass-typed reference can call overridden methods in a subclass at runtime."
                },
                corretta: true
            },
            {
                testo: {
                    it: "La conversione automatica di un tipo primitivo nel rispettivo oggetto wrapper (es. da int a Integer).",
                    en: "The automatic conversion of a primitive type into its wrapper object (e.g. from int to Integer)."
                },
                corretta: false
            },
            {
                testo: {
                    it: "La limitazione dell'accesso ai dati interni di un oggetto tramite modificatori come private.",
                    en: "Restricting access to an object's internal data through modifiers like private."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Polimorfismo significa \"più forme\": un programma tratta oggetti di classi diverse attraverso una superclasse o interfaccia comune, eseguendo il metodo della classe effettiva dell'oggetto a runtime (dynamic method dispatch).",
            en: "Polymorphism means \"many forms\": a program treats objects of different classes through a common superclass or interface, executing the method of the object's actual class at runtime (dynamic method dispatch)."
        }
    },

    {
        id: 2,
        categoria: "violet",
        argomento: { it: "Immutabilità delle String", en: "String immutability" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Perché le stringhe (String) in Java sono considerate \"immutabili\"?",
            en: "Why are strings (String) in Java considered \"immutable\"?"
        },
        opzioni: [
            {
                testo: {
                    it: "Una volta creato l'oggetto String, il suo valore in memoria non può essere modificato: le operazioni che sembrano modificarlo generano in realtà un nuovo oggetto.",
                    en: "Once created, a String object's value in memory cannot be changed: operations that seem to modify it actually create a new object."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Perché non possono essere salvate su database o file di testo.",
                    en: "Because they cannot be saved to a database or text file."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Perché il loro valore non può superare una dimensione massima di 255 caratteri.",
                    en: "Because their value cannot exceed a maximum size of 255 characters."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Perché possono essere lette solo dai thread principali, non dai secondari.",
                    en: "Because they can only be read by main threads, not by secondary ones."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "String è immutabile per sicurezza, per il String Pool (ottimizzazione della memoria) e per sincronizzazione fra thread. `s = s + \"ciao\"` non modifica la stringa originale: crea un nuovo oggetto.",
            en: "String is immutable for security reasons, for the String Pool (memory optimization) and thread synchronization. `s = s + \"ciao\"` doesn't modify the original string: it creates a new object."
        }
    },

    {
        id: 3,
        categoria: "violet",
        argomento: { it: "Modificatori di accesso", en: "Access modifiers" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale modificatore rende un membro visibile SOLO dentro la classe in cui è dichiarato?",
            en: "Which access modifier makes a member visible ONLY inside the class it is declared in?"
        },
        opzioni: [
            {
                testo: { it: "public", en: "public" },
                corretta: false
            },
            {
                testo: { it: "protected", en: "protected" },
                corretta: false
            },
            {
                testo: { it: "private", en: "private" },
                corretta: true
            },
            {
                testo: { it: "default (nessun modificatore)", en: "default (no modifier)" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "private applica il massimo incapsulamento: il membro non è accessibile da nessun'altra classe, nemmeno dalle sottoclassi. public = ovunque, protected = stesso package + sottoclassi, default = solo lo stesso package.",
            en: "private applies maximum encapsulation: the member is not accessible from any other class, not even subclasses. public = everywhere, protected = same package + subclasses, default = same package only."
        }
    },

    {
        id: 4,
        categoria: "violet",
        argomento: { it: "Parola chiave static", en: "The static keyword" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Cosa caratterizza un metodo dichiarato static in una classe Java?",
            en: "What characterizes a method declared static in a Java class?"
        },
        opzioni: [
            {
                testo: {
                    it: "Può essere eseguito solo dopo aver creato almeno 10 istanze della classe.",
                    en: "It can only run after creating at least 10 instances of the class."
                },
                corretta: false
            },
            {
                testo: {
                    it: "È accessibile solo dentro blocchi di codice protetti da password.",
                    en: "It is only accessible inside password-protected code blocks."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Appartiene alla classe e non a un'istanza: si invoca senza creare un oggetto e non può accedere direttamente alle variabili d'istanza (non statiche).",
                    en: "It belongs to the class, not to an instance: it can be called without creating an object and cannot directly access instance (non-static) variables."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Rende il metodo immutabile e impossibile da ereditare.",
                    en: "It makes the method immutable and impossible to inherit."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "I membri static appartengono alla classe, non all'oggetto: dentro di essi non esiste `this`. Si invocano sul nome della classe (es. Math.sqrt()). L'impossibilità di override la dà `final`, non `static`.",
            en: "Static members belong to the class, not the object: there is no `this` inside them. They are called on the class name (e.g. Math.sqrt()). Preventing override is `final`, not `static`."
        }
    },

    {
        id: 5,
        categoria: "violet",
        argomento: { it: "Parola chiave final", en: "The final keyword" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Cosa comporta applicare final a una variabile primitiva?",
            en: "What does applying final to a primitive variable do?"
        },
        opzioni: [
            {
                testo: {
                    it: "La rende una costante: assegnato il valore iniziale, non può più essere modificato.",
                    en: "It becomes a constant: once the initial value is assigned, it cannot be changed."
                },
                corretta: true
            },
            {
                testo: {
                    it: "La rende accessibile pubblicamente da qualsiasi classe.",
                    en: "It becomes publicly accessible from any class."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Cancella la variabile dalla memoria dopo 5 secondi di inattività.",
                    en: "The variable is removed from memory after 5 seconds of inactivity."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Converte automaticamente la variabile nel suo wrapper.",
                    en: "The variable is automatically converted into its wrapper."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "final impedisce la riassegnazione. Su una classe impedisce l'estensione; su un metodo, l'override. Visibilità = modificatori di accesso; memoria = Garbage Collector; boxing = meccanismo nativo separato.",
            en: "final prevents reassignment. On a class it prevents extension; on a method, overriding. Visibility = access modifiers; memory = Garbage Collector; boxing = separate native mechanism."
        }
    },

    {
        id: 6,
        categoria: "violet",
        argomento: { it: "Operatori e concatenazione", en: "Operators and concatenation" },
        tipo: "sceltaMultipla",
        codice:
`int a = 5;
int b = 10;
System.out.println("Result: " + a + b);`,
        domanda: {
            it: "Cosa stampa a schermo questo frammento di codice Java?",
            en: "What does this Java code snippet print?"
        },
        opzioni: [
            {
                testo: {
                    it: 'Risultato: 15  (nel codice reale: "Result: 15")',
                    en: 'Result: 15'
                },
                corretta: false
            },
            {
                testo: {
                    it: 'Risultato: 510  (nel codice reale: "Result: 510")',
                    en: "Result: 510"
                },
                corretta: true
            },
            {
                testo: {
                    it: "Errore di compilazione",
                    en: "Compilation error"
                },
                corretta: false
            },
            {
                testo: {
                    it: "510",
                    en: "510"
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Il + si valuta da sinistra a destra: quando incontra la stringa \"Result: \" diventa concatenazione, quindi a e b vengono appese come testo (510). Per sommarle: usare le parentesi, \"Result: \" + (a + b).",
            en: "The + operator evaluates left to right: when it meets the string \"Result: \" it becomes concatenation, so a and b get appended as text (510). To sum them: use parentheses, \"Result: \" + (a + b)."
        }
    },

    {
        id: 7,
        categoria: "violet",
        argomento: { it: "Passaggio per valore", en: "Pass-by-value" },
        tipo: "sceltaMultipla",
        codice:
`class Box {
    int value = 10;
}

public class Main {
    public static void change(Box b) {
        b.value = 20;
        b = new Box();
        b.value = 30;
    }

    public static void main(String[] args) {
        Box box = new Box();
        change(box);
        System.out.println(box.value);
    }
}`,
        domanda: {
            it: "Cosa stampa a schermo questo programma Java?",
            en: "What does this Java program print?"
        },
        opzioni: [
            { testo: { it: "10", en: "10" }, corretta: false },
            { testo: { it: "20", en: "20" }, corretta: true },
            { testo: { it: "30", en: "30" }, corretta: false },
            { testo: { it: "Errore di compilazione", en: "Compilation error" }, corretta: false }
        ],
        spiegazione: {
            it: "Java passa SEMPRE per valore (copia del riferimento). b.value = 20 modifica l'oggetto originale (10→20); poi b = new Box() riassegna il riferimento locale a un nuovo oggetto: il 30 resta lì e muore col metodo. L'originale stampa 20.",
            en: "Java ALWAYS passes by value (a copy of the reference). b.value = 20 changes the original object (10→20); then b = new Box() rebinds the local reference to a new object: the 30 lives and dies inside the method. The original prints 20."
        }
    },

    {
        id: 8,
        categoria: "violet",
        argomento: { it: "Tipo di ritorno", en: "Return type" },
        tipo: "inserimento",
        codice:
`public class Calculator {

    public int sum(int a, int b) {
        int result = a + b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.sum(5, 3));
    }
}`,
        domanda: {
            it: "Il codice non compila. Qual è il numero della riga problematica? (scrivi solo il numero)",
            en: "This code doesn't compile. Which line number causes the problem? (write just the number)"
        },
        rispostaAttesa: {
            accetta: ["5", "riga 5", "line 5"]
        },
        spiegazione: {
            it: "Il metodo sum è dichiarato int ma manca completamente il return: il compilatore termina con \"Missing return statement\". Correzione: aggiungere `return result;`.",
            en: "The sum method is declared int but there is no return statement at all: the compiler fails with \"Missing return statement\". Fix: add `return result;`."
        }
    },

    {
        id: 9,
        categoria: "violet",
        argomento: { it: "Confronto tra String", en: "String comparison" },
        tipo: "inserimento",
        codice:
`String savedPassword = "admin123";
Scanner scanner = new Scanner(System.in);

System.out.print("Enter your password: ");
String userInput = scanner.nextLine();

if (userInput == savedPassword) {
    System.out.println("Access granted!");
} else {
    System.out.println("Wrong password!");
}`,
        domanda: {
            it: "Il codice compila ed esegue, ma ha un errore logico nascosto. Qual è il numero della riga problematica? (scrivi solo il numero)",
            en: "This code compiles and runs, but has a hidden logic bug. Which line number causes it? (write just the number)"
        },
        rispostaAttesa: {
            accetta: ["7", "riga 7", "line 7"]
        },
        spiegazione: {
            it: "Con gli oggetti, l'operatore == confronta i riferimenti in memoria, non il contenuto. Anche digitando esattamente \"admin123\", l'input dell'utente punta a un oggetto diverso: il confronto fallisce sempre. Si usa .equals().",
            en: "For objects, the == operator compares memory references, not content. Even typing exactly \"admin123\", the user's input points to a different object: the comparison always fails. You must use .equals()."
        }
    },

    {
        id: 10,
        categoria: "violet",
        argomento: { it: "NullPointerException", en: "NullPointerException" },
        tipo: "inserimento",
        codice:
`List<String> clienti = null;

clienti.add("Mario Rossi");
clienti.add("Luigi Verdi");

System.out.println("Number of customers: " + clienti.size());`,
        domanda: {
            it: "Il codice compila ed esegue, ma va in crash a runtime. Qual è il numero della riga che causa il problema? (scrivi solo il numero)",
            en: "This code compiles and runs, but crashes at runtime. Which line number causes the crash? (write just the number)"
        },
        rispostaAttesa: {
            accetta: ["3", "riga 3", "line 3"]
        },
        spiegazione: {
            it: "La lista è dichiarata ma vale null (mai istanziata con new ArrayList<>()). Chiamando .add() su null, Java lancia la celebre NullPointerException: stai operando su un oggetto che non esiste in memoria.",
            en: "The list is declared but set to null (never instantiated with new ArrayList<>()). Calling .add() on null throws the famous NullPointerException: you are operating on an object that does not exist in memory."
        }
    },

    // ========================================================
    // JAVA — POOL RANDOM (5 esercizi, pescati dal materiale "tile")
    // NOTA: originali 11, 12 e 15 erano fill-in multi-blank:
    // qui sono spezzati in inserimenti a risposta singola.
    // ========================================================

    {
        id: 11,
        categoria: "random",
        argomento: { it: "Interfacce", en: "Interfaces" },
        tipo: "inserimento",
        codice:
`interface Payable {
    void makePayment(double amount);
}

// COMPLETE: how do you declare the class that implements the interface?
public class CreditCard ______ Payable {

    @Override
    public void makePayment(double amount) {
        System.out.println("Payment of " + amount + " € made with card.");
    }
}`,
        domanda: {
            it: "Completa il codice: quale PAROLA CHIAVE va al posto di ______ per adottare l'interfaccia? (una parola)",
            en: "Complete the code: which KEYWORD goes instead of ______ to adopt the interface? (one word)"
        },
        rispostaAttesa: {
            accetta: ["implements"]
        },
        spiegazione: {
            it: "Una classe adotta un'interfaccia con `implements` (mentre `extends` si usa per ereditare da un'altra classe). L'annotazione @Override, sopra il metodo, è best practice: comunica al compilatore che stiamo sovrascrivendo e blocca errori di battitura nel nome.",
            en: "A class adopts an interface with `implements` (`extends` is for inheriting from a class). The @Override annotation above the method is a best practice: it tells the compiler we are overriding and catches typos in the method name."
        }
    },

    {
        id: 12,
        categoria: "random",
        argomento: { it: "Gestione delle eccezioni", en: "Exception handling" },
        tipo: "inserimento",
        codice:
`public class DivisionHandler {
    public static void runDivision(int numerator, int denominator) {
        try {
            int result = numerator / denominator;
            System.out.println("Result: " + result);
        }
        ______ (______ e) {
            System.out.println("Warning: you cannot divide by zero!");
        }
    }
}`,
        domanda: {
            it: "Completa il codice: quale PAROLA CHIAVE apre il blocco che intercetta l'eccezione? (una parola)",
            en: "Complete the code: which KEYWORD opens the block that catches the exception? (one word)"
        },
        rispostaAttesa: {
            accetta: ["catch"]
        },
        spiegazione: {
            it: "try racchiude il codice pericoloso; catch intercetta l'eccezione specifica (qui la divisione per zero, ArithmeticException) e permette al programma di rispondere con un messaggio personalizzato invece di crashare.",
            en: "try wraps the risky code; catch intercepts the specific exception (here division by zero, ArithmeticException) and lets the program respond with a custom message instead of crashing."
        }
    },

    {
        id: 13,
        categoria: "random",
        argomento: { it: "Classi astratte vs interfacce", en: "Abstract classes vs interfaces" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Devi creare una classe base per i dipendenti con variabili d'istanza condivise (nome, cognome, stipendioBase), un costruttore e metodi già pronti — ma vorresti anche imporre con un calcolaBonus() astratto che ogni tipo di dipendente debba implementare. Cosa usi?",
            en: "You need a base employee class with shared instance variables (name, surname, baseSalary), a constructor and ready-made methods — but also a mandatory abstract calcolaBonus() that each employee type must implement. What do you use?"
        },
        opzioni: [
            {
                testo: { it: "Un'interfaccia pura (interface)", en: "A pure interface (interface)" },
                corretta: false
            },
            {
                testo: { it: "Una classe astratta (abstract class)", en: "An abstract class (abstract class)" },
                corretta: true
            },
            {
                testo: { it: "Un tipo enumerativo (enum)", en: "An enum type (enum)" },
                corretta: false
            },
            {
                testo: { it: "Una classe finale (final class)", en: "A final class (final class)" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Le classi astratte condividono stato (campi d'istanza), costruttori e codice comune tra classi imparentate, lasciando metodi abstract da completare alle sottoclassi. Le interfacce tradizionali non memorizzano stato: definiscono contratti di comportamento.",
            en: "Abstract classes share state (instance fields), constructors and common code between related classes, leaving abstract methods for subclasses to complete. Traditional interfaces don't hold state: they define behavior contracts."
        }
    },

    {
        id: 14,
        categoria: "random",
        argomento: { it: "Tracing dei riferimenti", en: "Reference tracing" },
        tipo: "sceltaMultipla",
        codice:
`class Counter {
    int value = 10;
}

public class TestReferences {
    public static void update(Counter c, int increment) {
        c.value += increment;
    }

    public static void main(String[] args) {
        Counter myCounter = new Counter();
        update(myCounter, 5);
        update(myCounter, 2);
        System.out.println(myCounter.value);
    }
}`,
        domanda: {
            it: "Cosa stampa l'ultima istruzione?",
            en: "What does the last instruction print?"
        },
        opzioni: [
            { testo: { it: "10", en: "10" }, corretta: false },
            { testo: { it: "15", en: "15" }, corretta: false },
            { testo: { it: "17", en: "17" }, corretta: true },
            { testo: { it: "27", en: "27" }, corretta: false }
        ],
        spiegazione: {
            it: "Il riferimento ricevuto punta all'OGGETTO reale: 10 + 5 = 15, poi 15 + 2 = 17. Java passa i parametri per valore ma il valore è una copia del riferimento: attraverso la copia si modifica lo stato dell'oggetto condiviso.",
            en: "The received reference points to the REAL object: 10 + 5 = 15, then 15 + 2 = 17. Java passes parameters by value, but the value is a copy of the reference: through it you can modify the shared object's state."
        }
    },

    {
        id: 15,
        categoria: "random",
        argomento: { it: "Incapsulamento (getter)", en: "Encapsulation (getters)" },
        tipo: "inserimento",
        codice:
`public class Book {
    private String title;

    public Book(String title) {
        this.title = title;
    }

    // COMPLETE: the getter method for 'title'
    public ______ getTitle() {
        return title;
    }
}`,
        domanda: {
            it: "Completa il codice: quale TIPO di ritorno va al posto di ______ nel metodo getter? (una parola)",
            en: "Complete the code: which RETURN TYPE goes instead of ______ in the getter method? (one word)"
        },
        rispostaAttesa: {
            accetta: ["String"]
        },
        spiegazione: {
            it: "L'incapsulamento protegge i campi con private: dall'esterno si accede in lettura con i getter (che restituiscono il TIPO del campo — qui String) e in scrittura con i setter.",
            en: "Encapsulation protects fields with private: externally you read via getters (returning the FIELD'S type — here String) and write via setters."
        }
    },

    // ========================================================
    // HTML/CSS — MAGENTA (10 esercizi)
    // ========================================================

    {
        id: 16,
        categoria: "magenta",
        argomento: { it: "Attributo alt", en: "The alt attribute" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "A cosa serve principalmente l'attributo alt all'interno del tag <img>?",
            en: "What is the main purpose of the alt attribute inside the <img> tag?"
        },
        opzioni: [
            {
                testo: {
                    it: "Definire l'altezza massima dell'immagine in pixel.",
                    en: "Defining the image's maximum height in pixels."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Fornire un testo alternativo descrittivo, utile all'accessibilità (screen reader) e nel caso l'immagine non venga caricata dal browser.",
                    en: "Providing a descriptive alternative text, useful for accessibility (screen readers) and when the image fails to load."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Creare un collegamento ipertestuale quando l'utente clicca sull'immagine.",
                    en: "Creating a hyperlink when the user clicks the image."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Comprimere il file dell'immagine per farlo caricare più velocemente.",
                    en: "Compressing the image file to make it load faster."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "alt = testo alternativo: fondamentale per chi naviga con screen reader e per capire cosa c'era nell'immagine se il file non viene trovato. L'altezza si imposta con height o CSS, il link con <a> attorno all'immagine, la compressione con formati/graphica.",
            en: "alt = alternative text: essential for screen reader users and to understand what the image was if the file isn't found. Height is set with height or CSS, links with <a>, compression via formats/graphics tools."
        }
    },

    {
        id: 17,
        categoria: "magenta",
        argomento: { it: "Accessibilità nei form", en: "Form accessibility" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale elemento HTML fondamentale si associa a un <input> per l'accessibilità, permettendo di cliccare sul testo descrittivo per selezionare il campo?",
            en: "Which fundamental HTML element is associated with an <input> for accessibility, letting users click the descriptive text to focus the field?"
        },
        opzioni: [
            {
                testo: { it: "<span class=\"label\">Text</span>", en: "<span class=\"label\">Text</span>" },
                corretta: false
            },
            {
                testo: { it: "<label>Text</label>", en: "<label>Text</label>" },
                corretta: true
            },
            {
                testo: { it: "<text>Text</text>", en: "<text>Text</text>" },
                corretta: false
            },
            {
                testo: { it: "<caption format=\"input\">Text</caption>", en: "<caption format=\"input\">Text</caption>" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "<label> si collega all'input tramite l'attributo for (o racchiudendo l'input stesso). <span> è generico e senza significato semantico, <text> non esiste (esiste <textarea>), <caption> è per le didascalie delle tabelle.",
            en: "<label> links to the input via the for attribute (or by wrapping the input). <span> is generic with no form semantics, <text> doesn't exist (<textarea> does), <caption> is for table captions."
        }
    },

    {
        id: 18,
        categoria: "magenta",
        argomento: { it: "Tag semantici HTML5", en: "HTML5 semantic tags" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Qual è il vantaggio principale dei tag semantici HTML5 (<article>, <section>, <nav>, <footer>) rispetto ai generici <div>?",
            en: "What is the main advantage of HTML5 semantic tags (<article>, <section>, <nav>, <footer>) over generic <div> tags?"
        },
        opzioni: [
            {
                testo: {
                    it: "Riducono la dimensione del CSS necessario per stilizzare la pagina.",
                    en: "They reduce the CSS size needed to style the page."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Danno un significato strutturale chiaro a browser e screen reader, migliorando accessibilità e SEO.",
                    en: "They provide clear structural meaning to browsers and screen readers, improving accessibility and SEO."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Adattano automaticamente immagini e testi alle dimensioni dello schermo (Responsive Design).",
                    en: "They automatically adapt images and text to screen size (Responsive Design)."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Sostituiscono completamente la necessità di classi e ID nel CSS.",
                    en: "They completely remove the need for classes and IDs in CSS."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "I tag semantici \"raccontano\" la funzione del contenuto: aiutano i motori di ricerca e permettono agli screen reader di navigare tra le sezioni (es. saltare al <nav>). Il responsive si ottiene con CSS (media queries, flex, grid), e classi/ID restano necessari.",
            en: "Semantic tags \"describe\" the content's role: they help search engines and let screen readers navigate sections (e.g. jump to <nav>). Responsiveness comes from CSS (media queries, flex, grid), and classes/IDs are still needed."
        }
    },

    {
        id: 19,
        categoria: "magenta",
        argomento: { it: "Box Model (box-sizing)", en: "Box model (box-sizing)" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "A cosa serve box-sizing: border-box; rispetto al comportamento predefinito (content-box)?",
            en: "What does box-sizing: border-box; do compared to the default behavior (content-box)?"
        },
        opzioni: [
            {
                testo: {
                    it: "Impedisce agli elementi di uscire dai margini dello schermo sui dispositivi mobili.",
                    en: "It prevents elements from overflowing the screen on mobile devices."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Include padding e bordo nelle larghezza/altezza dichiarate dell'elemento.",
                    en: "It includes padding and border inside the declared width/height of the element."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Converte automaticamente l'elemento in un contenitore Flexbox.",
                    en: "It automatically turns the element into a Flexbox container."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Raddoppia lo spazio dei margini esterni per centrare l'elemento.",
                    en: "It doubles the outer margins to center the element."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Con border-box, un elemento a width: 300px resta largo esattamente 300px anche con padding e bordi (calcolati \"dentro\"). I margini restano sempre esterni; il traboccare dipende da overflow/larghezze fisse; il flex si fa con display: flex.",
            en: "With border-box, an element at width: 300px stays exactly 300px even with padding and borders (calculated \"inside\"). Margins are always outside; overflow depends on overflow/fixed widths; flexing is done with display: flex."
        }
    },

    {
        id: 20,
        categoria: "magenta",
        argomento: { it: "Specificità dei selettori", en: "Selector specificity" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale selettore CSS ha la specificità più alta (vince in caso di conflitto di stili)?",
            en: "Which CSS selector has the highest specificity (wins style conflicts)?"
        },
        opzioni: [
            {
                testo: { it: "Un selettore di tag (es. h1)", en: "A tag selector (e.g. h1)" },
                corretta: false
            },
            {
                testo: { it: "Un selettore universale (es. *)", en: "A universal selector (e.g. *)" },
                corretta: false
            },
            {
                testo: { it: "Un selettore di classe (es. .mio-testo)", en: "A class selector (e.g. .my-text)" },
                corretta: false
            },
            {
                testo: { it: "Un selettore di ID (es. #principale)", en: "An ID selector (e.g. #main)" },
                corretta: true
            }
        ],
        spiegazione: {
            it: "Gerarchia di specificità: ID > classe > tag; il selettore universale vale zero. Sopra tutto c'è solo !important (da usare con parsimonia, non come stile di vita).",
            en: "Specificity hierarchy: ID > class > tag; the universal selector is worth zero. Only !important outranks them (use it sparingly, not as a lifestyle)."
        }
    },

    {
        id: 21,
        categoria: "magenta",
        argomento: { it: "Posizionamento CSS", en: "CSS positioning" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale valore di position rimuove un elemento dal flusso normale posizionandolo rispetto al suo primo genitore posizionato?",
            en: "Which position value removes an element from normal flow, placing it relative to its nearest positioned ancestor?"
        },
        opzioni: [
            {
                testo: { it: "position: relative;", en: "position: relative;" },
                corretta: false
            },
            {
                testo: { it: "position: static;", en: "position: static;" },
                corretta: false
            },
            {
                testo: { it: "position: absolute;", en: "position: absolute;" },
                corretta: true
            },
            {
                testo: { it: "position: fixed;", en: "position: fixed;" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "absolute estrae l'elemento dal flusso (gli altri lo ignorano) e lo ancora al primo antenato posizionato (relative/absolute/fixed); se non esiste, rispetto al viewport. relative resta nel flusso e sposta solo visivamente; static è il default; fixed è rigido rispetto alla finestra.",
            en: "absolute pulls the element out of the flow (others ignore it) and anchors it to the nearest positioned ancestor (relative/absolute/fixed), or the viewport if none. relative stays in the flow and only shifts visually; static is the default; fixed is rigid to the window."
        }
    },

    {
        id: 22,
        categoria: "magenta",
        argomento: { it: "Flexbox justify-content", en: "Flexbox justify-content" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "In un contenitore display: flex;, a cosa serve justify-content: center;?",
            en: "In a display: flex; container, what does justify-content: center; do?"
        },
        opzioni: [
            {
                testo: {
                    it: "Centra verticalmente gli elementi sull'asse trasversale (cross axis).",
                    en: "Centers children vertically along the cross axis."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Centra orizzontalmente gli elementi lungo l'asse principale (con direction di default).",
                    en: "Centers children horizontally along the main axis (default direction)."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Distribuisce uniformemente lo spazio tra gli elementi con margini automatici.",
                    en: "Distributes space evenly between items with automatic margins."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Dispone gli elementi in colonna anziché in riga.",
                    en: "Arranges children in a column instead of a row."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "L'asse principale è orizzontale di default: justify-content allinea lungo l'asse principale, center li al centro blocco. L'asse trasversale è align-items; la distribuzione uniforme è space-between/space-around; la direzione colonna è flex-direction.",
            en: "The main axis is horizontal by default: justify-content aligns along it, center places items at the block center. The cross axis is align-items; even distribution is space-between/space-around; columns come from flex-direction."
        }
    },

    {
        id: 23,
        categoria: "magenta",
        argomento: { it: "Colori RGBA", en: "RGBA colors" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale dichiarazione rappresenta correttamente un colore semi-trasparente (opacità 50%) in formato RGBA?",
            en: "Which declaration correctly represents a semi-transparent color (50% opacity) in RGBA format?"
        },
        opzioni: [
            {
                testo: { it: "color: rgba(255, 0, 0, 0.5);", en: "color: rgba(255, 0, 0, 0.5);" },
                corretta: true
            },
            {
                testo: { it: "color: rgb(255, 0, 0 / 50px);", en: "color: rgb(255, 0, 0 / 50px);" },
                corretta: false
            },
            {
                testo: { it: "color: transparent-red(255, 0, 0, 50%);", en: "color: transparent-red(255, 0, 0, 50%);" },
                corretta: false
            },
            {
                testo: { it: "color: opacity: 0.5(255, 0, 0);", en: "color: opacity: 0.5(255, 0, 0);" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "rgba(Rosso, Verde, Blu, Alfa): i canali 0-255 e l'Alpha 0-1, con 0.5 = 50% di trasparenza. I canali si scrivono separati da virgole: transparent-red(...) e opacity:0.5(...) sono sintassi inesistenti in CSS.",
            en: "rgba(Red, Green, Blue, Alpha): channels 0-255 and Alpha 0-1, with 0.5 = 50% transparency. Pixels have nothing to do with colors, while transparent-red and opacity:0.5(...) are non-existent CSS syntaxes."
        }
    },

    {
        id: 24,
        categoria: "magenta",
        argomento: { it: "Combinatori CSS", en: "CSS combinators" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Cosa seleziona esattamente il selettore CSS div > p (il simbolo maggiore)?",
            en: "What exactly does the CSS selector div > p (the greater-than symbol) select?"
        },
        opzioni: [
            {
                testo: {
                    it: "Tutti i <p> dentro un <div>, a qualsiasi profondità di annidamento.",
                    en: "All <p> inside a <div>, at any nesting depth."
                },
                corretta: false
            },
            {
                testo: {
                    it: "I soli <p> che sono figli diretti (di primo livello) di un <div>.",
                    en: "Only the <p> elements that are direct (first-level) children of a <div>."
                },
                corretta: true
            },
            {
                testo: {
                    it: "I soli <div> che si trovano immediatamente prima di un <p>.",
                    en: "Only the <div> elements right before a <p>."
                },
                corretta: false
            },
            {
                testo: {
                    it: "I <p> che condividono lo stesso genitore con un <div>.",
                    en: "The <p> elements sharing a parent with a <div>."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Il combinatore di figlio diretto (>) seleziona i figli immediati, escludendo i nipoti annidati interni. div p (spazio) prende TUTTI i discendenti; div + p è l'adiacente immediato; div ~ p sono i fratelli generali.",
            en: "The direct child combinator (>) selects immediate children only, excluding nested grandchildren. div p (space) takes ALL descendants; div + p is the immediate sibling; div ~ p are general siblings."
        }
    },

    {
        id: 25,
        categoria: "magenta",
        argomento: { it: "Pseudo-classe :hover", en: "The :hover pseudo-class" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "A cosa serve la pseudo-classe CSS :hover?",
            en: "What is the CSS :hover pseudo-class for?"
        },
        opzioni: [
            {
                testo: {
                    it: "Stilizzare un elemento quando il cursore del mouse ci passa sopra.",
                    en: "Styling an element when the mouse cursor hovers over it."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Cambiare lo stile quando l'elemento viene cliccato e tenuto premuto.",
                    en: "Changing the style while the element is clicked and held."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Selezionare l'elemento con il focus attivo da tastiera.",
                    en: "Selecting the element that currently has keyboard focus."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Nascondere automaticamente un elemento al caricamento della pagina.",
                    en: "Automatically hiding an element when the page loads."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: ":hover si attiva al passaggio del cursore (es. scurire un pulsante). Il clic prolungato è :active, il focus da tastiera è :focus, e il nascondere al caricamento non è una pseudo-classe nativa.",
            en: ":hover actively fires on cursor pass-over (e.g. darkening a button). Clicking-holding is :active, keyboard focus is :focus, and hiding on load is no native pseudo-class."
        }
    },

    // ========================================================
    // HTML/CSS — POOL RANDOM (5 esercizi, pescati dal materiale "tile")
    // ========================================================

    {
        id: 26,
        categoria: "magenta",
        argomento: { it: "Attributo target", en: "The target attribute" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Con <a href=\"...\" target=\"_blank\">, quale comportamento di default del browser?",
            en: "With <a href=\"...\" target=\"_blank\">, what is the default browser behavior?"
        },
        opzioni: [
            {
                testo: {
                    it: "Aprire il link in una nuova scheda (tab) o finestra, lasciando aperta la pagina originale.",
                    en: "Open the link in a new tab or window, keeping the original page open."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Scaricare direttamente il file sul computer dell'utente.",
                    en: "Download the file directly to the user's computer."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Aprire automaticamente il client di posta predefinito del dispositivo.",
                    en: "Automatically open the device's default email client."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Aprire una finestra modale a comparsa (pop-up).",
                    en: "Open a pop-up modal window."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "target=\"_blank\" manda la destinazione in una tab/finestra separata. Il download si forza con l'attributo download; l'email va protocollo mailto: in href; i modali pop-up sono roba di JavaScript, non di target.",
            en: "target=\"_blank\" sends the destination to a separate tab/window. Forced downloads use the download attribute; email uses mailto: in href; pop-up modals are JavaScript tools, not target."
        }
    },

    {
        id: 27,
        categoria: "random",
        argomento: { it: "Selettori composti e :hover", en: "Compound selectors and :hover" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale snippet CSS fa ENTRAMBE le cose: i link dentro .menu senza sottolineatura, e colore rosso SOLO al :hover?",
            en: "Which CSS snippet does BOTH: links inside .menu without underline, and red color ONLY on :hover?"
        },
        opzioni: [
            {
                codice: ".menu a {\n  text-decoration: none;\n}\n\n.menu a:hover {\n  color: red;\n}",
                testo: { it: "Snippet 1", en: "Snippet 1" },
                corretta: true
            },
            {
                codice: ".menu a {\n  color: red;\n}\n\n.menu a:hover {\n  text-decoration: none;\n}",
                testo: { it: "Snippet 2", en: "Snippet 2" },
                corretta: false
            },
            {
                codice: ".menu {\n  text-decoration: none;\n  color: red;\n}",
                testo: { it: "Snippet 3", en: "Snippet 3" },
                corretta: false
            },
            {
                codice: ".menu a {\n  text-decoration: none;\n  color: red;\n}",
                testo: { it: "Snippet 4", en: "Snippet 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: ".menu a indica i link DENTRO .menu. Lo snippet 1 toglie la sottolineatura sempre e colora di rosso solo all':hover. Il 2 inverte gli effetti, il 3 mette le regole sul <nav> e non sui link, il 4 rende i link sempre rossi anche senza hover.",
            en: ".menu a targets links INSIDE .menu. Snippet 1 removes the underline always and colors red only on :hover. Snippet 2 inverts the effects, Snippet 3 targets the <nav> not the links, and Snippet 4 makes links red always, not just on hover."
        }
    },

    {
        id: 28,
        categoria: "random",
        argomento: { it: "Media queries", en: "Media queries" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "La .card ha sfondo white. Quale snippet rende lo sfondo lightblue a partire da una larghezza di schermo MINIMA di 768px?",
            en: "The .card has a white background. Which snippet makes it lightblue starting from a MINIMUM screen width of 768px?"
        },
        opzioni: [
            {
                codice: ".card {\n  background-color: white;\n}\n\n@media (min-width: 768px) {\n  .card {\n    background-color: lightblue;\n  }\n}",
                testo: { it: "Snippet 1", en: "Snippet 1" },
                corretta: true
            },
            {
                codice: ".card { background-color: lightblue; }\n\n@media (min-width: 768px) {\n  .card { background-color: white; }\n}",
                testo: { it: "Snippet 2", en: "Snippet 2" },
                corretta: false
            },
            {
                codice: "@media (max-width: 768px) {\n  .card { background-color: lightblue; }\n}",
                testo: { it: "Snippet 3", en: "Snippet 3" },
                corretta: false
            },
            {
                codice: ".card { background-color: lightblue; }",
                testo: { it: "Snippet 4", en: "Snippet 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "@media (min-width: 768px) è una regola condizionale: applica il codice racchiuso solo se il viewport è di ALMENO 768px. Sotto quella soglia la .card resta bianca; il min-width\" minimo\" è esattamente la soglia richiesta dal testo.",
            en: "@media (min-width: 768px) is a conditional rule: it applies the enclosed code only if the viewport is AT LEAST 768px. Below the threshold the .card stays white; min-width (\"minimum\") is exactly what the requirement asks for."
        }
    },

    {
        id: 29,
        categoria: "random",
        argomento: { it: "Posizionamento assoluto in card", en: "Absolute positioning in cards" },
        tipo: "inserimento",
        codice:
`/* QUESTION: which position VALUE goes on .card
   to make the badge's positioning valid? */

.card {
  position: ______;   /* ANCHOR: reference for the absolutely positioned child */
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4757;
}`,
        domanda: {
            it: "Completa il codice: quale VALORE di position va su .card perché .badge (position: absolute) si agganci all'angolo della CARD e non dello schermo? (una parola)",
            en: "Complete the code: which position VALUE goes on .card so that .badge (position: absolute) anchors to the CARD's corner instead of the screen? (one word)"
        },
        rispostaAttesa: {
            accetta: ["relative"]
        },
        spiegazione: {
            it: "absolute posiziona rispetto al primo antenato POSIZIONATO: la .card deve avere position: relative per fare da riferimento. Con top: 10px e right: 10px il badge si aggancia millimetricamente all'angolo alto destro della card.",
            en: "absolute positions relative to the nearest POSITIONED ancestor: .card must have position: relative to become the reference. With top: 10px and right: 10px the badge clips cleanly to the card's top-right corner."
        }
    },

    {
        id: 30,
        categoria: "random",
        argomento: { it: "Transizioni fluide", en: "Smooth transitions" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Un bottone deve cambiare colore sfondo con effetto morbido (mezzo secondo) al :hover. Dove va la dichiarazione di transition e come si scrive?",
            en: "A button must softly change its background color over half a second on :hover. Where does the transition declaration go and how is it written?"
        },
        opzioni: [
            {
                testo: {
                    it: "Nella regola BASE del bottone: transition: background-color 0.4s ease;",
                    en: "In the button's BASE rule: transition: background-color 0.4s ease;"
                },
                corretta: true
            },
            {
                testo: {
                    it: "Solo dentro il selettore :(hover): transition: background-color 0.4s ease;",
                    en: "Only inside the :hover selector: transition: background-color 0.4s ease;"
                },
                corretta: false
            },
            {
                testo: {
                    it: "Nell'attributo HTML del bottone come style in linea.",
                    en: "In the button's HTML attribute as an inline style."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Nella regola del body così vale per tutti i bottoni.",
                    en: "In the body rule so it applies to all buttons."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "La transition va DICHIARARE Nello stato di PARTENZA (la classe base, non il :hover): così l'animazione è fluida in andata E in ritorno. 0.4s è la durata, ease definisce la curva di accelerazione. Nel :hover-only, l'uscita scatta bruscamente.",
            en: "The transition goes in the STARTING state (the base class, not :hover): that way the animation is smooth both ways. 0.4s is the duration, ease is the easing curve. Hover-only makes the exit snap abruptly."
        }
    },

    // ========================================================
    // SQL — GOLD (10 esercizi)
    // ========================================================

    {
        id: 31,
        categoria: "gold",
        argomento: { it: "Sporcature di letture in transazioni", en: "Read anomalies in transactions" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Nelle transazioni concorrenti SQL, qual è la definizione corretta di Phantom Read (lettura fantasma)?",
            en: "In concurrent SQL transactions, what is the correct definition of Phantom Read?"
        },
        opzioni: [
            {
                testo: {
                    it: "Una transazione legge dati modificati da un'altra transazione poi sottoposta a rollback.",
                    en: "A transaction reads data modified by another transaction that was later rolled back."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Una transazione legge due volte le stesse righe e trova valori di colonne cambiati da un update.",
                    en: "A transaction reads the same rows twice and finds column values changed by an update."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Una query a intervallo (es. WHERE età > 30) eseguita due volte trova NUOVE righe inserite da un'altra transazione, che soddisfano quell'intervallo.",
                    en: "A range query (e.g. WHERE age > 30) run twice finds NEW rows inserted by another transaction that satisfy that range."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Due transazioni scrivono sulla stessa riga e si bloccano a vicenda in un circolo vizioso.",
                    en: "Two transactions write to the same row and block each other in a circle."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Phantom Read = righe \"fantasma\" extra (o mancanti) tra due letture a intervallo, per INSERT/DELETE concorrenti. Modifica di valori = Non-Repeatable Read; lettura di dati poi annullati con rollback = Dirty Read; blocco incrociato = Deadlock.",
            en: "Phantom Read = extra (or missing) \"ghost\" rows between two range reads, caused by concurrent INSERT/DELETE. Changed values = Non-Repeatable Read; reading rolled-back data = Dirty Read; mutual blocking = Deadlock."
        }
    },

    {
        id: 32,
        categoria: "gold",
        argomento: { it: "LIKE e wildcard", en: "LIKE and wildcards" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale query trova tutti i clienti il cui nome INIZIA con la lettera \"M\"?",
            en: "Which query finds all customers whose name STARTS with \"M\"?"
        },
        opzioni: [
            {
                testo: { it: "WHERE Name = 'M%'", en: "WHERE Name = 'M%'" },
                corretta: false
            },
            {
                testo: { it: "WHERE Name LIKE 'M%'", en: "WHERE Name LIKE 'M%'" },
                corretta: true
            },
            {
                testo: { it: "WHERE Name LIKE '%M'", en: "WHERE Name LIKE '%M'" },
                corretta: false
            },
            {
                testo: { it: "WHERE Name CONTAIN 'M'", en: "WHERE Name CONTAIN 'M'" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "LIKE cerca con wildcard: % = qualsiasi sequenza di caratteri. 'M%' = inizia con M; '%M' finisce con M; l'uguale (=) cerca una corrispondenza esatta; CONTAIN non è una parola chiave SQL standard per questo scopo.",
            en: "LIKE searches with wildcards: % = any sequence of characters. 'M%' starts with M; '%M' ends with M; = searches an exact match; CONTAIN is not a standard SQL keyword for this purpose."
        }
    },

    {
        id: 33,
        categoria: "gold",
        argomento: { it: "ORDER BY", en: "ORDER BY" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Come si ordina il risultato di una query in modo DECRESCENTE (dal più grande al più piccolo, o Z→A)?",
            en: "How do you sort a query's results in DESCENDING order (largest to smallest, or Z→A)?"
        },
        opzioni: [
            {
                testo: { it: "Aggiungendo SORT DESC alla fine della query", en: "Adding SORT DESC at the end of the query" },
                corretta: false
            },
            {
                testo: { it: "Aggiungendo ORDER BY colonna DESC alla fine della query", en: "Adding ORDER BY column DESC at the end of the query" },
                corretta: true
            },
            {
                testo: { it: "Aggiungendo REVERSE prima del nome della colonna nella SELECT", en: "Adding REVERSE before the column name in the SELECT" },
                corretta: false
            },
            {
                testo: { it: "SQL ordina sempre in decrescente di default", en: "SQL always sorts descending by default" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "ORDER BY + nome colonna è la clausola di ordinamento; di default è ASC (crescente), per il decrescente si aggiunge DESC. SORT non esiste in SQL; REVERSE è una funzione per stringhe (inverte \"CIAO\" in \"OAIC\"), non riguarda le righe.",
            en: "ORDER BY + column name is the sorting clause; by default is ASC (ascending) and DESC makes it descending. SORT doesn't exist in SQL; REVERSE is a string function (flips \"CIAO\" into \"OAIC\"), not about row order."
        }
    },

    {
        id: 34,
        categoria: "gold",
        argomento: { it: "DDL vs DML", en: "DDL vs DML" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Qual è la differenza fondamentale tra comandi DDL (Data Definition Language) e DML (Data Manipulation Language)?",
            en: "What is the fundamental difference between DDL (Data Definition Language) and DML (Data Manipulation Language) commands?"
        },
        opzioni: [
            {
                testo: {
                    it: "DDL interroga i dati (SELECT), DML crea le tabelle.",
                    en: "DDL queries the data (SELECT), DML creates the tables."
                },
                corretta: false
            },
            {
                testo: {
                    it: "DDL gestisce la struttura (CREATE, ALTER, DROP), DML gestisce i dati nelle tabelle (INSERT, UPDATE, DELETE).",
                    en: "DDL manages structure (CREATE, ALTER, DROP), DML manages the data inside tables (INSERT, UPDATE, DELETE)."
                },
                corretta: true
            },
            {
                testo: {
                    it: "DDL è più veloce dei DML perché non passa dal motore di transazioni.",
                    en: "DDL is faster than DML because it bypasses the transaction engine."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Non c'è differenza, sono sinonimi usati da DBMS diversi.",
                    en: "No difference, they are synonyms used by different DBMSs."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "DDL definisce LA FORMA del database (tabelle, colonne, tipi); DML manipola IL CONTENUTO (le righe di dati). SELECT è DML; CREATE/ALTER/DROP sono DDL.",
            en: "DDL defines the database's SHAPE (tables, columns, types); DML manipulates the CONTENT (the data rows). SELECT is DML; CREATE/ALTER/DROP are DDL."
        }
    },

    {
        id: 35,
        categoria: "gold",
        argomento: { it: "Primary Key vs UNIQUE", en: "Primary Key vs UNIQUE" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Qual è la differenza teorica principale tra una Primary Key e un vincolo UNIQUE su una colonna?",
            en: "What is the main theoretical difference between a Primary Key and a UNIQUE constraint on a column?"
        },
        opzioni: [
            {
                testo: {
                    it: "La Primary Key accetta valori NULL, la UNIQUE no.",
                    en: "The Primary Key accepts NULL values, UNIQUE doesn't."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Una tabella può avere UNA sola Primary Key (anche su più colonne) e perdi UNIQUE; la Primary Key non ammette MAI NULL.",
                    en: "A table can have ONE Primary Key (possibly across multiple columns) and MANY UNIQUE constraints; the Primary Key never allows NULL."
                },
                corretta: true
            },
            {
                testo: {
                    it: "La PK serve solo per le relazioni, la Unique solo per ordinare i dati.",
                    en: "The PK is only for relations, UNIQUE only for sorting data."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Sono esattamente la stessa cosa con nomi diversi nei database.",
                    en: "They are exactly the same thing with different database names."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Entrambe garantiscono unicità. La PK identifica univocamente la riga e VIETA i NULL; UNIQUE garantisce l'unicità ma nella maggior parte dei DBMS ammette almeno un NULL. La differenza vera è la regola sui NULL, non la logica dell'unicità.",
            en: "Both guarantee uniqueness. The PK uniquely identifies the row and FORBIDS NULLs; UNIQUE guarantees uniqueness but in most DBMSs allows at least one NULL. Different NULL rules, not different common sense."
        }
    },

    {
        id: 36,
        categoria: "gold",
        argomento: { it: "Viste (View)", en: "Views" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Che cos'è concettualmente una Vista (View) in un database relazionale?",
            en: "What is a View conceptually in a relational database?"
        },
        opzioni: [
            {
                testo: {
                    it: "Una tabella fisica nascosta che duplica i dati per i backup.",
                    en: "A hidden physical table duplicating data for backups."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Una tabella virtuale basata sulla query SQL salvata: non memorizza dati autonomamente, ma mostra i dati delle tabelle sottostanti a ogni interrogazione.",
                    en: "A virtual table based on the saved SQL query: it stores no data itself but shows the underlying tables' data every time it's queried."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Un'interfaccia grafica per inserire dati senza tastiera.",
                    en: "A graphical interface to enter data without a keyboard."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Un file di testo sul computer con lo storico delle ricerche.",
                    en: "A text file on the computer with the search history."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Una vista è una \"finestra\" o macro: salvi una query complessa (es. unione di 4 tabelle) dandole un nome. Quando la interroghi, il DB esegue la query sottostante al volo. Non occupa spazio dati: i dati restano nelle tabelle originali.",
            en: "A view is a \"window\" or macro: you save a complex query (e.g. joining 4 tables) under a name. When queried, the DB runs the underlying query on the fly. It spends no data space: data stays in the original tables."
        }
    },

    {
        id: 37,
        categoria: "gold",
        argomento: { it: "UPDATE senza WHERE", en: "UPDATE without WHERE" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Qual è il rischio principale di questa query? UPDATE users SET status = 'Active';",
            en: "What is the main risk of this query? UPDATE users SET status = 'Active';"
        },
        opzioni: [
            {
                testo: {
                    it: "Genera un errore di sintassi perché manca WHERE.",
                    en: "It throws a syntax error because WHERE is missing."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Aggiorna lo stato a 'Attivo' di TUTTI gli utenti, senza filtri.",
                    en: "It updates the status to 'Active' for ALL users, no filtering."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Cancella tutti gli utenti dal database.",
                    en: "It deletes all users from the database."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Funziona correttamente solo con un solo utente in tabella.",
                    en: "It works correctly only when the table has a single user."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Senza clausola WHERE a fare da filtro, l'UPDATE si applica a TUTTE le righe della tabella. Errore classico da produzione: uno 1 o 1 milione di righe, tutte aggiornate. Il sintetizzatore: la sintassi è corretta, la semantica è pericolosa.",
            en: "Without a WHERE clause to filter, UPDATE applies to EVERY row in the table. Classic production mistake: 1 row or 1 million, all updated. The takeaway: syntax is correct, semantics are dangerous."
        }
    },

    {
        id: 38,
        categoria: "gold",
        argomento: { it: "Operatore BETWEEN", en: "The BETWEEN operator" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale query è equivalente a SELECT * FROM products WHERE price BETWEEN 10 AND 50?",
            en: "Which query is equivalent to SELECT * FROM products WHERE price BETWEEN 10 AND 50?"
        },
        opzioni: [
            {
                testo: { it: "WHERE price > 10 AND price < 50", en: "WHERE price > 10 AND price < 50" },
                corretta: false
            },
            {
                testo: { it: "WHERE price >= 10 AND price <= 50", en: "WHERE price >= 10 AND price <= 50" },
                corretta: true
            },
            {
                testo: { it: "WHERE price = 10 OR price = 50", en: "WHERE price = 10 OR price = 50" },
                corretta: false
            },
            {
                testo: { it: "WHERE price IN (10, 50)", en: "WHERE price IN (10, 50)" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "BETWEEN è INCLUSIVO: prende i valori compresi tra i due estremi, inclusi 10 e 50. Quindi >= 10 AND <= 50. I simboli stretti (> e <) escluderebbero 10 e 50 esatti; l'uguaglianza (=) o IN selezionano due soli valori.",
            en: "BETWEEN is INCLUSIVE: it takes values between the two extremes, including 10 and 50. So >= 10 AND <= 50. Strict symbols (> and <) would exclude 10 and 50 exactly; = or IN select only two values."
        }
    },

    {
        id: 39,
        categoria: "gold",
        argomento: { it: "Foreign Key", en: "Foreign Key" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "A cosa serve concettualmente una Foreign Key (chiave esterna)?",
            en: "What is a Foreign Key conceptually for?"
        },
        opzioni: [
            {
                testo: {
                    it: "A garantire l'integrità referenziale: impedisce dati orfani (es. un ordine con un cliente inesistente).",
                    en: "To guarantee referential integrity: it prevents orphan data (e.g. an order with a non-existent customer)."
                },
                corretta: true
            },
            {
                testo: {
                    it: "A collegare due database su server fisicamente distanti.",
                    en: "To link two databases on physically distant servers."
                },
                corretta: false
            },
            {
                testo: {
                    it: "A velocizzare automaticamente qualsiasi ricerca basata su date.",
                    en: "To automatically speed up any date-based search."
                },
                corretta: false
            },
            {
                testo: {
                    it: "A criptare le password salvate nelle tabelle collegate.",
                    en: "To encrypt passwords saved in linked tables."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "La chiave esterna è il \"ponte\" logico tra le tabelle e applica le regole del mondo reale: non puoi avere l'ordine di un cliente che non esiste. Server remoti = replica/link; performance = indici; crittografia = altro mondo.",
            en: "The foreign key is the logical \"bridge\" between tables and enforces real-world rules: you can't have an order for a customer that doesn't exist. Remote servers = replica/link; performance = indexes; encryption = another world."
        }
    },

    {
        id: 40,
        categoria: "gold",
        argomento: { it: "DELETE vs TRUNCATE", en: "DELETE vs TRUNCATE" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Qual è la differenza teorica e strutturale tra DELETE e TRUNCATE quando serve svuotare i dati di una tabella?",
            en: "What is the theoretical and structural difference between DELETE and TRUNCATE when emptying a table's data?"
        },
        opzioni: [
            {
                testo: {
                    it: "DELETE è DML: cancella riga per riga (logga e permette rollback); TRUNCATE è DDL: azzera la tabella istantaneamente svuotando le pagine di dati.",
                    en: "DELETE is DML: deletes row by row (logs and allows rollback); TRUNCATE is DDL: instantly clears the table by releasing data pages."
                },
                corretta: true
            },
            {
                testo: {
                    it: "DELETE elimina la tabella dal database, TRUNCATE cancella le righe mantenendo la struttura.",
                    en: "DELETE removes the table from the database, TRUNCATE deletes rows keeping the structure."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Sono la stessa cosa, ma TRUNCATE funziona solo su MySQL.",
                    en: "They are the same thing, but TRUNCATE only works on MySQL."
                },
                corretta: false
            },
            {
                testo: {
                    it: "DELETE non richiede permessi, TRUNCATE richiede i permessi di admin di sistema operativo.",
                    en: "DELETE doesn't need permissions, TRUNCATE requires OS admin permissions."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "DELETE è più lenta (riga per riga) e permette il rollback; TRUNCATE agisce a livello strutturale: dealloca le pagine di dati sul disco, drasticamente veloce ma difficile da annullare. Entrambe mantengono la struttura: per eliminare del tutto la tabella c'è DROP.",
            en: "DELETE is slower (row by row) and allows rollback; TRUNCATE acts structurally: it releases data pages on disk, drastically fast but hard to regret. Both keep the structure: dropping the table is DROP."
        }
    },

    // ========================================================
    // SQL — POOL RANDOM (5 esercizi, pescati dal materiale "tile")
    // ========================================================

    {
        id: 41,
        categoria: "random",
        argomento: { it: "WHERE e operatori logici", en: "WHERE and logical operators" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale query estrae i prodotti della categoria 'Elettronics' con prezzo superiore a 300.00?",
            en: "Which query extracts products from category 'Elettronics' priced above 300.00?"
        },
        opzioni: [
            {
                codice: "SELECT * FROM products\nWHERE category = 'Elettronics' AND price > 300.00;",
                testo: { it: "Query 1", en: "Query 1" },
                corretta: true
            },
            {
                codice: "SELECT * FROM products\nWHERE category = 'Elettronics' OR price > 300.00;",
                testo: { it: "Query 2", en: "Query 2" },
                corretta: false
            },
            {
                codice: "SELECT * FROM products\nWHERE price > 300.00;",
                testo: { it: "Query 3", en: "Query 3" },
                corretta: false
            },
            {
                codice: "SELECT * FROM products\nWHERE category = 'Elettronics';",
                testo: { it: "Query 4", en: "Query 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "WHERE filtra le righe; AND combina due condizioni che devono essere ENTRAMBE vere. L'OR (query 2) restituisce anche i prodotti di altra categoria con prezzo alto, o elettronici economici; le query 3 e 4 dimenticano una delle due condizioni.",
            en: "WHERE filters rows; AND combines two conditions that must BOTH be true. OR (query 2) also returns other-category products priced high, or cheap electronics; queries 3 and 4 forget one of the two conditions."
        }
    },

    {
        id: 42,
        categoria: "random",
        argomento: { it: "INNER JOIN", en: "INNER JOIN" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale query mostra il name del cliente e la DateOrder di tutti gli acquisti, unendo clients e orders?",
            en: "Which query shows the customer's name and the DateOrder of all purchases, joining clients and orders?"
        },
        opzioni: [
            {
                codice: "SELECT c.name, o.DateOrder\nFROM clients c\nINNER JOIN orders o\n    ON c.ID_clients = o.ID_clients;",
                testo: { it: "Query 1", en: "Query 1" },
                corretta: true
            },
            {
                codice: "SELECT c.name, o.DateOrder\nFROM clients c\nINNER JOIN orders o\n    ON o.ID_clients = o.ID_clients;",
                testo: { it: "Query 2", en: "Query 2" },
                corretta: false
            },
            {
                codice: "SELECT c.name, o.DateOrder\nFROM clients, orders\nWHERE DateOrder = name;",
                testo: { it: "Query 3", en: "Query 3" },
                corretta: false
            },
            {
                codice: "SELECT c.name, o.DateOrder\nFROM clients c\nINNER JOIN orders o\n    ON c.ID_clients = o.ID_Product;",
                testo: { it: "Query 4", en: "Query 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "INNER JOIN collega le tabelle sulla chiave comune (ID_clients, presente in ENTRAMBE: c.ID_clients = o.ID_clients). La query 2 confronta una colonna con se stessa (o.ID_clients = o.ID_clients, sempre vero), la 3 confronta campi di tipo differente, la 4 usa la chiave sbagliata.",
            en: "INNER JOIN links tables through the shared key (ID_clients, present in BOTH: c.ID_clients = o.ID_clients). Query 2 compares a column to itself (always true), query 3 compares fields of different meaning, query 4 uses the wrong key."
        }
    },

    {
        id: 43,
        categoria: "random",
        argomento: { it: "GROUP BY e SUM", en: "GROUP BY and SUM" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale query calcola la quantità TOTALE venduta per ogni singolo ID_Product?",
            en: "Which query computes the TOTAL quantity sold per single ID_Product?"
        },
        opzioni: [
            {
                codice: "SELECT ID_Product, SUM(Quantity) AS Total\nFROM orders\nGROUP BY ID_Product;",
                testo: { it: "Query 1", en: "Query 1" },
                corretta: true
            },
            {
                codice: "SELECT ID_Product, SUM(Quantity) AS Total\nFROM orders;",
                testo: { it: "Query 2", en: "Query 2" },
                corretta: false
            },
            {
                codice: "SELECT ID_Product, AVG(Quantity) AS Total\nFROM orders\nGROUP BY ID_Product;",
                testo: { it: "Query 3", en: "Query 3" },
                corretta: false
            },
            {
                codice: "SELECT SUM(Quantity) AS Total\nFROM orders\nGROUP BY ID_Product;",
                testo: { it: "Query 4", en: "Query 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "SUM(Quantity) somma le quantità; GROUP BY ID_Product fa calcolare la somma SEPARATAMENTE per ogni prodotto. AS Total rinomina l'intestazione della colonna. La query 2 manca GROUP BY (una somma unica), la 3 usa la media (AVG), la 4 non mostra l'ID_Product.",
            en: "SUM(Quantity) sums quantities; GROUP BY ID_Product computes the sum SEPARATELY per product. AS Total renames the column header. Query 2 lacks GROUP BY (one single total), query 3 uses the average (AVG), query 4 doesn't show ID_Product."
        }
    },

    {
        id: 44,
        categoria: "random",
        argomento: { it: "HAVING (filtro post-aggregazione)", en: "HAVING (post-aggregation filter)" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale query mostra SOLO gli ID_Product con quantità totale venduta MAGGIORE di 50?",
            en: "Which query shows ONLY the ID_Products with total quantity sold GREATER than 50?"
        },
        opzioni: [
            {
                codice: "SELECT ID_Product, SUM(Quantity) AS Total\nFROM orders\nGROUP BY ID_Product\nHAVING SUM(Quantity) > 50;",
                testo: { it: "Query 1", en: "Query 1" },
                corretta: true
            },
            {
                codice: "SELECT ID_Product, SUM(Quantity) AS Total\nFROM orders\nWHERE SUM(Quantity) > 50\nGROUP BY ID_Product;",
                testo: { it: "Query 2", en: "Query 2" },
                corretta: false
            },
            {
                codice: "SELECT ID_Product, AVG(Quantity) AS Total\nFROM orders\nGROUP BY ID_Product\nHAVING SUM(Quantity) > 50;",
                testo: { it: "Query 3", en: "Query 3" },
                corretta: false
            },
            {
                codice: "SELECT ID_Product, SUM(Quantity) AS Total\nFROM orders\nGROUP BY ID_Product;",
                testo: { it: "Query 4", en: "Query 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Il filtro su un'aggregazione NON può stare nel WHERE (che agisce PRIMA del raggruppamento): serve HAVING, che agisce DOPO il GROUP BY. La query 2 è sintatticamente invalida, la 3 calcola la media invece della somma, la 4 non filtra affatto.",
            en: "A filter on an aggregation CANNOT go in WHERE (which acts BEFORE grouping): you need HAVING, which acts AFTER the GROUP BY. Query 2 is syntactically invalid, query 3 averages instead of summing, query 4 has no filter at all."
        }
    },

    {
        id: 45,
        categoria: "random",
        argomento: { it: "JOIN multipli (tre tabelle)", en: "Multiple JOINs (three tables)" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale query mostra name del cliente, ProductName acquistato e DateOrder, collegando clients, orders e products?",
            en: "Which query shows the customer's name, the purchased ProductName, and DateOrder, joining clients, orders and products?"
        },
        opzioni: [
            {
                codice: "SELECT c.name, p.ProductName, o.DateOrder\nFROM orders o\nINNER JOIN clients c ON o.ID_clients = c.ID_clients\nINNER JOIN products p ON o.ID_Product = p.ID_Product;",
                testo: { it: "Query 1", en: "Query 1" },
                corretta: true
            },
            {
                codice: "SELECT c.name, p.ProductName, o.DateOrder\nFROM orders o\nINNER JOIN clients c ON o.ID_clients = o.ID_clients\nINNER JOIN products p ON o.ID_Product = o.ID_Product;",
                testo: { it: "Query 2", en: "Query 2" },
                corretta: false
            },
            {
                codice: "SELECT c.name, p.ProductName, o.DateOrder\nFROM orders o\nINNER JOIN clients c ON o.ID_clients = c.ID_clients;",
                testo: { it: "Query 3", en: "Query 3" },
                corretta: false
            },
            {
                codice: "SELECT c.name, p.ProductName, o.DateOrder\nFROM orders o\nINNER JOIN clients c ON o.ID_clients = p.ID_Product\nINNER JOIN products p ON o.ID_Product = c.ID_clients;",
                testo: { it: "Query 4", en: "Query 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Si parte dalla tabella centrale (orders) e si agganciano prima i clienti (tramite ID_clients) e poi i prodotti (tramite ID_Product), con DUE join e DUE condizioni ON vere. La query 2 confronta colonne con se stesse, la 3 dimentica i prodotti, la 4 scambia le chiavi.",
            en: "Start from the central table (orders), then join the customers first (via ID_clients) and the products second (via ID_Product), with TWO joins and TWO real ON conditions. Query 2 compares columns to themselves, query 3 forgets the products, query 4 swaps the keys."
        }
    },

    // ========================================================
    // BATTERIA EXTRA (aggiunta manuale) — id 46-54
    // ========================================================

    {
        id: 46,
        categoria: "magenta",
        argomento: { it: "Collegamenti interni (ancore)", en: "In-page links (anchors)" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Qual è la sintassi corretta in HTML per creare un collegamento che porti a una sezione della STESSA pagina, cioè a un elemento con id=\"contacts\"?",
            en: "Which HTML syntax creates a link that jumps to a section of the SAME page, i.e. an element with id=\"contacts\"?"
        },
        opzioni: [
            { testo: { it: "<a href=\"contacts.html\">Go to contacts</a>", en: "<a href=\"contacts.html\">Go to contacts</a>" }, corretta: false },
            { testo: { it: "<a href=\"#contacts\">Go to contacts</a>", en: "<a href=\"#contacts\">Go to contacts</a>" }, corretta: true },
            { testo: { it: "<a link=\"contacts\">Go to contacts</a>", en: "<a link=\"contacts\">Go to contacts</a>" }, corretta: false },
            { testo: { it: "<a target=\"contacts\">Go to contacts</a>", en: "<a target=\"contacts\">Go to contacts</a>" }, corretta: false }
        ],
        spiegazione: {
            it: "Il cancelletto (#) seguito dall'id dell'elemento dice al browser di cercare un'ancora DENTRO la pagina corrente, portando la visuale su di essa. L'opzione 1 cerca di aprire un file esterno contacts.html; le opzioni 3 e 4 usano attributi (link, target) che non definiscono alcuna destinazione interna.",
            en: "The hash (#) followed by the element's id tells the browser to look for an anchor INSIDE the current page, scrolling the view to it. Option 1 tries to open an external contacts.html file; options 3 and 4 use attributes (link, target) that define no internal destination."
        }
    },

    {
        id: 47,
        categoria: "gold",
        argomento: { it: "Query del valore massimo", en: "Queries for the maximum value" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "La tabella employees ha le colonne name e salary. Quale query estrae il nome dell'impiegato con lo stipendio PIÙ alto (assumendo un unico valore massimo)?",
            en: "The employees table has the columns name and salary. Which query extracts the name of the employee with the HIGHEST salary (assuming a single maximum value)?"
        },
        opzioni: [
            {
                codice: "SELECT name\nFROM employees\nORDER BY salary ASC\nLIMIT 1;",
                testo: { it: "Query 1", en: "Query 1" },
                corretta: false
            },
            {
                codice: "SELECT MAX(name)\nFROM employees;",
                testo: { it: "Query 2", en: "Query 2" },
                corretta: false
            },
            {
                codice: "SELECT name\nFROM employees\nORDER BY salary DESC\nLIMIT 1;",
                testo: { it: "Query 3", en: "Query 3" },
                corretta: true
            },
            {
                codice: "SELECT name\nFROM employees\nWHERE salary = MIN(salary);",
                testo: { it: "Query 4", en: "Query 4" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Ordinando gli stipendi in DECRESCENTE (ORDER BY salary DESC) e prendendo solo la prima riga con LIMIT 1, si ottiene il nome dell'impiegato con lo stipendio massimo. La query 1 ordina in CRESCENTE (ASC): estrae il minimo. La query 2 applica MAX a una colonna di testo (name): privo di senso logico ed economico. La query 4 cerca MIN(salary), cioè lo stipendio MINIMO.",
            en: "Sorting salaries in DESCENDING order (ORDER BY salary DESC) and taking only the first row with LIMIT 1 yields the name of the employee with the highest salary. Query 1 sorts ASCENDING (ASC): it extracts the minimum. Query 2 applies MAX to a text column (name): logically and economically meaningless. Query 4 looks for MIN(salary), i.e. the LOWEST salary."
        }
    },

    {
        id: 48,
        categoria: "random",
        argomento: { it: "Terminale Linux: elenco file", en: "Linux terminal: listing files" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Nei sistemi Linux, quale comando da terminale mostra l'elenco dei file e delle cartelle presenti nella directory corrente?",
            en: "On Linux systems, which terminal command lists the files and folders in the current directory?"
        },
        opzioni: [
            { testo: { it: "dir", en: "dir" }, corretta: false },
            { testo: { it: "show", en: "show" }, corretta: false },
            { testo: { it: "ls", en: "ls" }, corretta: true },
            { testo: { it: "list", en: "list" }, corretta: false }
        ],
        spiegazione: {
            it: "ls (abbreviazione di list) è il comando nativo standard dei sistemi Unix e Linux per elencare il contenuto di una cartella. dir è il comando storico del prompt MS-DOS / Windows; show e list non sono comandi nativi standard della shell Linux per questa operazione.",
            en: "ls (short for list) is the standard native command on Unix and Linux systems to list the contents of a folder. dir is the historical command of the MS-DOS / Windows prompt; show and list are not standard native Linux shell commands for this task."
        }
    },

    {
        id: 49,
        categoria: "random",
        argomento: { it: "PreparedStatement e sicurezza", en: "PreparedStatement and security" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "In applicazioni Java che dialogano con un database tramite JDBC, perché è fortemente consigliato un PreparedStatement al posto di un normale Statement?",
            en: "In Java applications that talk to a database through JDBC, why is a PreparedStatement strongly recommended over a plain Statement?"
        },
        opzioni: [
            {
                testo: {
                    it: "Perché rende il programma eseguibile senza bisogno di installare il driver JDBC.",
                    en: "Because it makes the program run without needing to install the JDBC driver."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Perché previene le vulnerabilità di tipo SQL Injection, separando la struttura della query dai dati inseriti dall'utente.",
                    en: "Because it prevents SQL Injection vulnerabilities by separating the query's structure from the user-supplied data."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Perché raddoppia automaticamente la velocità della RAM e del processore del server.",
                    en: "Because it automatically doubles the speed of the server's RAM and CPU."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Perché cancella automaticamente tutti i file temporanei alla chiusura del programma.",
                    en: "Because it automatically deletes all temporary files when the program closes."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Il PreparedStatement usa i segnaposto (?) e compila preventivamente il codice SQL: le stringhe malevole inserite dagli utenti (SQL Injection) vengono trattate rigorosamente come dati testuali e non possono alterare la logica del comando. Il driver JDBC resta comunque indispensabile; RAM e CPU non ricevono alcuna magia; i file temporanei non c'entrano nulla.",
            en: "A PreparedStatement uses placeholders (?) and pre-compiles the SQL code: malicious user-supplied strings (SQL Injection) are treated strictly as text data and cannot alter the command's logic. The JDBC driver is still required; RAM and CPU get no magic; temporary files have nothing to do with it."
        }
    },

    {
        id: 50,
        categoria: "random",
        argomento: { it: "Alimentatore (PSU)", en: "Power Supply Unit (PSU)" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "A cosa serve principalmente l'unità di alimentazione (PSU - Power Supply Unit) all'interno di un computer desktop?",
            en: "What is the main purpose of the Power Supply Unit (PSU) inside a desktop computer?"
        },
        opzioni: [
            {
                testo: {
                    it: "Elaborare i calcoli grafici in alta definizione per i videogiochi e i software 3D.",
                    en: "Processing high-definition graphics calculations for video games and 3D software."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Convertire la corrente alternata (AC) della presa a muro in corrente continua (DC) a basse tensioni stabili per i componenti interni.",
                    en: "Converting the wall outlet's alternating current (AC) into stable low-voltage direct current (DC) for the internal components."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Memorizzare permanentemente il sistema operativo, i programmi e i file personali dell'utente.",
                    en: "Permanently storing the operating system, programs and the user's personal files."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Raffreddare attivamente la CPU spingendo l'aria calda fuori dal case tramite ventole dedicate.",
                    en: "Actively cooling the CPU by pushing hot air out of the case with dedicated fans."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "L'alimentatore preleva la corrente alternata dalla presa e la converte nelle tensioni continue (+12V, +5V, +3.3V) necessarie a scheda madre, CPU, GPU e dischi. Il calcolo grafico è compito della GPU; la memorizzazione è degli HDD/SSD; il raffreddamento spettano a ventole, dissipatori e sistemi a liquido.",
            en: "The PSU takes alternating current from the outlet and converts it into the DC voltages (+12V, +5V, +3.3V) required by the motherboard, CPU, GPU and drives. Graphics processing is the GPU's job; storage belongs to HDDs/SSDs; cooling is handled by fans, heatsinks and liquid systems."
        }
    },

    {
        id: 51,
        categoria: "random",
        argomento: { it: "Scheda video (GPU)", en: "Graphics card (GPU)" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Qual è il compito principale di una GPU (Graphics Processing Unit) dedicata in un PC moderno?",
            en: "What is the main task of a dedicated GPU (Graphics Processing Unit) in a modern PC?"
        },
        opzioni: [
            {
                testo: {
                    it: "Gestire esclusivamente la connessione a Internet tramite cavo Ethernet o Wi-Fi.",
                    en: "Managing only the Internet connection via Ethernet cable or Wi-Fi."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Eseguire in parallelo milioni di calcoli matematici complessi, indispensabili per il rendering grafico 3D, i giochi e il machine learning.",
                    en: "Running millions of complex mathematical calculations in parallel, essential for 3D graphics rendering, games and machine learning."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Espandere la capacità della memoria RAM per aprire più schede del browser contemporaneamente.",
                    en: "Expanding the RAM capacity to open more browser tabs at the same time."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Monitorare la temperatura interna del case e spegnere il PC in caso di emergenza.",
                    en: "Monitoring the case's internal temperature and shutting down the PC in an emergency."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "La GPU è un chip specializzato nell'elaborazione rapida di immagini, pixel e poligoni tridimensionali; per la sua architettura fortemente parallela è oggi sfruttata anche da IA e simulazione scientifica. La rete sta al chip di rete; la RAM è sui banchi della scheda madre; il monitoraggio termico è di sensori BIOS/UEFI.",
            en: "The GPU is a chip specialized in the rapid processing of images, pixels and 3D polygons; thanks to its highly parallel architecture it is now also used for AI and scientific simulation. Networking belongs to the network chip; RAM lives in the motherboard's memory banks; thermal monitoring is handled by BIOS/UEFI sensors."
        }
    },

    {
        id: 52,
        categoria: "random",
        argomento: { it: "Periferiche di input e output", en: "Input and output devices" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Quale tra le seguenti combinazioni elenca ESCLUSIVAMENTE dispositivi di sola immissione (Input)?",
            en: "Which of the following combinations lists ONLY input devices?"
        },
        opzioni: [
            {
                testo: { it: "Monitor e stampante", en: "Monitor and printer" },
                corretta: false
            },
            {
                testo: { it: "Tastiera e mouse", en: "Keyboard and mouse" },
                corretta: true
            },
            {
                testo: { it: "Cuffie audio e casse acustiche", en: "Headphones and speakers" },
                corretta: false
            },
            {
                testo: { it: "Touchscreen e hard disk esterno", en: "Touchscreen and external hard drive" },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Tastiera e mouse servono unicamente a inviare dati e comandi dall'utente verso il computer. Monitor, stampante, cuffie e casse ricevono dati dal computer per mostrarli o riprodurli (Output); touchscreen e hard disk esterno sono bidirezionali (Input/Output).",
            en: "Keyboard and mouse are used only to send data and commands from the user to the computer. Monitors, printers, headphones and speakers receive data from the computer to display or play it (Output); touchscreens and external drives are bidirectional (Input/Output)."
        }
    },

    {
        id: 53,
        categoria: "random",
        argomento: { it: "Terminale Linux: pwd", en: "Linux terminal: pwd" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Nel terminale Linux, quale comando visualizza sullo schermo la directory di lavoro corrente (il percorso esatto in cui ti trovi)?",
            en: "In the Linux terminal, which command prints the current working directory (the exact path you are in)?"
        },
        opzioni: [
            { testo: { it: "ls", en: "ls" }, corretta: false },
            { testo: { it: "cd", en: "cd" }, corretta: false },
            { testo: { it: "pwd", en: "pwd" }, corretta: true },
            { testo: { it: "mkdir", en: "mkdir" }, corretta: false }
        ],
        spiegazione: {
            it: "pwd sta per Print Working Directory: stampa il percorso assoluto della cartella corrente. ls elenca file e cartelle; cd cambia cartella (Change Directory); mkdir ne crea una nuova (Make Directory).",
            en: "pwd stands for Print Working Directory: it prints the absolute path of the current folder. ls lists files and folders; cd changes folder (Change Directory); mkdir creates a new one (Make Directory)."
        }
    },

    {
        id: 54,
        categoria: "random",
        argomento: { it: "SSD e comando TRIM", en: "SSD and the TRIM command" },
        tipo: "sceltaMultipla",
        domanda: {
            it: "Nelle unità a stato solido (SSD), a cosa serve la funzione o il comando TRIM?",
            en: "In solid-state drives (SSDs), what is the TRIM function or command for?"
        },
        opzioni: [
            {
                testo: {
                    it: "Comprimere i file di grandi dimensioni per liberare spazio sul disco.",
                    en: "Compressing large files to free up disk space."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Indicare al disco quali blocchi di dati non sono più necessari (cancellati dall'utente), così il controller li pulisce preventivamente mantenendo alte le prestazioni in scrittura.",
                    en: "Telling the drive which data blocks are no longer needed (deleted by the user), so the controller cleans them in advance and keeps write performance high."
                },
                corretta: true
            },
            {
                testo: {
                    it: "Crittografare automaticamente tutti i dati personali per proteggerli dai virus.",
                    en: "Automatically encrypting all personal data to protect it from viruses."
                },
                corretta: false
            },
            {
                testo: {
                    it: "Raddoppiare la velocità della connessione Internet quando si scaricano file pesanti.",
                    en: "Doubling the Internet connection speed when downloading heavy files."
                },
                corretta: false
            }
        ],
        spiegazione: {
            it: "Negli SSD la scrittura su blocchi già usati richiede una pulizia preventiva: il TRIM avvisa in background il disco quali celle contengono file eliminati, così il disco le trova già pronte quando dovrà scriverci e non cala di prestazioni. La compressione è compito del sistema operativo; la crittografia usa strumenti dedicati (es. BitLocker); la connessione Internet non c'entra nulla con l'interno del disco.",
            en: "In SSDs, writing to previously used blocks requires a cleanup pass: TRIM warns the drive in the background which cells hold deleted files, so it finds them ready when it needs to write and does not slow down. Compression is the OS's job; encryption uses dedicated tools (e.g. BitLocker); the Internet connection has nothing to do with the drive's internals."
        }
    }

];

// ============================================================
// EXPORT per uso futuro in game.js (modulo ES)
// ============================================================

window.ESERCIZI = ESERCIZI;
