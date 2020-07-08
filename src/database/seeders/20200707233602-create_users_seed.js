require('dotenv').config();
const { uuid } = require('uuidv4');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuid(),
          avatar:
            'https://images.unsplash.com/photo-1564415299969-9fa66e8e5dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
          name: 'Adiminstrador',
          email: process.env.SEED_MAIL,
          password: process.env.SEED_PASSWORD,
          graduation: 'marrom',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
