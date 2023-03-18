import { showMessage } from "./showMessage.js";
import { listTurnos } from "./data/turnos.js";
import { infoPeluquero, listHorarios } from "./data/disponibilidadPeluquero.js";

const priceCorte = document.querySelector("#priceCorte");
priceCorte.innerHTML = ` ${infoPeluquero.precio}`;

const containerTurnos = document.querySelector(".main-container-turnos");

const inputDate = document.querySelector("#inputDate");
inputDate.setAttribute("min", getStringDate());
const selectTurnosButton = document.querySelector(".selectTurnosButton");

const descripcion = document.createElement("p");
let valorButon = "";
inputDate.addEventListener("change", (evt) => {
  selectTurnosButton.innerHTML = "";
  valorButon = "";
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
      if (turno.turno.fecha === evt.target.value) {
        let obtenerTurno = turno.turno.horario;
        let obtenerIndex = array.indexOf(obtenerTurno);
        delete array[obtenerIndex];
      }
    });

    if (compareDates(getStringDate(), getInputDate) == null) {
      let horaActual = new Date().getHours().toString();
      let minutosActual = new Date().getMinutes().toString();
      if (minutosActual > 0 && minutosActual < 30) {
        minutosActual = "30";
      } else if (minutosActual > 30) {
        minutosActual = "00";
        horaActual++;
      }
      const timeActual = `${horaActual}:${minutosActual}`;

      const d1 = new Date(`${getStringDate()}T${timeActual}`);
      array.map((time, index) => {
        const d2 = new Date(`${getStringDate()}T${time}`);
        if (d1 > d2) {
          delete array[index];
        }
      });
    }

    if (diaAbre != "" && diaCierra != "") {
      array.map((elemen) => {
        const createButton = document.createElement("button");
        createButton.innerHTML = elemen;
        createButton.classList.add("btnHorario");
        createButton.addEventListener("click", (e) => {
          valorButon = elemen;
          descripcion.innerHTML = `Turno para el ${getInputDate} a las ${elemen}`;
        });
        selectTurnosButton.appendChild(createButton);
      });
    } else {
      const createParrafo = document.createElement("p");
      createParrafo.innerHTML = "NO HAY TURNOS DISPONIBLES";
      selectTurnosButton.appendChild(createParrafo);
    }
    descripcion.innerHTML = `Turno para el ${getInputDate} a las ${valorButon}`;
    containerTurnos.appendChild(descripcion);
  }
});

const btnConfirmar = document.querySelector("#btnConfirmar");
btnConfirmar.addEventListener("click", (e) => {
  console.log(inputDate.value);
  console.log(valorButon);
  if (inputDate.value != "" && valorButon != ""){
    if (confirm(`El turno que elegiste es el ${inputDate.value} a las ${valorButon}, seleccione aceptar para confirmar`)) {
      

      listTurnos.map(turno => {
        if(turno.nombre == "Ivan DI Gruttola"){
          turno.turno.fecha = inputDate.value;
          turno.turno.horario = valorButon;
        }
      })
      console.log(listTurnos);
      showMessage("Guardado","success");

      valorButon = "";
      inputDate.value = "";
      selectTurnosButton.innerHTML = "";
      descripcion.innerHTML = "";
    } else {
      showMessage("Cancelado","error")
    }
  }
});
console.log(valorButon);

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

  if (date1 < date2) return false;
  else if (date1 > date2) return true;
  else return null;
};