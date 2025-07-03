const authModel = require("../Models/auth.model");

exports.createUser = async (req, res) => {
  const { email, password, pseudo, name, lastname, phone, location, avatar } =
    req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Nom, email et mot de passe sont requis." });
  }

  try {
    const result = await authModel.signup(
      email,
      password,
      pseudo,
      name,
      lastname,
      phone,
      location,
      avatar
    );

    if (result?.error) {
      return res.status(500).json({ message: result.error.message });
    }
    return res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur createUser:", error.message);
    return res
      .status(500)
      .json({ message: "Erreur server lors de la création de l'utilisateur." });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }
  try {
    const result = await authModel.login(email, password);
    return res.status(200).json({ message: "Connecté avec succès." });
  } catch (error) {
    console.error("Erreur login :", error.message);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la connexion." });
  }
};
exports.logout = async (req, res) => {
  try {
    await authModel.logout();
    return res.status(200).json({ message: "Déconnecté avec succès." });
  } catch (error) {
    console.error("Erreur logout :", error.message);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la déconnexion." });
  }
};
