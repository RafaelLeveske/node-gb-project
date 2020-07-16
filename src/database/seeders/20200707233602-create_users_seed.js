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
          avatar: process.env.SEED_AVATAR_URL,
          name: process.env.SEED_NAME,
          email: process.env.SEED_MAIL,
          password: await hash(process.env.SEED_PASSWORD, 8),
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
