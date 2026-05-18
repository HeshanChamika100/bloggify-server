import { Post } from '../models';

const findPostsByAuthorId = async (authorId) => {
  return await Post.findAll({
    where: { authorId },
    order: [['createdAt', 'DESC']], // Newest first
  });
};

export default { findPostsByAuthorId };