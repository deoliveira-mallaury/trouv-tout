const { supabase } = require("../Services/supabaseClient");
// Fonction d'inscription
exports.signup = async (
  email,
  password,
  pseudo,
  name,
  lastname,
  phone,
  location,
  avatar
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log(data);
  console.log("Reçu par signup:", email, password);
  if (error) {
    console.error("Erreur d'inscription :", error.message);
    return;
  }

  const userId = data.user?.id;
  console.log(userId);
  console.log("auth.uid attendu :", userId);
  console.log("password attendu :", pseudo, name, lastname);

  if (userId) {
    const { error: insertError } = await supabase.from("Users").insert([
      {
        id: userId,
        email: data.user?.email,
        password,
        pseudo,
        name,
        lastname,
        phone,
        location,
        avatar_url: avatar,
      },
    ]);

    if (insertError) {
      console.error(
        "Erreur lors de l'insertion du profil :",
        insertError.message
      );
    } else {
      console.log("Profil inséré !");
    }
  }

  console.log("Utilisateur inscrit !", data.user);
};
exports.login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
  } else {
    console.log("Connecté !", data.user);
  }
};

// // Fonction de déconnexion
// export async function logout() {
//   await supabase.auth.signOut();
//   console.log("Déconnecté");
// }

// // Récupérer l’utilisateur connecté

