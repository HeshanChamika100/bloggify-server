const postService = require('../services/post.service');

const getAll = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
};

const getOne = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }
    
    // We grab the authorId directly from the JWT via the middleware!
    const authorId = req.user.authorId; 
    const newPost = await postService.createPost(authorId, { title, content });
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.user.authorId, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    const status = error.message.includes('Forbidden') ? 403 : 404;
    res.status(status).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.user.authorId);
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    const status = error.message.includes('Forbidden') ? 403 : 404;
    res.status(status).json({ error: error.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };