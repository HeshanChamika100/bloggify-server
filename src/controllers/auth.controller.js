const authService = require('../services/auth.service');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week in milliseconds
  path: '/',
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
  res.cookie('auth_token', '', { maxAge: 0, path: '/' });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, logout };