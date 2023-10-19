//https://github.com/DevThiagoSoares/api-test/blob/main/backend/src/routes/index.js

const express = require("express");
const router = express.Router();

//LOGIN
const loginController = require("../controllers/login");
router.post("/login", loginController.login);

//USERS
const userController = require("../controllers/users");
router.post("/users", userController.createUser);
router.get("/users", userController.listUsers);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

//COMPANY
const compController = require("../controllers/empresa");
router.post("/empresa", compController.createComp);
router.get("/empresa", compController.listComp);
router.put("/empresa/:id", compController.updateComp);
router.delete("/empresa/:id", compController.deleteComp);

module.exports = router;
