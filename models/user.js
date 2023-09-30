"use strict";
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      hooks: {
        beforeCreate: (user, options) => {
          let pas = user.password;
          user.password = hashPassword(pas);
        },
      },
      sequelize,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Document, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
