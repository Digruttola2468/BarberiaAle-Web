import { auth, db } from "./firebase/mainFirebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { showMessage } from "./controller/showMessage.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const NombreUserH1 = document.querySelector("#NombreUserH1");
const EmailUserP = document.querySelector("#EmailUserP");
const PhoneUserP = document.querySelector("#PhoneUserP");
const FechaTurnoP = document.querySelector("#FechaTurnoP");
const HorarioTurnoP = document.querySelector("#HorarioTurnoP");
const turnoH3User = document.querySelector("#turnoH3User");

const btnLoginOut = document.querySelector("#btnLoginOut");
const btnModificar = document.querySelector("#btnModificarTurno");
const btnCancelar = document.querySelector("#btnDelete");

btnModificar.style.display = "none";
btnCancelar.style.display = "none";

let obtenerFecha = "";
let obtenerHorario = "";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    if (user.emailVerified) {
      const docRef = doc(db, "usuarios", `${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        NombreUserH1.innerHTML = `<i class="fa-solid fa-user"></i> ${user.displayName}`;
        EmailUserP.innerHTML = `${user.email}`;

        if (user.phoneNumber != null)
          PhoneUserP.innerHTML = `<i class="fa-solid fa-phone"></i>${user.phoneNumber}`;

        if (
          docSnap.data().turno.fecha != "" &&
          docSnap.data().turno.hora != ""
        ) {
          turnoH3User.innerHTML = "Turno";
          btnModificar.style.display = "block";
          btnCancelar.style.display = "block";
          FechaTurnoP.innerHTML = `<b>Fecha</b>: ${docSnap.data().turno.fecha}`;
          obtenerFecha = docSnap.data().turno.fecha;
          HorarioTurnoP.innerHTML = `<b>Horario</b>: ${
            docSnap.data().turno.hora
          }`;
          obtenerHorario = docSnap.data().turno.hora;
        } else {
          turnoH3User.innerHTML = "No posee Turno";
        }
      }
    }
  }
});

btnLoginOut.addEventListener("click", async (e) => {
  if (confirm("Estas seguro en cerrar la sesion?")) {
    try {
      await signOut(auth);
      window.location.href = "./index.html";
    } catch (error) {
      console.log(error.message);
      console.log(error.code);
      showMessage("Error al cerrar Sesion");
    }
  }
});

btnModificar.addEventListener("click", (e) => {
  if (obtenerHorario != "" && obtenerFecha != "") {
    if (isModifiedOrCancel(obtenerFecha, obtenerHorario)) {
      window.location.href = "./index.html#titleSacarTurno";
    } else showMessage("No se puede modificar");
  }
});

btnCancelar.addEventListener("click", async (e) => {
  if (obtenerHorario != "" && obtenerFecha != "") {
    if (isModifiedOrCancel(obtenerFecha, obtenerHorario)) {
      //Actualizar
      const washingtonRef = doc(db, "usuarios", auth.currentUser.uid);

      try {
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          turno: {
            fecha: "",
            hora: "",
          },
        });
        window.location.reload();
      } catch (error) {console.log(error);}
    } else showMessage("No se puede cancelar");
  }
});

function isModifiedOrCancel(fecha, horario) {
  const date1 = new Date();
  const date2 = new Date(`${fecha}T${horario}`);
  console.log(date1, date2);
  if (date1 > date2) {
    //Aca ya esta obsoleto, ya paso la fecha del turno
    //Podemos cambiar el boton por sacar un nuevo turno
    return true;
  } else if (date1 < date2 || date1 == date2) {
    //Aca modificamos el turno
    const horaActual = date1.getHours();
    let modificado = parseInt(obtenerHorario.slice(0, 2)) - 2;

    if (modificado > horaActual) {
      return true;
    } else return false;
  }
}
