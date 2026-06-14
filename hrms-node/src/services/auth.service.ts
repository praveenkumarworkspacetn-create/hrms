import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken, verifyRefreshToken,} from '../utils/jwt.util.js';
import { findUserByIdentifier, findUserById } from '../repositories/auth.repository.js';
import type { JwtPayload, RefreshPayload } from '../types/jwt.types.js';
import type { LoginResult, RefreshResult, UserDTO } from '../types/auth.types.js';

/**
 * Authenticate a user with email/employeeID and password.
 * Returns signed tokens and user info.
 */
const login = async (identifier: string, password: string): Promise<LoginResult> => {
  const userInstance = await findUserByIdentifier(identifier);
  if (!userInstance) {
    throw { status: 401, message: 'Invalid credentials.' };
  }

  const user = userInstance.get({ plain: true }) as UserDTO;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Invalid credentials.' };
  }

  const payload: JwtPayload = {
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
const refresh = async (token: string): Promise<RefreshResult> => {
  try {
    const decoded = verifyRefreshToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      throw { status: 401, message: 'Invalid refresh token.' };
    }

    const payload: JwtPayload = {
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
 * @param userId - The user ID
 * @returns The user profile
 */
const getProfile = async (userId: number): Promise<any> => {
  const user = await findUserById(userId);
  if (!user) {
    throw { status: 404, message: 'User not found.' };
  }
  return user;
};

export { login, getProfile, refresh };
