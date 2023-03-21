import { auth, db } from "./firebase/mainFirebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const NombreUserH1 = document.querySelector("#NombreUserH1");
const EmailUserP = document.querySelector("#EmailUserP");
const PhoneUserP = document.querySelector("#PhoneUserP");
const FechaTurnoP = document.querySelector("#FechaTurnoP");
const HorarioTurnoP = document.querySelector("#HorarioTurnoP");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    if (user.emailVerified) {
      const docRef = doc(db, "usuarios", `${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        NombreUserH1.innerHTML = `<i class="fa-solid fa-user"></i> ${user.displayName}`;
        EmailUserP.innerHTML = `<i class="fa-solid fa-envelope"></i> ${user.email}`;
        PhoneUserP.innerHTML = `<i class="fa-solid fa-phone"></i>${user.phoneNumber}`;
        FechaTurnoP.innerHTML = `Fecha: ${docSnap.data().turno.fecha}`;
        HorarioTurnoP.innerHTML = `Horario: ${docSnap.data().turno.hora}`;
      }
    }
  }
});
