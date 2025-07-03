const year = new Date().getFullYear();
document.getElementById("year").textContent = year;
let profil = "";
const getUser = async () => {
  try {
    const response = await fetch("/api/users", { method: "GET" });
    const result = await response.json();
    if (!response.ok) {
      return null;
    } else {
      profil = result.profil;
      if (profil) {
        return profil;
      }
    }
  } catch (error) {
    console.error("Erreur de récupération :", error);
    return null;
  }
};

const loadHeader = async () => {
  try {
    const res = await fetch("/components/header.html");
    const html = await res.text();
    document.getElementById("navbar").innerHTML = html;
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
    const profil = await getUser();
    if (profil) {
      document.querySelector(
        ".welcomeTitle"
      ).textContent = `Bienvenue ${profil}`;
      let accountTogle = document.getElementById("login");
      accountTogle.id = "account";
      accountTogle.textContent = "Compte";
      document.getElementById("logout").classList.remove("hidden");
    }
  } catch (error) {
    console.error("Erreur dans loadHeader :", error);
  }
};

window.addEventListener("load", loadHeader);
document.getElementById("logout").addEventListener("click", async () => {
  try {
    await supabase.auth.signOut();
    const response = await fetch("/api/auth/logout", { method: "GET" });
    const result = await response.json();

    if (!response.ok) {
      console.error("Erreur logout :", result.message);
      return;
    }
    document.querySelector(".welcomeTitle").textContent = "";
    console.log(result.message);
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
  }
});
