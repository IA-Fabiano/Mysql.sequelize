const express = require("express");
//const router = express.Router();
const db = require("../db/models/index");

exports.login = (req, res) => {
  const { user_usuario, user_senha } = req.body;

  const result = LoginService.authenticateUser(user_usuario, user_senha);
  if (result) {
    return res.json({ success: true, message: "Login bem sucedido" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Credenciais inválidas" });
  }
};
//module.exports = router;