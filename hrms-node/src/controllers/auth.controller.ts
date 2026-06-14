import type { FastifyRequest, FastifyReply } from 'fastify';
import { login as loginService, refresh as refreshService, getProfile } from '../services/auth.service.js';

const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { identifier, email, password } = req.body as { identifier?: string; email?: string; password: string };
  const loginValue = identifier || email;

  if (!loginValue || !password) {
    return reply.status(400).send({
      message: 'Email/EmployeeID and password are required.',
    });
  }

  try {
    const result = await loginService(loginValue, password);

    return reply.status(200).send({
      message: 'Login successful.',
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    });
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error.';

    return reply.status(status).send({ message });
  }
};

const refreshToken = async (req: FastifyRequest, reply: FastifyReply) => {
  const { refreshToken } = req.body as { refreshToken: string };

  if (!refreshToken) {
    return reply.status(400).send({
      message: 'Refresh token is required.',
    });
  }

  try {
    const result = await refreshService(refreshToken);

    return reply.status(200).send({
      accessToken: result.accessToken,
    });
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error.';

    return reply.status(status).send({ message });
  }
};

const getMe = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await getProfile(
      (req as any).user.id
    );

    return reply.status(200).send({ user });
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error.';

    return reply.status(status).send({ message });
  }
};

export { login, refreshToken, getMe };