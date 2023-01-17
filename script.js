function theme() {
    let html = document.getElementsByTagName("html")[0].dataset.bsTheme
    let set = document.getElementById("setTheme").classList
    let logo = document.getElementById("logo").classList
    let footer = document.getElementById("footer").classList
    if (html === "dark") {
        document.getElementsByTagName("html")[0].dataset.bsTheme = undefined
        set.add("mdi-weather-sunny")
        set.remove("mdi-weather-night")
        set.remove("white")
        logo.remove("white")
        footer.remove("white")
        document.getElementById("hibi").classList.remove("white")
    } else {
        document.getElementsByTagName("html")[0].dataset.bsTheme = "dark"
        set.add("mdi-weather-night")
        set.remove("mdi-weather-sunny")
        set.add("white")
        logo.add("white")
        footer.add("white")
        document.getElementById("hibi").classList.add("white")
    }
}
let navbar_list = [
    { title: "HOME", to: "../index.html" },
    { title: "PROJECT", to: "./project.html" },
    { title: "PORTOFOLIO", to: "./portofolio.html" },
    { title: "ABOUT", to: "./about.html" }
]
let navbarList = document.querySelector("#navbarList")
let navbarLink = document.getElementById("navbarLink")
const navbar = data => {
    const template = document.createElement("template")
    template.innerHTML =
        `<li class="nav-item navItem" id="navbarItem">
        <a class="nav-link" id="navbarLink${navbar_list[i].title}" aria-current="page" href="${navbar_list[i].to}">${navbar_list[i].title}</a>
        </li>`
            .trim()
    return template.content.firstChild
}
for (i in navbar_list) {
    navbarList.append(navbar(0))
}
let title = document.getElementsByTagName("title")[0]
document.getElementById(`navbarLink${title.innerText}`).classList.add("active")
title.innerHTML = `habilihsanproject | ${title.innerText}`