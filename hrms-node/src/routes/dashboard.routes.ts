import type { FastifyInstance } from 'fastify';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getDashboard } from '../controllers/dashboard.controller.js';

async function dashboardRoutes(fastify: FastifyInstance) {
  fastify.get('/dashboard', { preHandler: authenticate }, getDashboard);
}

export default dashboardRoutes;