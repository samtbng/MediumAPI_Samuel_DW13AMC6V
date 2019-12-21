'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [
      {
        article_id: 1,
        user_id: 1,
        comment: "Keren sekali"
      },
      {
        article_id: 1,
        user_id: 2,
        comment: "Keren sekali"
      },
      {
        article_id: 2,
        user_id: 3,
        comment: "huh biasa aja"
      },
      {
        article_id: 2,
        user_id: 1,
        comment: "Ga boleh ngomong gitu!"
      },
      {
        article_id: 3,
        user_id: 2,
        comment: "Sangat membantu! terima kasihhh"
      },
      {
        article_id: 3,
        user_id: 4,
        comment: "Sama sama, senang bisa membantu :)"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {})
  }
};
