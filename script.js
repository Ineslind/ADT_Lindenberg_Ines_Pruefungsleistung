let Highscores = []
let aktuellerScore = 0
const maxLeben = 2
let verwendeteWorte = [];
let zufallsKategorie = ""
let zufallsWort = ""
let Modus = "Training"

setTimeout(() => {
    
    TastaturBehandlung()
    gehezuIntroSzene()

    Array.from(document.getElementsByClassName("Buttons")).forEach(buttons => {
        buttons.addEventListener("click", event => {
            if (event.target.classList.contains("StartBtn")) {
                gehezuIntroSzene()
            }
            else if (event.target.classList.contains("RanglisteBtn")) {
                gehezuRanglisteSzene()
            }
            else if (event.target.classList.contains("NochmalBtn")) {
                gehezuSpielSzene()
            }
            else if (event.target.classList.contains("TrainingBtn")) {
                Modus = "Training"
                gehezuSpielSzene()
            }
            else if (event.target.classList.contains("HighscoreBtn")) {
                Modus = "Highscore"
                gehezuSpielSzene()
            }
        })
    })
}, 500)

function gehezuIntroSzene() {
    Leben = maxLeben;
    document.querySelector(".Anweisung").classList.remove("versteckt"); 
    WechsleSzene("IntroSzene")
}

function gehezuSpielSzene() {
    ErsetzeNamensplatzhalter()
    BaueSpielfeld()
    BaueAnzeigen()
    WechsleSzene("SpielSzene")
}

function gehezuSpielendeSzene() {
    zeigeEndeNachricht();
    WechsleSzene("SpielendeSzene")
}

function gehezuRanglisteSzene() {
    WechsleSzene("RanglisteSzene")
}

function ErsetzeNamensplatzhalter() {
    const spielerName =  document.getElementById("SpielerInput").value || "Gast"
    document.querySelectorAll(".Spielername").forEach(e => {
        e.textContent = spielerName
    });
}

function WechsleSzene(Zielszene) {
    const idListe = Array.from(document.getElementsByClassName("Szene")).map(element => element.id);
    document.getElementById("Hintergrund").style.marginTop = idListe.findIndex(id => id === Zielszene) * (-100) + "vh"
}

function WortWurdeErraten() {
    let erraten = true;
    document.getElementById("LoesungsWort").querySelectorAll(".LoesungsBuchstabe").forEach(platzhalter => {
        if (platzhalter.textContent === "") {
            erraten = false;
        }
    })
    return erraten;
}

function RateBuchstabe(zufallsWort, buchstabe) {
    let fuendig = false;
    for (let index = 0; index < zufallsWort.length; index++) {
        if (zufallsWort.charAt(index) === buchstabe){
            document.getElementById("LoesungsWort").querySelectorAll(".LoesungsBuchstabe")[index].textContent = buchstabe
            fuendig = true
        }
    }
    return fuendig
}

function BenutzeTaste(taste) {
    if (taste.classList.contains("TastaturBuchstabe")){
        taste.classList.add("benutzt")
        return taste.textContent
    }
    else {
        return null;
    }
}

function ErstelleBuchstabenBlock(Bereich, Wort, Vorlage, Blind) {

    Bereich.innerHTML = "";

    for (let index = 0; index < Wort.length; index++) {
        const buchstabe = Vorlage.cloneNode();
        buchstabe.style.animationDelay = -Math.random()*1000 + "ms";
        buchstabe.style.duration = (800 + Math.random()*400) + "ms";
        if (Wort.charAt(index) === " "){
            buchstabe.classList.add("leer")
        }
        if (!Blind) {
            buchstabe.textContent = Wort.charAt(index)
        }
        Bereich.appendChild(buchstabe);
        setTimeout(() => buchstabe.classList.remove("durchsichtig"), 100);
    }
}

function LoseWort() {
    const zufallsKategorieIndex = Math.floor(Math.random() * wortspeicher.length);
    zufallsKategorie = (wortspeicher[zufallsKategorieIndex].kategorie)   

    const zufallsWortIndex = Math.floor(Math.random() * wortspeicher[zufallsKategorieIndex].worte.length);
    zufallsWort = wortspeicher[zufallsKategorieIndex].worte[zufallsWortIndex]

    if (verwendeteWorte.includes(zufallsWort)) {
        // Ich unterstelle, dass nie alle Worte verbraucht werden
        LoseWort()
    }
    zufallsWort = "ABC" 
    verwendeteWorte.push(zufallsWort);
}

function BaueSpielfeld() {
    LoseWort() 
    document.getElementById("Kategorie").textContent = "Gesucht ist " + zufallsKategorie

    ErstelleBuchstabenBlock(
        document.getElementById("LoesungsWort"),
        zufallsWort,
        document.getElementById("Vorlagen").querySelector(".LoesungsBuchstabe"),
        true
    )

    ErstelleBuchstabenBlock(
        document.getElementById("Tastatur"),
        "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ",
        document.getElementById("Vorlagen").querySelector(".TastaturBuchstabe"),
        false
    )
}

function BaueAnzeigen() {
    ErstelleBuchstabenBlock(
        document.getElementById("Leben"),
        "•".repeat(Leben),
        document.getElementById("Vorlagen").querySelector(".Ring"),
        true
    )
    zeigeSpielNachricht();
}

function TastaturBehandlung() {
    document.getElementById("Tastatur").addEventListener("click", event => {
        const buchstabe = BenutzeTaste(event.target)
        if (buchstabe) {
            if (!RateBuchstabe(zufallsWort, buchstabe)) {
                if (reduziereLeben() === 0) {
                    if (Modus === "Training") {
                        gehezuIntroSzene()
                    }
                    else {
                        gehezuSpielendeSzene()
                    }
                }
            }
            else if (Modus === "Training" && WortWurdeErraten()) {
                gehezuIntroSzene()
            }
            else if (Modus === "Highscore" && WortWurdeErraten()) {
                aktuellerScore += 1;
                zeigeSpielNachricht();
                BaueSpielfeld();
            }
        }
    })
}

function reduziereLeben() {
    Leben -= 1;
    document.getElementById("Leben").removeChild(
        document.getElementById("Leben").lastChild
    )
    return Leben;
}

function zeigeSpielNachricht() {
    if (Modus === "Training") {
        document.getElementById("SpielNachricht").textContent = "viel Spaß beim Training."
    }
    else {
        document.getElementById("SpielNachricht").textContent =
            "du hast " + 
            (
                aktuellerScore === 0 ? "noch keine Begriffe" :
                aktuellerScore === 1 ? "deinen ersten Begriff" :
                 "bereits " + aktuellerScore + " Begriffe" 
            ) +
            " erraten."
    }
}

function zeigeEndeNachricht() {
    document.getElementById("EndeNachricht").textContent = "das Spiel ist zuende"
}