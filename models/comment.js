'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    article_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  comment.associate = function (models) {
    // associations can be defined here
    comment.belongsTo(models.articles, {
      foreignKey: 'article_id',
      as: 'articles',
    }),

      comment.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'users',
      })
  };
  return comment;
};