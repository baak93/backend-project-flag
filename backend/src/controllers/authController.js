const authDB = require("../db/authDB");
const encryptionService = require("../services/encryptionService");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Missing username",
    });
    return;
  }

  if (!email) {
    res.status(400).json({
      message: "Missing email",
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      message: "Missing password",
    });
    return;
  }

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

  const cookieData = {
    userEmail: user.email,
    userID: user.id,
    username: user.name,
  };
  const jsonCookieData = JSON.stringify(cookieData);

  res.cookie("LoggedIn", jsonCookieData, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({
    status: "success",
    message: "user Logged In",
  });
}

module.exports = {
  registerUser,
  loginUser,
};
