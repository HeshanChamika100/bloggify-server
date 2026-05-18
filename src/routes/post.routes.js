const express = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/post.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getAll);
router.get('/:id', getOne);

// Protected routes (Require JWT Cookie)
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;