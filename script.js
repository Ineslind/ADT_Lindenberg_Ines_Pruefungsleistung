let Highscores = []
let aktuellerScore = 0
let Leben = 10

setTimeout(() => {
    
    document.querySelector(".Anweisung").classList.remove("versteckt"); 
    document.getElementById("Start").addEventListener("click", event => {
        document.getElementById("IntroSzene").classList.add("ausgeblendet")
        document.getElementById("AnleitungSzene").classList.remove("ausgeblendet")
        
        const spielerName =  document.getElementById("SpielerInput").value
        document.querySelectorAll(".Spielername").forEach(e => {
            e.textContent = spielerName
        });
    })
    let zufallsKategorieIndex = Math.floor(Math.random() * wortspeicher.length);
    let zufallsKategorie = (wortspeicher[zufallsKategorieIndex].kategorie)   

    let zufallsWortIndex = Math.floor(Math.random() * wortspeicher[zufallsKategorieIndex].worte.length);
    let zufallsWort = wortspeicher[zufallsKategorieIndex].worte[zufallsWortIndex]

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
        
    document.getElementById("Tastatur").addEventListener("click", event => {
        const buchstabe = BenutzeTaste(event.target)
        if (buchstabe) {
            RateBuchstabe(zufallsWort, buchstabe)
        }
    })


    console.log(zufallsKategorie, zufallsWort)
}, 500)

function RateBuchstabe(zufallsWort, buchstabe) {
    for (let index = 0; index < zufallsWort.length; index++) {
        if (zufallsWort.charAt(index) === buchstabe){
            document.getElementById("LoesungsWort").querySelectorAll(".LoesungsBuchstabe")[index].textContent = buchstabe
        }
    }
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

