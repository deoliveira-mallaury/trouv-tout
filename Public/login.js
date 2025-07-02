document.querySelector(".signupLink").addEventListener("click", function () {
  document.querySelector(".signupSect").classList.remove("hidden");
  document.querySelector(".loginSect").classList.add("hidden");
  document.querySelector(".formTitle").textContent = "Inscription";
});
document
  .querySelector(".bi-arrow-left-circle")
  .addEventListener("click", function (e) {
    document.querySelector(".signupSect").classList.add("hidden");
    document.querySelector(".loginSect").classList.remove("hidden");
    document.querySelector(".formTitle").textContent = "Connexion";
  });
const loginform = document.querySelector(".loginForm");
const signupForm = document.querySelector(".signupForm");
const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{10,}$/;
// console.log(signupForm["name"]);

const statusError = true;
// // signup in BDD form
document.querySelector(".signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const signupForm = document.querySelector(".signupForm");
  const name = signupForm["name"].value;
  const email = signupForm["emailSignup"].value;
  const pass = signupForm["passSignup"].value;
  const confirmPass = signupForm["confirmPass"].value;
  const errorContainer = document.querySelector(".errorForm");

  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{10,}$/;
  let errorMessage = "";
console.log(
email,
pass);

  if (!pass.match(passRegex)) {
    errorMessage +=
      "Mot de passe invalide ! Doit contenir 10 caractères avec majuscule, minuscule et un caractère spécial.<br>";
  }

  if (confirmPass !== pass) {
    errorMessage += "Les mots de passe ne correspondent pas.<br>";
  }

  if (errorMessage !== "") {
    errorContainer.innerHTML = errorMessage;
    return;
  }

  // Envoi vers l'API pour créer un utilisateur
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email :email, password: pass }),
    });
    
    const result = await response.json();
    console.log(result);
    
    if (!response.ok) {
      errorContainer.innerHTML =
        result.message || "Erreur lors de l'inscription.";
    } else {
      errorContainer.innerHTML = "";
      document.querySelector(".result").textContent =
        "✅ Utilisateur inscrit avec succès !";
      signupForm.reset();
    }
  } catch (error) {
    errorContainer.innerHTML = "Erreur réseau : " + error.message;
  }
});

// // login function send to homepage with user name
// // document.getElementById("loginBtn").addEventListener("click", async (e) => {
// //   e.preventDefault();
// //   const email = loginform["email"].value;
// //   const pass = loginform["pass"].value;
// //   await login(email, pass);
// //   const user = await getUser();
// //   if (user) {
// //     window.location.href = "/";
// //   } else {
// //     errorContainer.innerHTML = "Erreur lors de la connexion.";
// //   }
// // });

// // document.getElementById("logoutBtn").addEventListener("click", async () => {
// //   await logout();
// //   document.getElementById("status").textContent = "Déconnecté";
// // });
