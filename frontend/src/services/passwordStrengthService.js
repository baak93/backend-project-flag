function checkPasswordStrength(password) {
  const atLeastMinimumLength = (password) =>
    new RegExp(/(?=.{8,})/).test(password);
  const atLeastOneUppercaseLetter = (password) =>
    new RegExp(/(?=.*?[A-Z])/).test(password);
  const atLeastOneLowercaseLetter = (password) =>
    new RegExp(/(?=.*?[a-z])/).test(password);
  const atLeastOneNumber = (password) =>
    new RegExp(/(?=.*?[0-9])/).test(password);
  const atLeastOneSpecialChar = (password) =>
    new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

  let strength = 0;

  if (atLeastMinimumLength(password)) strength++;
  if (atLeastOneUppercaseLetter(password)) strength++;
  if (atLeastOneLowercaseLetter(password)) strength++;
  if (atLeastOneNumber(password)) strength++;
  if (atLeastOneSpecialChar(password)) strength++;

  switch (strength) {
    case 5:
      return "Senha forte";
    case 4:
      return "Senha média";
    case 3:
      return "Senha fraca";
    default:
      return "Senha muito fraca";
  }
}

function getPasswordStrengthColor(strength) {
  switch (strength) {
    case "Senha forte":
      return "green";
    case "Senha média":
      return "orange";
    case "Senha fraca":
      return "red";
    case "Senha muito fraca":
      return "darkred";
    default:
      return "grey";
  }
}

export default {
  checkPasswordStrength,
  getPasswordStrengthColor,
};
