import { showMessage } from "./showMessage.js";
import { listTurnos } from "./data/turnos.js";
import { infoPeluquero } from "./data/disponibilidadPeluquero.js";
import {
  compareDates,
  getHorarioDay,
  getStringDate,
  getStringFechaHoraFormateado,
} from "./dateFechaHora.js";

const priceCorte = document.querySelector("#priceCorte");
const containerTurnos = document.querySelector(".main-container-turnos");
const inputDate = document.querySelector("#inputDate");
const selectTurnosButton = document.querySelector(".selectTurnosButton");
const btnConfirmar = document.querySelector("#btnConfirmar");

const descripcion = document.createElement("p");

priceCorte.innerHTML = ` ${infoPeluquero.precio}`;
inputDate.setAttribute("min", getStringDate());

let valorButon = "";

inputDate.addEventListener("change", (evt) => {
  selectTurnosButton.innerHTML = "";
  valorButon = "";

  const getInputDate = evt.target.value;

  if (!compareDates(getStringDate(), getInputDate)) {
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
      const d1 = new Date(
        `${getStringDate()}T${getStringFechaHoraFormateado()}`
      );
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
        createButton.addEventListener("click", (e) => {
          valorButon = elemen;
          descripcion.innerHTML = `Turno para el ${getInputDate} a las ${elemen}`;
        });
        selectTurnosButton.appendChild(createButton);
      });
    } else showMessage("No Abrimos", "error");

    descripcion.innerHTML = `Turno para el ${getInputDate} a las ${valorButon}`;
    containerTurnos.appendChild(descripcion);
  }
});

btnConfirmar.addEventListener("click", (e) => {
  if (inputDate.value != "" && valorButon != "") {
    if (
      confirm(
        `El turno que elegiste es el ${inputDate.value} a las ${valorButon}, seleccione aceptar para confirmar`
      )
    ) {
      listTurnos.map((turno) => {
        if (turno.nombre == "Ivan DI Gruttola") {
          turno.turno.fecha = inputDate.value;
          turno.turno.horario = valorButon;
        }
      });
      showMessage("Guardado", "success");

      vaciarCampos();

    } else showMessage("Cancelado", "error");
  }
});

const vaciarCampos = () => {
  valorButon = "";
  inputDate.value = "";
  selectTurnosButton.innerHTML = "";
  descripcion.innerHTML = "";
};
