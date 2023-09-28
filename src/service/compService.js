const db = require("../db/models/index");

exports.createComp = async(newUser, { soci, impo }) => {
    if(newUser.emp_razaosoci){ 
        if(newUser.emp_cnpj){ 
            if(newUser.emp_email){

             
                console.log(newUser);       
                
                const usu = await db.Empresas.findOne({
                  // Indicar quais colunas recuperar
                  attributes: ['id', 'emp_nomefantasia', 'emp_razaosoci', 'emp_cnpj','emp_email'],
          
                  // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
                  where: { impo }, 
              });
                console.log(usu)
    
              
                if(!usu){
    
            
                   const dadosUsuario = await db.Empresas.create(newUser);
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
                    mensage: 'CNPJ ja esta em uso'
                  };
                  res.json(data);
                  console.log(data);
                  return(data)
                  } // aqui termina o  validar
              

            }else{ // se não do password
              var data = {
                code: 401,
                mensage: 'Coloque um email'
              };
              res.json(data);
              return(data)
            } 
        }else{  // se não do nome
              var data = {
                code: 401,
                mensage: 'Coloque um CNPJ' 
              };
              res.json(data);
              return(data)
             }
    }else{ // se não do Username
            var data = {
                code: 401,
                mensage: 'coloque a razão social '
            };
               res.json(data);
               return(data)
          }
  
};

exports.listComp = async() => {
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

exports.updateComp  = async(userId, updatedUser) => {
      
   
    const usuario = await db.Empresas.findByPk(userId);
    if (usuario) {
       await db.Empresas.update(updatedUser, { where: { id: userId } })
      data = {
        code: 200,
        mensage: 'Dados da Empresa atualizado com sucesso!',
       dadosUsuario: dados
      };
      res.json(data)
      return(data)


    }else{
      var data = {
        code: 401,
        mensage: 'Empresa não foi encontrado'
      };
       res.json(data);  
       return(data)
    }
};

exports.deleteComp = async(userId) => {
    const usuario = await db.Empresas.findByPk(userId);
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