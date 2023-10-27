const express = require("express");
//const router = express.Router();
const db = require("../db/models/index");
const loginService = require("../service/loginService");
exports.login = async(req, res) => { 
  // #swagger.tags = ['Login']
    // #swagger.description = 'Autenticação'
  /* #swagger.parameters['Dados'] = {
               in: 'body',
               description: 'Dados do Login',
               required: true,
               schema: { $ref: "#/definitions/Objeto_Login" }
        } */
  const { user_usuario, user_senha } = req.body;
  console.log(user_senha);
  console.log(user_usuario);

  const result = await loginService.authenticateUser(user_usuario, user_senha);

  console.log(result, "teste");
  return res.json(result)
}
/*
  if (result) {
    console.log("meu amado", result);
    return res.json({
      success: true,
      message: "Login bem sucedido",
      usuario: result.usuario,
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Credenciais inválidas" });
  }
};
//module.exports = router; 
*/
