const sequelize = require('../config/db');
const Author = require('./Author');
const Post = require('./Post');

// One-to-Many Relationship
Author.hasMany(Post, { foreignKey: 'authorId', onDelete: 'CASCADE', as: 'posts' });
Post.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

module.exports = { sequelize, Author, Post };