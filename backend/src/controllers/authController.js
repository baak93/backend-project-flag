const authDB = require("../db/authDB");
const encryptionService = require("../services/encryptionService");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const hash = await encryptionService.createHash(password);
  const userId = await authDB.insertUser(name, email, hash);

  if (userId === -1) {
    res.status(400).json({
      message: "Error registering user",
    });
    return;
  }

  res.json({
    userId,
    name,
    email,
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await authDB.selectUser(email);

  if (!user) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }

  const result = await encryptionService.verifyHash(user.password, password);
  if (result !== true) {
    res.status(400).json({
      status: "Fail",
      message: "wrong password",
    });
    return;
  }

  res.json({
    status: "success",
    message: "user Logged In",
  });
}

module.exports = {
  registerUser,
  loginUser,
};
