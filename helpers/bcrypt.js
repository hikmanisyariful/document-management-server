const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  hashPassword: function (password) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  checkPassword: function (inputPassword, hash) {
    return bcrypt.compareSync(inputPassword, hash);
  },
};
