const { Post } = require('../models');

const findPostsByAuthorId = async (authorId) => {
  return await Post.findAll({
    where: { authorId },
    order: [['createdAt', 'DESC']], // Newest first
  });
};

module.exports = { findPostsByAuthorId };