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
        {
          username: "johndoe03",
          email: "johndoe03@mail.com",
          password: "secret",
          roleId: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
