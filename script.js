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

}, 500)
