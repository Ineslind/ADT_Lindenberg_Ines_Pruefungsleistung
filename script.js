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
    let zufallsKategorie = Math.floor(Math.random() * wortspeicher.length);
    console.log(wortspeicher[zufallsKategorie].kategorie)    
    let zufallsWort = Math.floor(Math.random() * wortspeicher[zufallsKategorie].worte.length);
    console.log(wortspeicher[zufallsKategorie].worte[zufallsWort])    
}, 500)
