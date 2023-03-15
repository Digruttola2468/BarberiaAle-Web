const iconMenu = document.querySelector(".fa-bars");
const divIconMenu = document.querySelector(".items-barberia");

iconMenu.addEventListener('click',e => {
    if(iconMenu.classList.contains("fa-bars")){
        iconMenu.classList.remove("fa-bars");
        iconMenu.classList.add("fa-xmark");
        divIconMenu.classList.add("showMenu");
    }
    else if(iconMenu.classList.contains("fa-xmark")){
        iconMenu.classList.remove("fa-xmark");
        iconMenu.classList.add("fa-bars");
        divIconMenu.classList.remove("showMenu");
    }
});

const clickUserIcon = document.querySelector(".iconUser-Container");

clickUserIcon.addEventListener('click', e => {
    window.location.href = "./user.html";
});