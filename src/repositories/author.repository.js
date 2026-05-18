const { Author } = require('../models');

const findById = async (id) => {
  return await Author.findByPk(id);
};

const updateAuthor = async (id, updateData) => {
  return await Author.update(updateData, {
    where: { id },
    returning: true, // Returns the updated row
  });
};

module.exports = { findById, updateAuthor };