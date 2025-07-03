const { supabase } = require("../Services/supabaseClient");

exports.getUser = async () => {
  const { data } = await supabase.auth.getUser();
  const { data: profil, error } = await supabase.from("Users").select("pseudo"); // Sélectionne le champ name correctement

  if (error) {
    console.error("Erreur lors de la récupération du profil :", error.message);
    return null;
  }

  return { user: data.user, profil }; // Retourne les données utilisateur et du profil
};
