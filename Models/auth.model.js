import supabase from "../Services/supabaseClient.js";
import bcrypt from "bcrypt";

// Fonction d'inscription


export async function signup(email, password, pseudo, location) {
  // 👉 Étape 1 : envoie le mot de passe en clair à Supabase Auth (il le hash lui-même)
  const { data, error } = await supabase.auth.signUp({
    email,
    password, // ✅ Clé attendue par Supabase
    options: {
      data: {
        pseudo,
        location,
      },
    },
  });

  console.log("Reçu par signup:", email, "[mot de passe caché]");

  if (error) {
    console.log("Erreur d'inscription :", error.message);
    return;
  }

  const userId = data.user?.id;
  if (!userId) {
    console.error("ID utilisateur manquant !");
    return;
  }

  // 👉 Étape 2 : enregistrer un profil personnalisé dans ta table usersCustom
  const hashedPwd = await bcrypt.hash(password, 10); // tu peux conserver ça pour stocker le hash manuellement

  const { error: insertError } = await supabase.from("usersCustom").insert([
    {
      id: userId,
      email: data.user?.email,
      password_hash: hashedPwd, // hashé manuellement pour ta propre table
      pseudo,
      location,
    },
  ]);

  if (insertError) {
    console.error("Erreur lors de l'insertion du profil :", insertError.message);
  } else {
    console.log("Profil inséré !");
  }

  console.log("Utilisateur inscrit !", data.user);
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
  } else {
    console.log("Connecté !", data.user);
  }
}

// // Fonction de déconnexion
export async function logout() {
  await supabase.auth.signOut();
  console.log("Déconnecté");
}

// // Récupérer l’utilisateur connecté
const authModel = {
  signup,
  login,
  logout,
};

export default authModel;
