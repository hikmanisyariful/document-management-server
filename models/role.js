"use strict";

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: DataTypes.STRING,
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "roleId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Role;
};
