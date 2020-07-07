module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Professors',
      [
        {
          name: 'Rafael Vieira',
          email: 'rafaelleveske@gmail.com',
          password: '123456',
          graduation: 'marrom',
        },
        {
          name: 'Bira Fernandes',
          email: 'birafernandes@gmail.com',
          password: '123456',
          graduation: 'preta',
        },
        {
          name: 'Danilo Fioretti',
          email: 'danilofioretti@gmail.com',
          password: '123456',
          graduation: 'preta',
        },
        {
          name: 'Darchan Rigamontt',
          email: 'darchanrigamontt@gmail.com',
          password: '123456',
          graduation: 'preta',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Professors', null, {}),
};
