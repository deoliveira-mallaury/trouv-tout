// server.js (à la racine du projet)

const express = require("express");
const app = express();

// 1. Charger les variables d'environnement
require("dotenv").config();

// 2. Middlewares essentiels
app.use(express.json()); // Pour traiter les requêtes en JSON

// 3. Importer les routes liées à l'authentification
const authRoutes = require("./Routes/auth.routes");
const usersRoutes = require("./Routes/users.routes");

// 4. Monter les routes avec un préfixe propre
// Exemple : POST /api/auth ⇒ création d'un utilisateur
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// 5. Servir des fichiers statiques (si tu en as)
app.use(express.static("Public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

// 6. Middleware 404 : route non trouvée
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "Route non trouvée. Vérifie l'URL de la requête." });
});

// 7. Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message:
      "Une erreur interne est survenue sur le serveur. Veuillez réessayer plus tard.",
  });
});

// 8. Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Express en ligne : http://localhost:${PORT}`);
});
