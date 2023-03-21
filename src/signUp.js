import { auth,db } from "./firebase/mainFirebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { showMessage } from "./controller/showMessage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const btnRegistrarme = document.querySelector("#btnRegistrarme");
const formRegistrarse = document.querySelector("#formRegistrarse");

let nombreString = "user",
  apellidoString = "";

btnRegistrarme.addEventListener("click", async (e) => {
  e.preventDefault();

  const inputNombre = formRegistrarse["nombre"].value;
  const inputApellido = formRegistrarse["apellido"].value;
  const inputEmail = formRegistrarse["email"].value;
  const inputPassword = formRegistrarse["password"].value;
  const inputRptPassword = formRegistrarse["rptPassword"].value;

  if (inputNombre != "" && inputApellido != "") {
    nombreString = inputNombre;
    apellidoString = inputApellido;
    verificarEmailAndPassword(inputEmail, inputPassword, inputRptPassword);
  }
});

async function createUser(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    updateProfile(auth.currentUser, {
      displayName: `${nombreString} ${apellidoString}`,
      photoURL:
        "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
    }).then();

    sendEmailVerification(auth.currentUser).then(() => {
      showMessage("Se envio un Email Verification", "success");
      //window.open("./sendEmailVerification.html");
    });

    clearCampus();
  } catch (error) {
    console.log(error.message);
    console.log(error.code);

    switch (error.code) {
      case "auth/weak-password":
        showMessage("La contraseña es muy debil", "error");
        break;
      case "auth/internal-error":
        showMessage("Error Enviar Email");
        break;
      case "auth/network-request-failed":
        showMessage("Error en el Email", "error");
        break;
      case "auth/email-already-in-use":
        showMessage("El Email ya Existe", "error");
        break;
    }
  }
}

btnSignInGoole.addEventListener("click", async (e) => {
  const provider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider);
    console.log(credentials);
    console.log("google sign in");

    // Close the login modal
    const modalInstance = bootstrap.Modal.getInstance(
      googleButton.closest(".modal")
    );
    modalInstance.hide();

    // show welcome message
    showMessage("Welcome " + credentials.user.displayName);
  } catch (error) {
    console.log(error);
  }
});

function clearCampus() {
  formRegistrarse["nombre"].value = "";
  formRegistrarse["apellido"].value = "";
  formRegistrarse["email"].value = "";
  formRegistrarse["password"].value = "";
  formRegistrarse["rptPassword"].value = "";
}

let isCheckPassword = false;
let isCheckEmail = false;
function verificarEmailAndPassword(email, password, reptPassword) {
  const verificarPassword = new Promise((resolve, reject) => {
    if (password.length != 0) {
      if (reptPassword.length != 0) {
        if (password === reptPassword) {
          resolve(true);
        } else reject("La contraseña no son iguales");
      } else reject("Campo Repetir Password Vacio");
    } else reject("Campo Password Vacio");
  });

  const verificarEmail = new Promise((resolve, reject) => {
    if (email.length != 0) {
      if (email.includes("@")) {
        if (email.includes("gmail") || email.includes("hotmail")) {
          if (email.includes(".com") || email.includes(".ar")) {
            resolve(true);
          } else reject("Error Email");
        } else reject("Email no contiene gmail o hotmail");
      } else reject("Email No Contine @");
    } else reject("Email Vacio");
  });

  verificarPassword
    .then((resultado) => {
      isCheckPassword = resultado;
    })
    .catch((e) => {
      showMessage(e, "error");
    });

  verificarEmail
    .then((resultado) => {
      isCheckEmail = resultado;
    })
    .catch((e) => {
      showMessage(e, "error");
    });

  if (isCheckEmail && isCheckPassword) {
    createUser(email, password);
  }
}
