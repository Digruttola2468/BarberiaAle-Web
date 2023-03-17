import { listTurnos } from "./data/turnos.js";
import { infoPeluquero, listHorarios } from "./data/disponibilidadPeluquero.js";

const priceCorte = document.querySelector("#priceCorte");
priceCorte.innerHTML = ` ${infoPeluquero.precio}`;

const inputDate = document.querySelector("#inputDate");
inputDate.setAttribute("min", getStringDate());
const selectTurnosButton = document.querySelector(".selectTurnosButton");
inputDate.addEventListener("change", (evt) => {
  selectTurnosButton.innerHTML = "";

  const getInputDate = evt.target.value;
  if (compareDates(getStringDate(), getInputDate) != true) {
    const date = new Date(getInputDate);
    let diaAbre;
    let diaCierra;
    switch (date.getDay() + 1) {
      case 0:
        diaAbre = infoPeluquero.disponibilidad.domingo.abre;
        diaCierra = infoPeluquero.disponibilidad.domingo.cierra;
        break;
      case 1:
        diaAbre = infoPeluquero.disponibilidad.lunes.abre;
        diaCierra = infoPeluquero.disponibilidad.lunes.cierra;
        break;
      case 2:
        diaAbre = infoPeluquero.disponibilidad.martes.abre;
        diaCierra = infoPeluquero.disponibilidad.martes.cierra;
        break;
      case 3:
        diaAbre = infoPeluquero.disponibilidad.miercoles.abre;
        diaCierra = infoPeluquero.disponibilidad.miercoles.cierra;
        break;
      case 4:
        diaAbre = infoPeluquero.disponibilidad.jueves.abre;
        diaCierra = infoPeluquero.disponibilidad.jueves.cierra;
        break;
      case 5:
        diaAbre = infoPeluquero.disponibilidad.viernes.abre;
        diaCierra = infoPeluquero.disponibilidad.viernes.cierra;
        break;
      case 6:
        diaAbre = infoPeluquero.disponibilidad.sabado.abre;
        diaCierra = infoPeluquero.disponibilidad.sabado.cierra;
        break;
      default:
        diaAbre = "";
        diaCierra = "";
    }

    const array = getHorarioDay(diaAbre, diaCierra);
    listTurnos.map((turno) => {
      if (turno.listTurnos.turno.fecha === evt.target.value) {
        let obtenerTurno = turno.listTurnos.turno.horario;
        let obtenerIndex = array.indexOf(obtenerTurno);
        delete array[obtenerIndex];
      }
    });

    // const horaActual = "16:00";
    // array.splice(array.indexOf(horaActual),9)
    // console.log(array);

    if (diaAbre != "" && diaCierra != "") {
      array.map((elemen) => {
        const createButton = document.createElement("button");
        createButton.innerHTML = elemen;
        selectTurnosButton.appendChild(createButton);
      });
    } else {
      const createParrafo = document.createElement("p");
      createParrafo.innerHTML = "NO HAY TURNOS DISPONIBLES";
      selectTurnosButton.appendChild(createParrafo);
    }
  }
});

function getHorarioDay(abre, cierra) {
  return listHorarios.slice(
    listHorarios.indexOf(abre),
    listHorarios.indexOf(cierra) + 1
  );
}

function getStringDate() {
  const fechaActual = new Date();
  let dia = fechaActual.getDate();
  let mounth = fechaActual.getMonth() + 1;
  let year = fechaActual.getFullYear();
  if (mounth < 10) mounth = `0${mounth}`;
  return `${year}-${mounth}-${dia}`;
}

const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
    return false;
  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`);
    return true;
  } else {
    console.log(`Both dates are equal`);
    return null;
  }
};
