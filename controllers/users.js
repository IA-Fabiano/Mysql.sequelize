const express = require("express");
const router = express.Router();
const db = require("../db/models/index");

router.post('/login', async(req, res) => {
    console.log(req.body); //console to verify the body data received on this endpoint request
    user_usuario = req.body.user_usuario;
    user_senha = req.body.user_senha;

    if(req.body.user_usuario){      
      if(req.body.user_senha){

              const usu = await db.Users.findOne({
                // Indicar quais colunas recuperar
                attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
        
                // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                where: { user_usuario },
            });
            console.log(usu)
  

          if(usu){
                const achou = await db.Users.findOne({
                // Indicar quais colunas recuperar
                attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
        
                // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                where: { user_usuario, user_senha },
            });
             
            console.log(achou)
            if(achou){
              data = {
                code: 200,
                mensage: 'Usuário Logado com Sucesso',
                Nome:achou.user_nome
              };
              
              res.json(data);
            }else{
              data = {
                code: 401,
                mensage: 'Senha errada'
              };
              
              res.json(data);
            }
          }else{
            data = {
              code: 401,
              mensage: 'Usuário errado'
            };
          
          res.json(data);
          }
     }else{ data = {
      code: 401,
      mensage: 'Senha não informada'
      };
      
      res.json(data); } 
    }else{ 
      data = {
        code: 401,
        mensage: 'Usuário não informado'
      };
      
      res.json(data); 
    }
 
});

router.post('/cadastro', async(req, res) => {
    let dados = req.body;
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
                console.log('teste')
                
              }
            
              if(validar == false){
  
          
                 const dadosUsuario = await db.Users.create(dados);
                var data = {
                code: 200,
                mensage: 'Usuário cadastrado com Sucesso'
              };
              console.log(dadosUsuario);
              res.json(data); 
  
                }else{
                var data = {
                  code: 401,
                  mensage: 'Username ja esta em uso'
                };
                res.json(data);
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
  const users = await db.Users.findAll({

      // Indicar quais colunas recuperar
      attributes: ['id', 'user_nome', 'user_usuario','user_senha'],

      // Ordenar os registros pela coluna id na forma decrescente
      order: [['id', 'ASC']],
  });
  if(users){
    var data = {
      code: 200,
      mensage: 'Lista',
      dados: users
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

module.exports = router;