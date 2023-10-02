const db = require("../db/models/index");

exports.authenticateUser = async (user_usuario, user_senha) => {
    if(user_usuario){      
        if(user_senha){
  
              const usu = await db.Users.findOne({
                // Indicar quais colunas recuperar
                attributes: ['user_usuario','user_senha'],
        
                // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                where: { user_usuario : user_usuario },
              });
              console.log(usu);
              console.log('teste')
  
            if(usu){
                  const achou = await db.Users.findOne({
                  // Indicar quais colunas recuperar
                  attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
          
                  // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                  where: { user_usuario, user_senha },
              });
               
              console.log('teste')
              if(achou){
                data = {
                  code: 200,
                  mensage: 'Usuário Logado com Sucesso',
                  nome:achou.user_nome,
                  usuario:achou.user_usuario
                };
                
                return console.log(data)
              }else{
                data = {
                  code: 401,
                  mensage: 'Senha errada'
                };
                
                return data
              }
            }else{
              data = {
                code: 401,
                nome:user_usuario,
                mensage: 'Usuário errado'
              };
            
              return console.log(data)
            }
       }else{ data = {
        code: 401,
        mensage: 'Senha não informada'
        };
        
        return data
       } 
      }else{ 
        data = {
          code: 401,
          mensage: 'Usuário não informado'
        };
        
        return data
      }
      
};