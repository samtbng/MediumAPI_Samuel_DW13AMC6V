'use strict';
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
    title: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    img: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  }, {});
  articles.associate = function (models) {
    // associations can be defined here
    articles.belongsTo(models.category, {
      foreignKey: 'category_id',
      as: 'category',
    }),
      articles.belongsTo(models.users, {
        foreignKey: 'author_id',
        as: 'users',

      })
    articles.hasMany(models.comment, { foreignKey: 'article_id' })
  };
  return articles;
};