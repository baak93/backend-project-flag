const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);

module.exports = router;
