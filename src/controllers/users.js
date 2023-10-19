const express = require("express");
//const router = express.Router();
const db = require("../db/models/index");
// User

const userService = require("../service/userService");

exports.listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    console.log(users);
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};
exports.updateUser = (req, res) => {
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
