const { supabase } = require("../Services/supabaseClient");

// Fonction d'inscription
exports.signup = async(email, password)=> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  console.log("Reçu par signup:",  email, password);
  if (error) {
    console.error("Erreur d'inscription :", error.message);
    return;
  }

  const userId = data.user?.id;
  console.log(userId);

  if (userId) {
    const { error: insertError } = await supabase
      .from("User")
      .insert([{ id: userId, email:data.user?.email}]);

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
}

// Fonction de connexion
// export async function login(email, password) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) {
//     console.error(error.message);
//   } else {
//     console.log("Connecté !", data.user);
//   }
// }

// // Fonction de déconnexion
// export async function logout() {
//   await supabase.auth.signOut();
//   console.log("Déconnecté");
// }

// // Récupérer l’utilisateur connecté
// export async function getUser() {
//   const { data } = await supabase.auth.getUser();
//     const { data: profil, error } = await supabase
//         .from("profils")
//         .select("name"); // Sélectionne le champ name correctement

//     if (error) {
//         console.error("Erreur lors de la récupération du profil :", error.message);
//         return null;
//     }

//     return { user: data.user, profil }; // Retourne les données utilisateur et du profil
// }
