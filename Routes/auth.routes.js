const express = require("express");
const router = express.Router();

const authController = require("../Controllers/auth.controller");
// Test simple pour vérifier que le routeur fonctionne


router.post("/", authController.createUser);
router.post("/login", authController.login);
router.get("/:id", authController.login);

module.exports = router;
