const userModel = require("../models/user.model");

exports.getAllUsers = (req, res) => {
  res.json(userModel.getAll());
};

exports.createUser = (req, res) => {
  const user = userModel.create(req.body);
  res.json(user);
};