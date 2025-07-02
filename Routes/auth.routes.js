const express = require("express");
const router = express.Router();

const authController = require("../Controllers/auth.controller");
// Test simple pour vérifier que le routeur fonctionne


router.post("/", authController.createUser);
// router.get("/", authController.createUser);

module.exports = router;
