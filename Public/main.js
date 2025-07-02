
fetch("/components/header.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("navbar").innerHTML = html;

    // Attendre un peu que le DOM soit mis à jour
    setTimeout(() => {
      const toggleBtn = document.querySelector(".nav-toggle");
      const navList = document.getElementById("nav-list");
      const menuIcon = toggleBtn.querySelector(".menuIcon");

      let isOpen = false;

      toggleBtn.addEventListener("click", () => {
        navList.classList.toggle("hidden");
        navList.classList.toggle("nav-collapse");

        // Mettre à jour l'icône
        if (isOpen) {
          menuIcon.src = "../assets/icon-menu.svg";
          menuIcon.alt = "Menu Icon";
        } else {
          menuIcon.src = "../assets/icon-close.svg";
          menuIcon.alt = "Close Menu Icon";
        }

        isOpen = !isOpen;
      });
    }, 0); // ou utilise requestAnimationFrame si besoin
  });
const year = new Date().getFullYear();
document.getElementById('year').textContent = year