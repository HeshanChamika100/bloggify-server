const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Author } = require('../models');

const signup = async ({ name, email, password }) => {
  const existingUser = await Author.findOne({ where: { email } });
  if (existingUser) throw new Error('Email already in use.');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await Author.create({ name, email, password: hashedPassword });

  const token = jwt.sign(
    { authorId: newUser.id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user: { id: newUser.id, name: newUser.name, email: newUser.email }, token };
};

const login = async ({ email, password }) => {
  const user = await Author.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password.');

  const token = jwt.sign(
    { authorId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user: { id: user.id, name: user.name, email: user.email }, token };
};

module.exports = { signup, login };