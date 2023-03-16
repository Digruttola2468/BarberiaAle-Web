const iconMenu = document.querySelector(".fa-bars");
const divIconMenu = document.querySelector(".items-barberia");
iconMenu.addEventListener("click", (e) => {
  iconMenu.classList.toggle("fa-bars");
  iconMenu.classList.toggle("fa-xmark");
  divIconMenu.classList.toggle("showMenu");
});

const clickUserIcon = document.querySelector(".iconUser-Container");
clickUserIcon.addEventListener("click", (e) => {
  window.location.href = "./user.html";
});