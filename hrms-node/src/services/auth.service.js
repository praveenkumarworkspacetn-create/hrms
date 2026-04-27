const bcrypt = require('bcrypt');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt.util');
const { findUserByIdentifier, findUserById } = require('../repositories/auth.repository');

/**
 * Authenticate a user with email/employeeID and password.
 * Returns signed tokens and user info.
 */
const login = async (identifier, password) => {
  const userInstance = await findUserByIdentifier(identifier);
  if (!userInstance) {
    throw { status: 401, message: 'Invalid credentials.' };
  }

  const user = userInstance.get({ plain: true });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Invalid credentials.' };
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    company_id: user.company_id,
  };

  const accessToken = generateToken(payload);
  const refreshToken = generateRefreshToken({ id: user.id });

  const { password: _pw, ...safeUser } = user;

  return { accessToken, refreshToken, user: safeUser };
};

/**
 * Refresh an Access Token using a Refresh Token.
 */
const refresh = async (token) => {
  try {
    const decoded = verifyRefreshToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      throw { status: 401, message: 'Invalid refresh token.' };
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      company_id: user.company_id,
    };

    const accessToken = generateToken(payload);
    return { accessToken };
  } catch (err) {
    throw { status: 401, message: 'Session expired. Please login again.' };
  }
};

/**
 * Get the authenticated user's profile by ID.
 * @param {number} userId
 * @returns {Promise<object>}
 */
const getProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw { status: 404, message: 'User not found.' };
  }
  return user;
};

module.exports = { login, getProfile, refresh };
