const express = require('express');
const { editProfile, getMyPosts } = require('../controllers/author.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Apply verifyToken middleware to protect these routes
router.put('/profile', verifyToken, editProfile);
router.get('/history', verifyToken, getMyPosts);

module.exports = router;