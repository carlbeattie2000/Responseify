const crypto = require("crypto");

const generateUniqueId = () => {
  unixTime = Date.now();

  rndBytes = crypto.randomBytes(4);

  rndNumber = rndBytes.reduce((p, c) => p += c, 0);

  return rndBytes.toString("hex")+Math.floor(unixTime / rndNumber);
}

module.exports = generateUniqueId;