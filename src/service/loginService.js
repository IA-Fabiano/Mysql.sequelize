const db = require("../db/models/index");

exports.authenticateUser = async (usuario, password) => {
    if(usuario){      
        if(password){
  
              const usu = await db.Users.findOne({
                // Indicar quais colunas recuperar
                attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
        
                // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                where: { usuario },
              });
              console.log(usu)
    
  
            if(usu){
                  const achou = await db.Users.findOne({
                  // Indicar quais colunas recuperar
                  attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
          
                  // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                  where: { usuario, password },
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
      
};