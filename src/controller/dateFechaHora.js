import { listHorarios } from "../data/disponibilidadPeluquero.js";

export function getHorarioDay(abre, cierra) {
  return listHorarios.slice(
    listHorarios.indexOf(abre),
    listHorarios.indexOf(cierra) + 1
  );
}

export function getStringDate() {
  const fechaActual = new Date();
  let dia = fechaActual.getDate();
  let mounth = fechaActual.getMonth() + 1;
  let year = fechaActual.getFullYear();
  if (mounth < 10) mounth = `0${mounth}`;
  return `${year}-${mounth}-${dia}`;
}

export const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) return false;
  else if (date1 > date2) return true;
  else return null;
};

export function getStringFechaHoraFormateado() {
  let horaActual = new Date().getHours().toString();
  let minutosActual = new Date().getMinutes().toString();
  if (minutosActual > 0 && minutosActual < 30) {
    minutosActual = "30";
  } else if (minutosActual > 30) {
    minutosActual = "00";
    horaActual++;
  }
  return `${horaActual}:${minutosActual}`;
}
