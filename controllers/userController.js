const { User, Role } = require("../models");

const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    let payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId,
    };
    try {
      const user = await User.create(payload);
      res.status(201).json({
        message:
          "Registration is Successfully. Please check email for verification",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
        include: [
          {
            model: Role,
          },
        ],
      });
      if (!user) {
        next({
          name: "Invalid Email/Password",
        });
        return;
      }
      let status = checkPassword(req.body.password, user.password);
      if (!status) {
        next({
          name: "Invalid Email/Password",
        });
        return;
      }
      let payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.Role.name,
      };
      let token = generateToken(payload);
      res.status(200).json({
        access_token: token,
        username: payload.username,
        role: user.Role.name,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
