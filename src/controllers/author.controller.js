const authorService = require('../services/author.service');
const postService = require('../services/post.service');

const editProfile = async (req, res) => {
  try {
    const authorId = req.user.authorId;
    const updatedUser = await authorService.updateProfile(authorId, req.body);
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const authorId = req.user.authorId;
    const posts = await postService.getAuthorHistory(authorId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post history' });
  }
};

module.exports = { editProfile, getMyPosts };