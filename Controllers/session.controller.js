export function getSession(req, res) {
  if (!req.session.access_token) {
    return res.status(401).json({ message: "Non connecté" });
  }

  res.json({
    user: req.session.user,
    access_token: req.session.access_token
  });
}
