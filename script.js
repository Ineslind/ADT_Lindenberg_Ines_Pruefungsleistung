setTimeout(() => {
    
    document.querySelector(".Anweisung").classList.remove("versteckt"); 
    document.getElementById("Start").addEventListener("click", event => {
        document.getElementById("IntroSzene").classList.add("ausgeblendet")
        document.getElementById("AnleitungSzene").classList.remove("ausgeblendet")
        
    })

}, 500)
