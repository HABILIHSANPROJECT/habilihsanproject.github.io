let adsLink = document.querySelectorAll(".container-447c775022427997699b9223051cb580__link")
let adsPic = document.querySelectorAll(".container-447c775022427997699b9223051cb580__img")
let adsText = document.querySelectorAll(".container-447c775022427997699b9223051cb580__title")
for (let i = 0; i < adsText.length; i++) {
    const caption = adsText[i].innerHTML.toLowerCase()
    const block = ["judi", "slot", "gacor", "bet", "deposit", "slots", "parlay", "bola", "roulete", "petir", "jackpot", "kalah", "perjudian"]
    const split = caption.split(/\s+/)
    block.forEach((larang) => {
        const index = split.indexOf(larang)
        if (index !== -1) {
            adsLink[i].attributes[3].value = "https://bit.ly/FloAdventure"
            adsPic[i].style.backgroundImage = "url(https://pbs.twimg.com/media/Fs0j_P-akAE8Avy?format=jpg&name=large)"
            adsPic[i].style.backgroundSize = "contain"
            adsPic[i].style.backgroundColor = "purple"
            adsText[i].innerHTML = "Ayo berpetualang menuju Floniverse bareng Flora dan Adamas!"
        }
    })
}