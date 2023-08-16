const express = require("express");
const router = express.Router();
const db = require("../db/models/index");
 // User

router.post('/cadastro', async(req, res) => {
    let dados = req.body;
    console.log(dados)
    let user_usuario=req.body.user_usuario;
    let validar=false
     if(dados.user_usuario){ 
        if(dados.user_nome){ 
            if(dados.user_senha){
              console.log(dados);       
              
              const usu = await db.Users.findOne({
                // Indicar quais colunas recuperar
                attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
        
                // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                where: { user_usuario },
            });
              console.log(usu)
              if(usu){
                validar= true
                console.log('')
                
              }
            
              if(validar == false){
  
          
                 const dadosUsuario = await db.Users.create(dados);
                var data = {
                code: 200,
                mensage: 'Usuário cadastrado com Sucesso'
              };
              res.json(data); 
              console.log(data);
              console.log(dadosUsuario);
         
  
                }else{
                var data = {
                  code: 401,
                  mensage: 'Username ja esta em uso'
                };
                res.json(data);
                console.log(data);
                } // aqui termina o  validar
            }else{ // se não do password
              var data = {
                code: 401,
                mensage: 'Coloque uma senha'
              };
              res.json(data);
            } 
        }else{  // se não do nome
              var data = {
                code: 401,
                mensage: 'Coloque um Nome' 
              };
              res.json(data);
             }
    }else{ // se não do Username
            var data = {
                code: 401,
                mensage: 'Coloque um Username'
            };
               res.json(data);
          }
  
  
});

router.get('/listar', async(req, res) => {
  const al = await db.Users.findAll({

      // Indicar quais colunas recuperar
      attributes: ['id', 'user_nome', 'user_usuario','user_senha'],

      // Ordenar os registros pela coluna id na forma decrescente
      order: [['id', 'ASC']],
  });
  if(al){
    var data = {
      code: 200,
      mensage: 'Lista',
      users: al
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

router.delete('/deletar', async(req, res) => {
  console.log("ape")
  const id = req.body.id;
  const usuario = await db.Users.findByPk(id);
  if (usuario) {
    await usuario.destroy();
    data = {
        code: 200,
        mensage: 'Usuário deletado com sucesso!',
        dadosUsuario: usuario,
      };
    res.json(data)

  }else{
    var data = {
      code: 401,
      mensage: 'Usúario não foi encontrado'
    };
    res.json(data);

  }
});

router.put('/editar', async(req, res) => {
  let dados = req.body;
  // Nome usuário senha all

 
    const usuario = await db.Users.findByPk(dados.id);
    if (usuario) {
       await db.Users.update(dados, { where: { id: dados.id } })
      data = {
        code: 200,
        mensage: 'Usuário atualizado com sucesso!',
       dadosUsuario: dados
      };
      res.json(data)


    }else{
      var data = {
        code: 401,
        mensage: 'Usúario não foi encontrado'
      };
      res.json(data);  
    }
});
// quantidade de empresas e usuarios cadastrados
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
 
module.exports = router;