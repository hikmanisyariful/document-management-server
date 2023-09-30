const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function (payload) {
    let token = jwt.sign(payload, "secret");
    return token;
  },
  verifyToken: function (token) {
    return jwt.verify(token, "secret");
  },
};
