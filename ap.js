const express = require("express");
const cors = require("cors"); // Importar a biblioteca cors
// var swaggerUI = require('swagger-express-mw');
// var swaggerfile = require('./src/swagger-ui_output.json');
const app = express();
// jwt sessão

// Permitir a conexão das portas diferentes do fron e back
app.use(cors());

// para podermos enviar os dados em formato json no thunder
app.use(express.json());
app.use(express.urlencoded( {extended:true}));

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerfile));
const rou = require("./src/routes/index");
app.use("/", rou);

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});