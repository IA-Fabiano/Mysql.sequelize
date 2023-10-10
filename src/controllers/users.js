const express = require("express");
//const router = express.Router();
const db = require("../db/models/index");
 // User

 const userService = require("../service/userService");

 exports.listUsers = (req, res) => {
  /**
 * @swagger
 * /listar:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados.
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: Código de status da resposta.
 *                 mensage:
 *                   type: string
 *                   description: Mensagem descritiva da resposta.
 *                 users:
 *                   type: array
 *                   description: Lista de usuários.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do usuário.
 *                       user_nome:
 *                         type: string
 *                         description: Nome do usuário.
 *                       user_usuario:
 *                         type: string
 *                         description: Nome de usuário.
 *                       user_senha:
 *                         type: string
 *                         description: Senha do usuário.
 *       '401':
 *         description: Sem usuário cadastrado
 */

   const users = userService.listUsers();
   return res.json({ success: true, users });
 };
 
 exports.updateUser = (req, res) => {

  /**
 * @swagger
 * /editar:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário com base no ID fornecido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do usuário a ser atualizado.
 *               user_nome:
 *                 type: string
 *                 description: Nome do usuário.
 *               user_usuario:
 *                 type: string
 *                 description: Nome de usuário.
 *               user_senha:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso
 *       '401':
 *         description: Usuário não encontrado
 */

   const userId = parseInt(req.params.id);
   const updatedUser = req.body;
 
   const result = userService.updateUser(userId, updatedUser);
 
   if (result.success) {
     return res.json({ success: true, user: result.user });
   } else {
     return res.status(404).json({ success: false, message: result.message });
   }
 };
 
 exports.createUser = (req, res) => {
  /**
 * @swagger
 * /cadastro:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_nome:
 *                 type: string
 *                 description: Nome do usuário.
 *               user_usuario:
 *                 type: string
 *                 description: Nome de usuário.
 *               user_senha:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       '200':
 *         description: Usuário cadastrado com sucesso
 *       '401':
 *         description: Falha no cadastro de usuário
 */

   const { user_usuario, user_senha, user_nome } = req.body;
 
   const newUser = {
    user_usuario,
     user_senha,
     user_nome,
   };
 
   const result = userService.createUser(newUser, user_usuario);
 
   if (!result.success) {
     return res.status(201).json({ success: true, user: result.data });
   } else {
     return res
       .status(result.status)
       .json({ success: false, message: result.message });
   }
 };
 
 exports.deleteUser = (req, res) => {
  /**
 * @swagger
 * /deletar:
 *   delete:
 *     summary: Deleta um usuário
 *     description: Deleta um usuário com base no ID fornecido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do usuário a ser deletado.
 *     responses:
 *       '200':
 *         description: Usuário deletado com sucesso
 *       '401':
 *         description: Usuário não encontrado
 */
   const userId = parseInt(req.params.id);
 
   const deletedUser = userService.deleteUser(userId);
 
   if (deletedUser === null) {
     return res
       .status(404)
       .json({ success: false, message: "Usuário não encontrado" });
   }
 
   return res.json({ success: true, user: deletedUser });
 };
// quantidade de empresas e usuarios cadastrados 
/*
router.get('/quant', async(req, res) => {
  const users = await db.Users.findAll({

      // Indicar quais colunas recuperar
      attributes: ['id', 'user_nome'],

      // Ordenar os registros pela coluna id na forma decrescente
      order: [['id', 'ASC']],
  });

  const emp = await db.Empresas.findAll({

    // Indicar quais colunas recuperar
    attributes: ['id', 'emp_nomefantasia'],

    // Ordenar os registros pela coluna id na forma decrescente
    order: [['id', 'ASC']],
});
  if(users){
    let data = {
      code: 200,
      mensage: 'Lista',
      usuarios: users.length,
      empresas: emp.length

    };
    res.json(data);

  }else{
    var data = {
      code: 401,
      mensage: 'Sem usuário cadastrado'
    };
    res.json(data);

  }

});
 
module.exports = router; */