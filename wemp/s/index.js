let i

//navbar
let navbar = document.getElementsByTagName("nav")[0]
navbar.innerHTML =
    `<div class="container-fluid">
        <a class="navbar-brand h1 me-auto mb-0" href="#">WEBSITE OF E-MODUL PHYSICS</a>
        <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav ms-auto mb-lg-0" id="navbarList">
            </ul>
            <form class="input-group ms-auto mb-lg-0" style="width: fit-content;" role="search">
                <input class="form-control" type="search" placeholder="Temukan">
                <button class="btn btn-outline-secondary" type="submit">
                    <i class="bi bi-search"></i>
                </button>
            </form>
        </div> 
    </div>`

let navbarItem = [
    { name: "Beranda", link: "/beranda" },
    { name: "E-Modul", link: "/emodul" },
    { name: "Profil", link: "/profil" },
    { name: "Tentang Kami", link: "/admin" },
]

let navbarList = document.getElementById("navbarList")
function navbarLayout() {
    const template = document.createElement("template")
    template.innerHTML =
        `<li class="nav-item">
            <a class="nav-link me-3 mb-0 h2" href="${navbarItem[i].link}">${navbarItem[i].name}</a>
        </li>`
    return template.content.firstChild
}

for (i in navbarItem) {
    navbarList.append(navbarLayout())
}

//footer
let footer = document.getElementsByTagName("footer")
footer[0].innerHTML = 
    `<span class="ms-auto me-auto">Dibuat oleh
         <a href="mailto:h48ilihsan@gmail.com">Habil Ihsan</a>
        | Hak Cipta © 2024
    </span>`