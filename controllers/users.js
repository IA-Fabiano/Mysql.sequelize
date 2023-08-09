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

router.post('/login-empresas', async(req, res) => {
  console.log(req.body); //console to verify the body data received on this endpoint request
  emp_cnpj = req.body.emp_cnpj;
  emp_senha = req.body.user_senha;

  if(req.body.emp_email){      
    if(req.body.user_senha){

          const usu = await db.Empresas.findOne({
            // Indicar quais colunas recuperar
            attributes: ['id', 'emp_nomefantasia', 'emp_razaosoci', 'emp_cnpj','emp_email','emp_senha'],
    
            // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
            where: { emp_cnpj },
          });
          console.log(usu)


        if(usu){
              const achou = await db.Users.findOne({
              // Indicar quais colunas recuperar
              attributes: ['id', 'emp_nomefantasia', 'emp_razaosoci', 'emp_cnpj','emp_email','emp_senha'],
      
              // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
              where: { emp_cnpj, emp_senha },
          });
           
          console.log(achou)
          if(achou){
            data = {
              code: 200,
              mensage: 'Empresa Logado com Sucesso',
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

router.post('/cadastro-empresas', async(req, res) => {
  let dados = req.body;
  console.log(dados)
  let emp_cnpj=req.body.emp_cnpj;

   if(dados.emp_razaosoci){ 
      if(dados.emp_cnpj){ 
          if(dados.emp_email){
            if(dados.emp_senha){
              console.log(dados);       
              
              const usu = await db.Empresas.findOne({
                // Indicar quais colunas recuperar
                attributes: ['id', 'emp_nomefantasia', 'emp_razaosoci', 'emp_cnpj','emp_email'],
        
                // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                where: { emp_cnpj }, 
            });
              console.log(usu)
  
            
              if(!usu){
  
          
                 const dadosUsuario = await db.Empresas.create(dados);
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
                  mensage: 'CNPJ ja esta em uso'
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
          }else{ // se não do password
            var data = {
              code: 401,
              mensage: 'Coloque um email'
            };
            res.json(data);
          } 
      }else{  // se não do nome
            var data = {
              code: 401,
              mensage: 'Coloque um CNPJ' 
            };
            res.json(data);
           }
  }else{ // se não do Username
          var data = {
              code: 401,
              mensage: 'coloque a razão social '
          };
             res.json(data);
        }


});

router.get('/listar-empresas', async(req, res) => {
  const users = await db.Empresas.findAll({

      // Indicar quais colunas recuperar
      attributes: ['id', 'emp_nomefantasia', 'emp_razaosoci', 'emp_cnpj','emp_email','emp_senha'],

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
      mensage: 'Sem Empresa cadastrado'
    };
    res.json(data);

  }

});

router.delete('/deletar-empresas', async(req, res) => {
  const id = req.body.id;
  const usuario = await db.Empresas.findByPk(id);
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

router.put('/editar-empresas', async(req, res) => {
  let dados = req.body;
  // Nome usuário senha all

 
    const usuario = await db.Empresas.findByPk(dados.id);
    if (usuario) {
       await db.Empresas.update(dados, { where: { id: dados.id } })
      data = {
        code: 200,
        mensage: 'Dados da Empresa atualizado com sucesso!',
       dadosUsuario: dados
      };
      res.json(data)


    }else{
      var data = {
        code: 401,
        mensage: 'Empresa não foi encontrado'
      };
      res.json(data);  
    }
});

module.exports = router;