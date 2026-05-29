const { Post, Author } = require('../models');

const getAllPosts = async () => {
  return await Post.findAll({
    include: [{ model: Author, as: 'author', attributes: ['id', 'name', 'email'] }],
    order: [['createdAt', 'DESC']],
  });
};

const getPostById = async (id) => {
  const post = await Post.findByPk(id, {
    include: [{ model: Author, as: 'author', attributes: ['id', 'name', 'email'] }],
  });
  if (!post) throw new Error('Post not found');
  return post;
};

const createPost = async (authorId, { title, content }) => {
  return await Post.create({ title, content, authorId });
};

const updatePost = async (postId, authorId, { title, content }) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error('Post not found');
  if (post.authorId !== authorId) throw new Error('Forbidden. You can only update your own posts.');

  return await post.update({ title, content });
};

const deletePost = async (postId, authorId) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error('Post not found');
  if (post.authorId !== authorId) throw new Error('Forbidden. You can only delete your own posts.');

  await post.destroy();
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };