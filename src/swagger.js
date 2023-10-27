const swaggerAutogen = require("swagger-autogen");
const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

const doc = {
  info: {
    version: "3.0.3",
    title: "My API",
    description: "Documentação api <b>Residuum</b>.",
  },
  host: "localhost:8080",
  schemes: ["http", "https"],
  consumes: ["application/json", "x-www-form-urlencoded"],
  produces: ["application/json", "x-www-form-urlencoded"],
  definitions: {
    Objeto_Login:{
        $user_usuario: "Emerson",
        $user_senha: "45235",                
     }
  }
 
  
};

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
  require("../app");
});
