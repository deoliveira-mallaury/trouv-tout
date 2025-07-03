const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

const getUser = async () => {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
    });

    const result = await response.json();
console.log(result.profil);

    if (!response.ok) {
      errorContainer.innerHTML =
        result.message || "Erreur lors de la connexion.";
      return null;
    } else {
      document.querySelector(
        ".welcomeTitle"
      ).textContent = `Bienvenue ${result.profil}`;
    }
  } catch (error) {
    console.error("Erreur de récupération :", error);
    return null;
  }
};

window.addEventListener("load", async () => {
  loadHeader;
  getUser; // Appel correct de la fonction
 
});

const loadHeader = async () => {
  try {
    const res = await fetch("/components/header.html");
    const html = await res.text();

    // Injecte le HTML dans le DOM
    document.getElementById("navbar").innerHTML = html;

    // Récupère l'utilisateur avant de manipuler le DOM
    const profil = await getUser();
    if (profil) {
      document.querySelector(
        ".welcomeTitle"
      ).textContent = `Bienvenue ${profil.name}`;
    }

    // Attends que le DOM soit prêt avant d'ajouter les listeners
    requestAnimationFrame(() => {
      const toggleBtn = document.querySelector(".nav-toggle");
      const navList = document.getElementById("nav-list");
      const menuIcon = toggleBtn?.querySelector(".menuIcon");

      if (!toggleBtn || !navList || !menuIcon) return;

      let isOpen = false;

      toggleBtn.addEventListener("click", () => {
        navList.classList.toggle("hidden");
        navList.classList.toggle("nav-collapse");

        menuIcon.src = isOpen
          ? "../assets/icon-menu.svg"
          : "../assets/icon-close.svg";

        menuIcon.alt = isOpen ? "Menu Icon" : "Close Menu Icon";
        isOpen = !isOpen;
      });
    });
  } catch (error) {
    console.error("Erreur dans loadHeader :", error);
  }
};

window.addEventListener("load", loadHeader);
