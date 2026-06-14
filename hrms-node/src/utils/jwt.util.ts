import jwt from 'jsonwebtoken';
import type { JwtPayload, RefreshPayload } from '../types/jwt.types.js';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

/**
 * Sign and return an Access Token.
 */
const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

/**
 * Sign and return a Refresh Token.
 */
const generateRefreshToken = (payload: RefreshPayload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN } as jwt.SignOptions);
};

/**
 * Verify and decode an Access Token.
 */
const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

/**
 * Verify and decode a Refresh Token.
 */
const verifyRefreshToken = (token: string): RefreshPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshPayload;
};

export {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
