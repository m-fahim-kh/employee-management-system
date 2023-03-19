/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('attendances', [
      {
        userId: 1,
        date: (function () { this.setDate(this.getDate() - 1); return this; })
          .call(new Date()),
        loginTime: new Date().toTimeString().substring(0, 8),
        logoutTime: new Date().toTimeString().substring(0, 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        date: (function () { this.setDate(this.getDate() - 2); return this; })
          .call(new Date()),
        loginTime: new Date().toTimeString().substring(0, 8),
        logoutTime: new Date().toTimeString().substring(0, 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        date: (function () { this.setDate(this.getDate() - 3); return this; })
          .call(new Date()),
        loginTime: new Date().toTimeString().substring(0, 8),
        logoutTime: new Date().toTimeString().substring(0, 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
