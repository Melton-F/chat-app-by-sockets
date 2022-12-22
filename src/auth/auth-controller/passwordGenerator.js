const pass = () => {
  let randomChars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let strLength = 8;
  let randomPassword = "";
  for (let i = 0; i < strLength; i++) {
    let randomNum = Math.floor(Math.random() * randomChars.length);
    randomPassword += randomChars.substring(randomNum, randomNum + 1);
  }
  return randomPassword
};

module.exports = pass