const pool = require('../config/db');

/**
 * Find a user by their email address.
 * @param {string} email
 * @returns {Promise<object|null>}
 */
const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT id, employee_id, name, email, password, role, company_id, department_id, is_active
     FROM users
     WHERE email = ? AND is_active = 1
     LIMIT 1`,
    [email]
  );
  return rows[0] || null;
};

/**
 * Find a user by their ID.
 * @param {number} id
 * @returns {Promise<object|null>}
 */
const findUserById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT id, employee_id, name, email, role, company_id, department_id, is_active
     FROM users
     WHERE id = ? AND is_active = 1
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
};

module.exports = { findUserByEmail, findUserById };
