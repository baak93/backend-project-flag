const baseDomain = "http://localhost:3000";

async function getCookies() {
  const options = {
    credentials: "include",
  };
  const response = await fetch(baseDomain + "/cookies", options);
  const result = await response.json();

  return result;
}

export default {
  getCookies,
};
