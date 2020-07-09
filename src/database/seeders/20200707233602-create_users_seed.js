require('dotenv').config();
const { hash } = require('bcryptjs');
const { uuid } = require('uuidv4');

module.exports = {
  up: async queryInterface =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuid(),
          avatar:
            'https://images.unsplash.com/photo-1564415299969-9fa66e8e5dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
          name: 'Adiminstrador',
          email: process.env.SEED_MAIL,
          password: await hash(process.env.SEED_PASSWORD, 8),
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
