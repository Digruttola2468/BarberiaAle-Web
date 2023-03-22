import { auth, db } from "./firebase/mainFirebase.js";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  query,
  where,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getStringDate } from './controller/dateFechaHora.js'
import { showMessage } from "./controller/showMessage.js";

const btnRefresh = document.querySelector("#btnRefresh");
const inputFechaPeluquero = document.querySelector("#inputFechaPeluquero");
const listTurnos = document.querySelector(".container-listTurnos");

inputFechaPeluquero.setAttribute("min", getStringDate());


inputFechaPeluquero.addEventListener("change", async (e) => {
  const getInputFecha = e.target.value;
  const q = query(
    collection(db, "usuarios"),
    where("turno.fecha", "==", getInputFecha)
  );

  listTurnos.innerHTML = "";

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    listTurnos.innerHTML += `<li>${doc.data().turno.hora} - ${
      doc.data().nombre
    }</li>`;
  });
});

btnRefresh.addEventListener("click", async (e) => {
    const getInputFecha = inputFechaPeluquero.value;
    if(getInputFecha != ""){
        const q = query(
            collection(db, "usuarios"),
            where("turno.fecha", "==", getInputFecha)
          );
              
          listTurnos.innerHTML = "";
        
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            listTurnos.innerHTML += `<li>${doc.data().turno.hora} - ${
              doc.data().nombre
            }</li>`;
          });
    }else showMessage("Seleccionar una fecha")

    
});
