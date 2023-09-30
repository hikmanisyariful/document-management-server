"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "johndoe01",
          email: "johndoe01@mail.com",
          password: "secret",
          roleId: 1,
        },
        {
          username: "johndoe02",
          email: "johndoe02@mail.com",
          password: "secret",
          roleId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
