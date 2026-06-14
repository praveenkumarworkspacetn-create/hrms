import type { FastifyInstance } from 'fastify';
import { login, getMe, refreshToken } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', login);
  fastify.post('/refresh', refreshToken);
  fastify.get('/me', { preHandler: authenticate }, getMe);
}

export default authRoutes;