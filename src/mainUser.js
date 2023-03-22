import { auth, db } from "./firebase/mainFirebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { showMessage } from "./controller/showMessage.js";
import {
  doc,
  getDoc,
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
          HorarioTurnoP.innerHTML = `<b>Horario</b>: ${
            docSnap.data().turno.hora
          }`;
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
