const authService = require('../services/auth.service');
const authorService = require('../services/author.service');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week in milliseconds
  path: '/',
  sameSite: 'lax',
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const { user, token } = await authService.signup({ name, email, password });
    res.cookie('auth_token', token, cookieOptions);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { user, token } = await authService.login({ email, password });
    res.cookie('auth_token', token, cookieOptions);
    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = (req, res) => {
  // Clear cookie using same options to ensure it's removed in browser
  res.cookie('auth_token', '', { ...cookieOptions, maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await authorService.getCurrentUser(req.user.authorId);
    res.status(200).json({ user });
  } catch (error) {
    const status = error.message === 'Author not found' ? 401 : 401;
    res.status(status).json({ error: error.message === 'Author not found' ? 'User not found' : 'Invalid token' });
  }
};

module.exports = { signup, login, logout, getCurrentUser };