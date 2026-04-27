const authService = require('../services/auth.service');

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await authService.login(email, password);
    return res.status(200).json({
      message: 'Login successful.',
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error.';
    return res.status(status).json({ message });
  }
};

/**
 * POST /api/auth/refresh
 * Body: { refreshToken }
 */
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required.' });
  }

  try {
    const result = await authService.refresh(refreshToken);
    return res.status(200).json({
      accessToken: result.accessToken,
    });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error.';
    return res.status(status).json({ message });
  }
};

/**
 * GET /api/auth/me
 * Requires: authenticate middleware
 */
const getMe = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    return res.status(200).json({ user });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error.';
    return res.status(status).json({ message });
  }
};

module.exports = { login, getMe, refreshToken };
