import { getDashboardData } from '../services/dashboard.service.js';
import type { FastifyRequest, FastifyReply } from 'fastify';

export const getDashboard = async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = (request.user as any)?.id;
    const data = await getDashboardData(userId);
    reply.send(data);
};