const usersModel = require("../Models/users.model");
exports.getUser = async (req, res) => {
  try {
    const result = await usersModel.getUser();

    if (result?.error) {
      return res.status(500).json({ message: result.error.message });
    }

    // Envoie les données utilisateur réelles au client
    return res.status(200).json({ profil: result.profil[0].pseudo });
  } catch (error) {
    console.error("Erreur getUser:", error.message);
    return res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'utilisateur.",
    });
  }
};
