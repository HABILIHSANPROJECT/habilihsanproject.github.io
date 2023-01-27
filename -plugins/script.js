var getTheme = localStorage.getItem("themes")
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
// NAVBAR
$.get("/-plugins/navbar.html", function(data){
    $("#navbar").replaceWith(data);
})
// THEME
var html = document.getElementsByTagName("html")[0].dataset.bsTheme
function lightTheme() {
    document.getElementById("setTheme").classList.add("mdi-weather-sunny")
    document.getElementById("setTheme").classList.remove("mdi-weather-night")
    document.getElementById("setTheme").classList.remove("white")
    document.getElementById("logo").classList.remove("white")
    document.getElementById("footer").classList.remove("white")
}
function darkTheme() {
    document.getElementById("setTheme").classList.add("mdi-weather-night")
    document.getElementById("setTheme").classList.remove("mdi-weather-sunny")
    document.getElementById("setTheme").classList.add("white")
    document.getElementById("logo").classList.add("white")
    document.getElementById("footer").classList.add("white")
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