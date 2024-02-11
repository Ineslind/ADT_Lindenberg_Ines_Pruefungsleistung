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

    console.log(zufallsKategorie, zufallsWort)
}, 500)

function ErstelleBuchstabenBlock(Bereich, Wort, Vorlage, Blind){

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

