const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = 8080;

// Configuração do Swagger
const swaggerDefinition = {
  openapi: '3.0.0', // Versão do Swagger
  info: {
    title: 'API Documentation', // Título da API
    version: '1.0.0', // Versão da API
    description: 'Documentação da API', // Descrição da API
  },
};

const options = {
  swaggerDefinition,
  // Listar todos os arquivos que contêm as rotas da sua API aqui
  apis: ['./routes/*.js'], // Exemplo: './routes/*.js'
};

const swaggerSpec = swaggerJSDoc(options);

// Rota de exibição da documentação Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Outras configurações e rotas do Express aqui

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});