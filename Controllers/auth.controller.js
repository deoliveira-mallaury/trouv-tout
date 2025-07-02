const authModel = require("../Models/auth.model");

exports.createUser = async (req, res) => {
  const { email, password } = req.body; // ✅ On extrait les bons champs
  if ( !email || !password) {
    return res.status(400).json({ message: "Nom, email et mot de passe sont requis." });
  }

  try {
    const result = await authModel.signup(email, password); // ✅ Appel clair

    
    if (result?.error) {
      return res.status(500).json({ message: result.error.message });
    }
    return res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
      console.error("Erreur createUser:", error.message);
    return res.status(500).json({ message: "Erreur server lors de la création de l'utilisateur." });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await authModel.getAllUsers(); // Appelle le modèle pour récupérer les notes.
    res.status(200).json(users); // Répond avec un statut 200 (OK) et les données JSON.
  } catch (error) {
    console.error("Erreur getAllNotes:", error.message); // Log l'erreur pour le débogage serveur.
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des notes." }); // Répond avec un statut 500 (Internal Server Error).
  }
};