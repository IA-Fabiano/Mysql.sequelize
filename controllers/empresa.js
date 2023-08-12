//  Empresa
const express = require("express");
const router = express.Router();
const db = require("../db/models/index");

  
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