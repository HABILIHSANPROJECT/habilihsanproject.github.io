// NAVBAR
$.get("https://habilihsanproject.github.io/source/plugins/navbar.html", function(data){
    $("#navbar").replaceWith(data)
})
// THEME
let html = document.getElementsByTagName("html")[0].dataset.bsTheme

let SetTheme = document.getElementById("setTheme").classList
let Logo = document.getElementById("logo").classList
let Footer = document.getElementById("footer").classList

function lightTheme() {
    SetTheme.replace("mdi-weather-night", "mdi-weather-sunny")
    SetTheme.classList.replace("light", "dark")
    Logo.replace("light", "dark")
    Footer.replace("light", "dark")
}
function darkTheme() {
    SetTheme.replace("mdi-weather-sunny", "mdi-weather-night")
    SetTheme.classList.replace("dark", "light")
    Logo.replace("dark", "light")
    Footer.classList.replace("dark", "light")
}
function setTheme() {
    let data = document.getElementsByTagName("html")[0].dataset.bsTheme
    if (data == "dark") {
        document.getElementsByTagName("html")[0].dataset.bsTheme = "undefined"
        lightTheme()
        localStorage.setItem("theme", "undefined")
        if (document.getElementById("hibi")) {
            document.getElementById("hibi").classList.replace("light", "dark")
        }
    } else {
        document.getElementsByTagName("html")[0].dataset.bsTheme = "dark"
        darkTheme()
        localStorage.setItem("theme", "dark")
        if (document.getElementById("hibi")) {
            document.getElementById("hibi").classList.replace("dark", "light")
        }
    }
}
addEventListener("load", () => {
var getTheme = localStorage.getItem("theme")
if (getTheme == "dark") {
    darkTheme()
    document.getElementsByTagName("html")[0].dataset.bsTheme = "dark"
    if (document.getElementById("hibi")) {
        document.getElementById("hibi").classList.replace("dark", "light")
    }
} else if (getTheme == "undefined") {
    lightTheme()
    document.getElementsByTagName("html")[0].dataset.bsTheme = "undefined"
    if (document.getElementById("hibi")) {
        document.getElementById("hibi").classList.replace("light", "dark")
    }
} else {
    localStorage.removeItem("theme")
}
})
/* NAVBAR
let navbar_list = [
    { title: "ARTICLE", to: "../pages/articles/index.html" },
    { title: "PROJECT", to: "../pages/index.html" },
    { title: "PORTOFOLIO", to: "../pages/portofolio.html" },
    { title: "ABOUT", to: "../pages/about.html" }
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
*/