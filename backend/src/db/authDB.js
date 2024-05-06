const connection = require("./connection");

async function insertUser(name, email, hash) {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  const params = [name, email, hash];
  try {
    const result = await connection.promise().query(query, params);
    return result[0].insertId;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

async function selectUser(email) {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const result = await connection.promise().query(sql, [email]);

  const rows = result[0];
  if (rows.length === 1) {
    return rows[0];
  } else {
    return undefined;
  }
}

module.exports = {
  insertUser,
  selectUser,
};
