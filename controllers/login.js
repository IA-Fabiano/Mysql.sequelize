const express = require("express");
const router = express.Router();
const db = require("../db/models/index");

router.post('/login-empresa', async(req, res) => {
    console.log(req.body); //console to verify the body data received on this endpoint request
    emp_cnpj = req.body.emp_cnpj;
    emp_senha = req.body.user_senha;
  
    if(req.body.emp_cnpj){      
      if(req.body.emp_senha){
  
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
                Nome:achou.emp_nomefantasia,
                usuario:achou.emp_razaosoci
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
                nome:achou.user_nome,
                usuario:achou.user_usuario
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

module.exports = router;