const authDB = require("../db/authDB");
const encryptionService = require("../services/encryptionService");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const hash = await encryptionService.createHash(password);
  const userId = await authDB.insertUser(name, email, hash);

  // console.log(password);
  // console.log(hash);
  // console.log(userId);

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

module.exports = {
  registerUser,
};
