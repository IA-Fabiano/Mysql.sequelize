const express = require("express");
//const router = express.Router();
const db = require("../db/models/index");
const loginService = require("../service/loginService");
exports.login = (req, res) => {
  /*
   @swagger
     /login:
     post:
       summary: Realiza o login de um usuário
       description: Autentica um usuário com suas credenciais.
       requestBody:
         required: true
         content:
           application/json:
             schema:
               type: object
               properties:
                 user_usuario:
                   type: string
                   description: Nome de usuário do usuário.
                 user_senha:
                   type: string
                   description: Senha do usuário.
       responses:
         '200':
           description: Autenticação bem-sucedida
           content:
             application/json:
               schema:
                 type: object
                 properties:
                   code:
                     type: integer
                     description: Código de status da resposta.
                   mensage:
                     type: string
                     description: Mensagem descritiva da resposta.
                   usuario:
                     type: string
                     description: Nome de usuário logado.
   */
  const { user_usuario, user_senha } = req.body;
  console.log(user_senha);
  console.log(user_usuario);

  const result = loginService.authenticateUser(user_usuario, user_senha);

  console.log(result, "teste");

  if (result) {
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
