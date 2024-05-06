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

module.exports = {
  insertUser,
};
