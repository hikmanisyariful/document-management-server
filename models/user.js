"use strict";
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role);
      User.hasMany(models.Document, {
        foreignKey: "userId",
      });
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
          notEmpty: {
            args: true,
            msg: "Please enter your name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your email",
          },
          notEmpty: {
            args: true,
            msg: "Please enter your email",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your password",
          },
          notEmpty: {
            args: true,
            msg: "Please enter your password",
          },
          len: {
            args: [8],
            msg: "minimum password length is 8 character",
          },
        },
      },
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          let pas = user.password;
          user.password = hashPassword(pas);
        },
        beforeUpdate: (user, options) => {
          let pas = user.password;
          user.password = hashPassword(pas);
        },
      },
    }
  );
  return User;
};
