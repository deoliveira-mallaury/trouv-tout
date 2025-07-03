const { supabase } = require("../Services/supabaseClient");

exports.getUser = async () => {
  const { data: profil, error } = await supabase.from("Users").select("pseudo"); // Ajoute d'autres champs si besoin

  if (error) {
    console.error("Erreur lors de la récupération du profil :", error.message);
    return null;
  }

  return { profil }; // Tu renvoies juste les données du profil ici
};
