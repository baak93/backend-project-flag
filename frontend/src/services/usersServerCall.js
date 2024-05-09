const baseDomain = "http://localhost:3000";

async function registerUser(username, email, password) {
  const body = {
    name: username,
    email,
    password,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(baseDomain + "/sign-up", options);
  const result = await response.json();

  return result;
}

export default {
  registerUser,
};
