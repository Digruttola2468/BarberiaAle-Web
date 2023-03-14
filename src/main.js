const iconMenu = document.querySelector(".iconBar");

iconMenu.addEventListener('click',e => {
    if(iconMenu.classList.contains("fa-bars")){
        iconMenu.classList.remove("fa-bars");
        iconMenu.classList.add("fa-xmark");
    }
    else if(iconMenu.classList.contains("fa-xmark")){
        iconMenu.classList.remove("fa-xmark");
        iconMenu.classList.add("fa-bars");
    }
});