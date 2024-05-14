function getCookies(req, res) {
  //   const userEmail = req.headers.cookie.userEmail;
  //   const userID = req.headers.cookie.userID;

  //   res.json({ userEmail, userID });

  const cookies = req.cookies;
  res.json(cookies);
}

module.exports = {
  getCookies,
};
