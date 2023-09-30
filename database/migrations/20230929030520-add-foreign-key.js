"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Roles", // Name of the parent model's table
        key: "id", // Name of the primary key in the parent model
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("Documents", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Name of the parent model's table
        key: "id", // Name of the primary key in the parent model
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "roleId");
    await queryInterface.removeColumn("Documents", "userId");
  },
};
