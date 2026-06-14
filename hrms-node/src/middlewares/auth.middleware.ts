import type { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken,} from '../utils/jwt.util.js';
import type { JwtPayload } from '../types/jwt.types.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}

const authenticate = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({
      message: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return reply.status(401).send({
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;
  } catch (err) {
    return reply.status(401).send({
      message: 'Invalid or expired token.',
    });
  }
};

const authorize = (...roles: string[]) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return reply.status(403).send({
        message: 'Forbidden. You do not have permission.',
      });
    }
  };
};

export { authenticate, authorize };