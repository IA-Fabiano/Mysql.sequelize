const swaggerAutogen = require("swagger-autogen");
const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Documentação api <b>Residuum</b>.",
  },
  schemes: ["http", "https"],
  consumes: ["application/json", "x-www-form-urlencoded"],
  produces: ["application/json", "x-www-form-urlencoded"],
  tags: [
    {
      name: "Users",
      description: " Rotas direcionadas ao usuario",
    },

    {
      name: "Empresas",
      description: "Rota direcionadas a Empresa",
    },

    {
      name: "Login",
      description: " Rotas direcionadas ao Login",
    },
  ],
  paths: {
    "/users": {
      post: {
        summary: "Cadastrar um novo usuário",
        tags: ["Users"],
        description: "Cadastra um novo usuário no sistema.",
        requestBody: {
          description: "Dados do usuário a ser cadastrado.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user_nome: {
                    type: "string",
                    description: "Nome do usuário.",
                  },
                  user_usuario: {
                    type: "string",
                    description: "Nome de usuário.",
                  },
                  user_senha: {
                    type: "string",
                    description: "Senha do usuário.",
                  },
                },
                required: ["user_nome", "user_usuario", "user_senha"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário cadastrado com sucesso.",
          },
          401: {
            description:
              "Erro de validação (verifique se os campos necessários foram fornecidos).",
          },
        },
      },
    },
    "/users": {
      get: {
        summary: "Listar todos os usuários",
        description:
          "Retorna a lista de todos os usuários cadastrados no sistema.",
        tags: ["Users"],
        responses: {
          200: {
            description: "Lista de usuários.",
          },
          401: {
            description: "Nenhum usuário cadastrado.",
          },
        },
      },
    },
    "/users/{id}": {
      delete: {
        summary: "Deletar um usuário",
        description: "Deleta um usuário com base no ID fornecido.",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID do usuário a ser excluído.",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Usuário deletado com sucesso.",
          },
          401: {
            description: "Usuário não encontrado.",
          },
        },
      },
    },
    "/users/{id}": {
      put: {
        summary: "Atualizar informações de um usuário",
        description: "Atualiza as informações de um usuário existente.",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID do usuário a ser atualizado.",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          description: "Dados do usuário a serem atualizados.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user_nome: {
                    type: "string",
                    description: "Novo nome do usuário.",
                  },
                  user_usuario: {
                    type: "string",
                    description: "Novo nome de usuário.",
                  },
                  user_senha: {
                    type: "string",
                    description: "Nova senha do usuário.",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário atualizado com sucesso.",
          },
          401: {
            description: "Usuário não encontrado.",
          },
        },
      },
    },
    "/empresa": {
      post: {
        summary: "Cadastrar uma nova empresa",
        description: "Cadastra uma nova empresa no sistema",
        tags: ["Empresas"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  emp_razaosoci: {
                    type: "string",
                    description: "Razão Social da empresa",
                  },
                  emp_cnpj: {
                    type: "string",
                    description: "CNPJ da empresa",
                  },
                  emp_email: {
                    type: "string",
                    description: "Email da empresa",
                  },
                  emp_senha: {
                    type: "string",
                    description: "Senha da empresa",
                  },
                },
                required: [
                  "emp_razaosoci",
                  "emp_cnpj",
                  "emp_email",
                  "emp_senha",
                ],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Empresa cadastrada com sucesso",
          },
          401: {
            description:
              "Erro de validação (verifique se os campos necessários foram fornecidos)",
          },
        },
      },
    },
    "/empresa": {
      get: {
        summary: "Listar todas as empresas",
        description:
          "Retorna a lista de todas as empresas cadastradas no sistema",
        tags: ["Empresas"],
        responses: {
          200: {
            description: "Lista de empresas",
          },
          401: {
            description: "Nenhuma empresa cadastrada",
          },
        },
      },
    },
    "/empresa/{id}": {
      delete: {
        summary: "Deletar uma empresa",
        description: "Deleta uma empresa com base no ID fornecido",
        tags: ["Empresas"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID da empresa a ser excluída",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Empresa deletada com sucesso",
          },
          401: {
            description: "Empresa não encontrada",
          },
        },
      },
    },
    "/empresa/{id}": {
      put: {
        summary: "Atualizar informações de uma empresa",
        description: "Atualiza as informações de uma empresa existente",
        tags: ["Empresas"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID da empresa a ser atualizada",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  emp_razaosoci: {
                    type: "string",
                    description: "Nova razão social da empresa",
                  },
                  emp_cnpj: {
                    type: "string",
                    description: "Novo CNPJ da empresa",
                  },
                  emp_email: {
                    type: "string",
                    description: "Novo email da empresa",
                  },
                  emp_senha: {
                    type: "string",
                    description: "Nova senha da empresa",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Empresa atualizada com sucesso",
            },
            401: {
              description: "Empresa não encontrada",
            },
          },
        },
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
  require("../app");
});
