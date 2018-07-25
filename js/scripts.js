function expandHamburger() {
    var menu = document.getElementById("nav-menu-items");
    var hamburger = document.getElementById("hamburger");
    if (hamburger.className === "") {
        menu.style.opacity = "1";
        hamburger.className = "open";
    } else {
        menu.style.opacity = "0";
        hamburger.className = "";
    }
}