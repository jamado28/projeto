const userModel = require("../models/user.model");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = userModel.findByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({ message: "Login com sucesso", user });
};