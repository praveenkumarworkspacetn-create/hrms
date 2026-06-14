import Fastify from 'fastify';
import cors from '@fastify/cors';
import authRoutes from './routes/auth.routes.js';

const app = Fastify({ logger: true });

app.register(cors);
app.register(authRoutes, { prefix: '/api/hrms/auth' });

export default app;