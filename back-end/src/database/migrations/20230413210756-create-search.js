'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Searchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      search: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING(1234)
      },
      link: {
        type: Sequelize.STRING(1234)
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      image: {
        type: Sequelize.STRING(1234)
      },
      description: {
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Searchs');
  }
};
