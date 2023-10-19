"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Empresas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      emp_razaosoci: {
        type: Sequelize.STRING,
      },
      emp_nomefantasia: {
        type: Sequelize.STRING,
      },
      emp_cnpj: {
        type: Sequelize.STRING,
      },
      emp_email: {
        type: Sequelize.STRING,
      },
      emp_senha: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Empresas");
  },
};
