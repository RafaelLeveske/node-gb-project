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
          name: 'Rafael Vieira',
          email: 'rafaelleveske@gmail.com',
          password: '123456',
          graduation: 'marrom',
        },
        {
          id: uuid(),
          avatar:
            'https://images.unsplash.com/photo-1564415299969-9fa66e8e5dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',

          name: 'Bira Fernandes',
          email: 'birafernandes@gmail.com',
          password: '123456',
          graduation: 'preta',
        },
        {
          id: uuid(),
          avatar:
            'https://images.unsplash.com/photo-1564415299969-9fa66e8e5dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',

          name: 'Darchan Rigamontt',
          email: 'darchanrigamontt@gmail.com',
          password: '123456',
          graduation: 'preta',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
