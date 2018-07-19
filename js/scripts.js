function expandHamburger(){
    var menu = document.getElementById("right-menu");
    console.log(menu);
    if(menu.className === "right-groupped-menu"){
        menu.className += " responsive"
        var header = document.getElementById('header');
        header.style.display = 'block';
        var header = document.getElementById('introduction');
        header.style.display = 'none';
    }else{
        menu.className = "right-groupped-menu"
    }
}