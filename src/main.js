const iconMenu = document.querySelector(".fa-bars");
const divIconMenu = document.querySelector(".items-barberia");

iconMenu.addEventListener("click", (e) => {
  if (iconMenu.classList.contains("fa-bars")) {
    iconMenu.classList.remove("fa-bars");
    iconMenu.classList.add("fa-xmark");
    divIconMenu.classList.add("showMenu");
  } else if (iconMenu.classList.contains("fa-xmark")) {
    iconMenu.classList.remove("fa-xmark");
    iconMenu.classList.add("fa-bars");
    divIconMenu.classList.remove("showMenu");
  }
});

const clickUserIcon = document.querySelector(".iconUser-Container");

clickUserIcon.addEventListener("click", (e) => {
  window.location.href = "./user.html";
});

const listTurnos = [
  {
    id: 0,
    nombre: "Ivan DI Gruttola",
    listTurnos: {
      turno: {
        fecha: "2023-03-17",
        horario: "17:00",
      },
      turno: {
        fecha: "2023-03-18",
        horario: "17:00",
      },
    },
    email: "ivandigruttola@gmail.com",
    phone: "341 231 4350",
  },
  {
    id: 1,
    nombre: "Marcos Cañete",
    listTurnos: {
      turno: {
        fecha: "2023-03-17",
        horario: "17:30",
      },
      turno: {
        fecha: "2023-03-18",
        horario: "17:30",
      },
    },
    email: "marcosCañete@gmail.com",
    phone: "341 231 4350",
  },
  {
    id: 2,
    nombre: "Mati Calderon",
    listTurnos: {
      turno:{
        fecha: "2023-03-17",
        horario: "18:00",
      },
      turno:{
        fecha: "2023-03-18",
        horario: "18:00",
      },
    },
    email: "matiCalderon@gmail.com",
    phone: "341 231 4350",
  },
  {
    id: 3,
    nombre: "Julian Cejas",
    listTurnos: {
      turno:{
        fecha: "2023-03-17",
        horario: "18:30",
      },
      turno:{
        fecha: "2023-03-18",
        horario: "18:30",
      },
    },
    email: "julianCejas@gmail.com",
    phone: "341 231 4350",
  },
  {
    id: 4,
    nombre: "Pablo Cardozo",
    listTurnos: {
      turno:{
        fecha: "2023-03-17",
        horario: "19:00",
      },
      turno:{
        fecha: "2023-03-18",
        horario: "19:00",
      },
    },
    email: "pabloCardozo@gmail.com",
    phone: "341 231 4350",
  },
  {
    id: 5,
    nombre: "Facundo Gonzalez",
    listTurnos: {
      turno: {
        fecha: "2023-03-17",
        horario: "19:30",
      },
      turno: {
        fecha: "2023-03-18",
        horario: "19:30",
      },
    },
    email: "facundoGonzales@gmail.com",
    phone: "341 231 4350",
  },
];



const inputDate = document.querySelector("#inputDate");
const selectTurnosButton = document.querySelector(".selectTurnosButton");

let diaAbre = 0;
let diaCierra = 0;

inputDate.addEventListener("change", (evt) => {
  selectTurnosButton.innerHTML = "";
  // const l = listTurnos.map((info) =>
  //   info.turnos.filter(e => e.fecha === evt.target.value)
  // );

  // if (!l.includes(undefined)) {
  //   const horarios = l.map((e) => e.map((ent) => ent.horario));

  //   const allHorarios = horarios.map((index) => console.log(index[0]));
  //   console.log(allHorarios);
  // } else {
  //   console.error("VACIO");
  // }
  const date = new Date(evt.target.value);
  console.log();


  switch (date.getDay() + 1 ) {
    case 0:
       diaAbre = peluquero.disponibilidad.domingo.abre;
       diaCierra = peluquero.disponibilidad.domingo.cierra;
    break;
    case 1:
      diaAbre = peluquero.disponibilidad.lunes.abre;
      diaCierra = peluquero.disponibilidad.lunes.cierra;
   break;
   case 2:
       diaAbre = peluquero.disponibilidad.martes.abre;
       diaCierra = peluquero.disponibilidad.martes.cierra;
    break;
    case 3:
       diaAbre = peluquero.disponibilidad.miercoles.abre;
       diaCierra = peluquero.disponibilidad.miercoles.cierra;
    break;
    case 4:
       diaAbre = peluquero.disponibilidad.jueves.abre;
       diaCierra = peluquero.disponibilidad.jueves.cierra;
    break;
    case 5:
       diaAbre = peluquero.disponibilidad.viernes.abre;
       diaCierra = peluquero.disponibilidad.viernes.cierra;
    break;
    case 6:
       diaAbre = peluquero.disponibilidad.sabado.abre;
       diaCierra = peluquero.disponibilidad.sabado.cierra;
    break;
    default:
      break;
  }

  const array = getHorarioDay(diaAbre,diaCierra);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const createButton = document.createElement("button");
    createButton.innerHTML = element;

    selectTurnosButton.appendChild(createButton);
  }
  
});

function getHorarioDay(abre,cierra) {
  let indexOfAbre = horarios.indexOf(abre);
  let indexOfCierra = horarios.indexOf(cierra);

  return horarios.slice(indexOfAbre,indexOfCierra + 1)
}

const peluquero = {
    precio: 1500,
    nombre: "Alejandro",
    phone: "341 341 4342",
    email: "alejandroPeluquero@gmail.com",
    disponibilidad: {
        domingo: {

        },
        lunes: {
            abre: "15:30",
            cierra: "23:30",
        },
        martes: {
            abre: "17:00",
            cierra: "19:00",
        },
        miercoles: {
            abre: "18:30",
            cierra: "23:30",
        },
        jueves: {
            abre: "19:00",
            cierra: "22:30",
        },
        viernes: {
            abre: "15:30",
            cierra: "23:30",
        },
        sabado: {
            abre: "15:30",
            cierra: "23:30",
        }
    }
    

};

const horarios = [
    "15:00","15:30",
    "16:00","16:30",
    "17:00","17:30",
    "18:00","18:30",
    "19:00","19:30",
    "20:00","20:30",
    "21:00","21:30",
    "22:00","22:30",
    "23:00","23:30",
]


const weekDays = [
  "Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"
]


const priceCorte = document.querySelector("#priceCorte");
priceCorte.innerHTML = `Precio: ${peluquero.precio}`;