const swaggerAutogen = require("swagger-autogen");
const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Documentação api <b>Residuum</b>.",
  },
  host: "localhost:8080",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Endpoints",
    },
  ],
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
    petstore_auth: {
      type: "oauth2",
      authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
      flow: "implicit",
      scopes: {
        read_pets: "read your pets",
        write_pets: "modify pets in your account",
      },
    },
  },
  definitions: {
    Parents: {
      father: "Simon Doe",
      mother: "Marie Doe",
    },
    User: {
      name: "Jhon Doe",
      age: 29,
      parents: {
        $ref: "#/definitions/Parents",
      },
      diplomas: [
        {
          school: "XYZ University",
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: "XYZ Company",
          },
        },
      ],
    },
    AddUser: {
      $name: "Jhon Doe",
      $age: 29,
      about: "",
    },
  },
};

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
  require("../ap");
});
