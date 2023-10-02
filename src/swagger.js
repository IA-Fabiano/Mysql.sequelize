const swaggerAutogen = require('swagger-autogen')
const outputFile ='./swagger/_output.json'
const endpointsFile = ['./routes/*.js']

const doc = {
    info: {
        title:"API Documentation",
        version:"1.0.0",
        description:"Documentação da API"

    },
  
    
    paths:
      users:
        get:
          summary: Retorna todos os usuários
          description: Retorna uma lista de todos os usuários.
          responses:
            '200':
              description: Requisição bem-sucedida
              content:
                application/json:
                  schema:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'

}

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
    require('../app.js')
})