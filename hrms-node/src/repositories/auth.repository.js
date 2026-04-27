const User = require('../models/user.model');
const { Op } = require('sequelize');

/**
 * Find a user by their email or employee ID.
 * @param {string} identifier
 * @returns {Promise<object|null>}
 */
const findUserByIdentifier = async (identifier) => {
  return await User.findOne({
    where: {
      [Op.or]: [
        { email: identifier },
        { employee_id: identifier }
      ],
      is_active: true
    }
  });
};

/**
 * Find a user by their ID.
 * @param {number} id
 * @returns {Promise<object|null>}
 */
const findUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] } // Security: don't return password
  });
};

module.exports = { findUserByIdentifier, findUserById };
