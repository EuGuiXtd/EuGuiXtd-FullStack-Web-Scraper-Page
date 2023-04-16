"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("searches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      search: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      site: {
        type: Sequelize.STRING(1234),
      },
      link: {
        type: Sequelize.STRING(1234),
      },
      price: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING(1234),
      },
      description: {
        type: Sequelize.STRING,
      },
      web: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("searches");
  },
};
