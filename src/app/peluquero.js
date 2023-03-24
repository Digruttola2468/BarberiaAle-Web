import { auth, db } from "./firebase/mainFirebase.js";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getStringDate } from "./controller/dateFechaHora.js";
import { showMessage } from "./controller/showMessage.js";

const btnRefresh = document.querySelector("#btnRefresh");
const inputFechaPeluquero = document.querySelector("#inputFechaPeluquero");
const listTurnos = document.querySelector(".container-listTurnos");
const btnGuardarPrecio = document.querySelector("#btnGuardarPrecio");
const inputPrecioCorte = document.querySelector("#inputPrecioCorte");

const parrafoPrecioCorte = document.createElement("p");
const containerPrecioCorte = document.querySelector(".main-container");

const docRef = doc(db, "peluqueros", "3D8ObZYUm9amOMibekKX");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  parrafoPrecioCorte.innerHTML = `Precio corte actual: ${docSnap.data().precio}`
  containerPrecioCorte.appendChild(parrafoPrecioCorte);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

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
  if (getInputFecha != "") {
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
  } else showMessage("Seleccionar una fecha");
});

btnGuardarPrecio.addEventListener("click", async (e) => {
  const washingtonRef = doc(db, "peluqueros", "3D8ObZYUm9amOMibekKX");

  try {
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      precio: inputPrecioCorte.value,
    });
    showMessage("Se guardo Correctamente", "success");
    parrafoPrecioCorte.innerHTML = `Precio corte actual: ${inputPrecioCorte.value}`
  } catch (error) {
    console.log(error);
  }
});
