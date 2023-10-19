const express = require("express");
//const router = express.Router();
const db = require("../db/models/index");
const loginService = require("../service/loginService");
exports.login = (req, res) => {

  const { user_usuario, user_senha } = req.body;
  console.log(user_senha);
  console.log(user_usuario);

  const result = loginService.authenticateUser(user_usuario, user_senha);

  console.log(result, "teste");

  if (result) {
    console.log("meu amado",result)
    return res.json( {
      success: true,
      message: "Login bem sucedido",
      usuario: result.usuario,
     }
    );
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Credenciais inválidas" });
  }
};
//module.exports = router;
