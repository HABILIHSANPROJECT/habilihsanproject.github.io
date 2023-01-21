let html = document.getElementsByTagName("html")[0].dataset.bsTheme
let set = document.getElementById("setTheme").classList
let logo = document.getElementById("logo").classList
let footer = document.getElementById("footer").classList
function lightTheme() {
    set.add("mdi-weather-sunny")
    set.remove("mdi-weather-night")
    set.remove("white")
    logo.remove("white")
    footer.remove("white")
}
function darkTheme() {
    set.add("mdi-weather-night")
    set.remove("mdi-weather-sunny")
    set.add("white")
    logo.add("white")
    footer.add("white")
}
function setTheme() {
    let data = document.getElementsByTagName("html")[0].dataset.bsTheme
    if (data === "dark") {
        document.getElementsByTagName("html")[0].dataset.bsTheme = undefined
        localStorage.setItem("themes", "true")
        localStorage.setItem("theme", "undefined")
        document.getElementById("hibi").classList.remove("white")
        lightTheme()
    } else {
        document.getElementsByTagName("html")[0].dataset.bsTheme = "dark"
        localStorage.setItem("themes", "true")
        localStorage.setItem("theme", "dark")
        document.getElementById("hibi").classList.add("white")
        darkTheme()
    }
}
let getTheme = localStorage.getItem("themes")
if (getTheme == "true") {
    document.getElementsByTagName("html")[0].dataset.bsTheme = localStorage.getItem("theme")
    if (localStorage.getItem("theme") == "dark") {
        darkTheme()
    } else {
        lightTheme()
    }
} else {
    localStorage.clear()
}
let navbar_list = [
    { title: "HOME", to: "#" },
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