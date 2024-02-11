let Highscores = []
let aktuellerScore = 0
const maxLeben = 10
let Leben = maxLeben
let verwendeteWorte = [];
let zufallsKategorie = ""
let zufallsWort = ""
let Modus = "Training"

setTimeout(() => {
    
    document.querySelector(".Anweisung").classList.remove("versteckt"); 
    document.getElementById("Buttons").addEventListener("click", event => {
        if (event.target.id != "Buttons") {
            Modus = event.target.id
            
            const spielerName =  document.getElementById("SpielerInput").value
            document.querySelectorAll(".Spielername").forEach(e => {
                e.textContent = spielerName
            });
            
            BaueSpielfeld()
            TastaturBehandlung()
            WechsleSzene()
        }
    })
}, 500)

function WechsleSzene() {
    document.getElementById("IntroSzene").classList.toggle("ausgeblendet")
    document.getElementById("SpielSzene").classList.toggle("ausgeblendet")
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
        if (Wort.charAt(index) === " "){
            buchstabe.classList.add("leer")
        }
        if (!Blind) {
            buchstabe.textContent = Wort.charAt(index)
        }
        Bereich.appendChild(buchstabe);
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

function TastaturBehandlung() {
    document.getElementById("Tastatur").addEventListener("click", event => {
        const buchstabe = BenutzeTaste(event.target)
        if (buchstabe) {
            if (!RateBuchstabe(zufallsWort, buchstabe)) {
                Leben -= 1;
            }
            else if (Modus === "Training" && WortWurdeErraten()) {
                WechsleSzene();
                Leben = maxLeben;
            }
            else if (Modus === "Highscore" && WortWurdeErraten()) {
                aktuellerScore += 1;
                BaueSpielfeld();
            }
        }
    })
}