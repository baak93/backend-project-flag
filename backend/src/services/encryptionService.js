const argon2 = require("argon2");

async function createHash(password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function verifyHash(hash, password) {
  try {
    const result = await argon2.verify(hash, password);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  createHash,
  verifyHash,
};
