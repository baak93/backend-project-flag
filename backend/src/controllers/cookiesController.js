function getCookies(req, res) {
  const cookies = req.cookies;
  res.json(cookies);
}

function logout(req, res) {
  res.clearCookie("LoggedIn");
  res.status(200).json({ message: "User logged out" });
}

module.exports = {
  getCookies,
  logout,
};
