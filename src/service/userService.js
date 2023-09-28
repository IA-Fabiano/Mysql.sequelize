const db = require("../db/models/index");

exports.createUser = async(newUser, { soci, impo }) => {
    if(dados.user_usuario){ 
        if(dados.user_nome){ 
            if(dados.user_senha){
              console.log(dados);       
              
              const usu = await db.Users.findOne({
                // Indicar quais colunas recuperar
                attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
        
                // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                where: { impo },
            });
              console.log(usu)
            
              if(!usu){
  
          
                 const dadosUsuario = await db.Users.create(newUser);
                var data = {
                code: 200,
                mensage: 'Usuário cadastrado com Sucesso'
              };
              res.json(data); 
              console.log(data);
              console.log(dadosUsuario);
              return(data)
  
                }else{
                var data = {
                  code: 401,
                  mensage: 'Usuário ja esta em uso'
                };
                res.json(data);
                console.log(data);
                return(data)
                } // aqui termina o  validar
            }else{ // se não do password
              var data = {
                code: 401,
                mensage: 'Coloque uma senha'
              };
              res.json(data);
              return(data)
            } 
        }else{  // se não do nome
              var data = {
                code: 401,
                mensage: 'Coloque um Nome' 
              };
              res.json(data);
              return(data)
             }
    }else{ // se não do Username
            var data = {
                code: 401,
                mensage: 'Coloque um Usuário'
            };
               res.json(data);
               return(data)
          }
  
};

exports.listUsers = async() => {
    const users = await db.Users.findAll({
  
        // Indicar quais colunas recuperar
        attributes: ['id', 'user_nome', 'user_usuario','user_senha', 'createdAt', 'updatedAt'],
  
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
      return(data)
  
    }else{
      var data = {
        code: 401,
        mensage: 'Sem Empresa cadastrado'
      };
      res.json(data);
      return(data)
  
    }
};

exports.updateUser  = async(userId, updatedUser) => {
      
   
    const usuario = await db.Users.findByPk(userId);
    if (usuario) {
       await db.Users.update(updatedUser, { where: { id: userId } })
      data = {
        code: 200,
        mensage: 'Dados do usuario atualizado com sucesso!',
       dadosUsuario: dados
      };
      res.json(data)
      return(data)


    }else{
      var data = {
        code: 401,
        mensage: 'Usuario não foi encontrado'
      };
       res.json(data);  
       return(data)
    }
};

exports.deleteUser = async(userId) => {
    const usuario = await db.Users.findByPk(userId);
    if (usuario) {
        await usuario.destroy();
        data = {
            code: 200,
            mensage: 'Usuário deletado com sucesso!',
            dadosUsuario: usuario,
          };
        res.json(data)
        return (data)
    
      }else{
        var data = {
          code: 401,
          mensage: 'Usúario não foi encontrado'
        };
        res.json(data);
        return (data)
      }
};