import Fastify from 'fastify';
import cors from '@fastify/cors';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = Fastify({ logger: false });

app.register(cors);
app.register(authRoutes, { prefix: '/api/hrms/auth' });
app.register(dashboardRoutes, { prefix: '/api/hrms' });

export default app;