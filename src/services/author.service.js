const bcrypt = require('bcryptjs');
const authorRepo = require('../repositories/author.repository');

const updateProfile = async (authorId, { name, email, password }) => {
  const author = await authorRepo.findById(authorId);
  if (!author) throw new Error('Author not found');

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  
  // If they want to change their password, hash the new one
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  // FIX 1: We name the first variable 'affectedCount' instead of '_'
  const [affectedCount, [updatedAuthor]] = await authorRepo.updateAuthor(authorId, updateData);
  
  // FIX 2: We extract 'password' but don't alias it to '_'. We just leave it behind!
  const { password: omittedPassword, ...authorWithoutPassword } = updatedAuthor.toJSON();
  
  return authorWithoutPassword;
};

module.exports = { updateProfile };