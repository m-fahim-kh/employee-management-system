/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date(),
      password: '123',
      username: 'john1',
      roleId: 1,
      email: 'john@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Johnda',
      lastName: 'Doeda',
      dateOfBirth: new Date(),
      password: '1234',
      username: 'john2',
      roleId: 2,
      email: 'johnda@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Hrishi',
      lastName: 'Jadhav',
      dateOfBirth: new Date(),
      password: '1234',
      username: 'hrishijadhav',
      roleId: 3,
      email: 'hrishijadhav@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bul
kDelete('People', null, {});
     */
  },
};
