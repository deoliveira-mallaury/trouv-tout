const express = require("express");
const router = express.Router();

const usersController = require("../Controllers/users.controller");
// Test simple pour vérifier que le routeur fonctionne

router.get("/", usersController.getUser);

module.exports = router;
