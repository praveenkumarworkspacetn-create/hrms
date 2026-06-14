export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/hrms';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  EMPLOYEES: {
    LIST: '/employees',
    CREATE: '/employees',
    UPDATE: '/employees/:id',
    DELETE: '/employees/:id',
    DETAIL: '/employees/:id',
  },
  ATTENDANCE: {
    LIST: '/attendance',
    CREATE: '/attendance',
    UPDATE: '/attendance/:id',
  },
  PAYROLL: {
    LIST: '/payroll',
    CREATE: '/payroll',
    UPDATE: '/payroll/:id',
  },
  LEAVE: {
    LIST: '/leave',
    CREATE: '/leave',
    APPROVE: '/leave/:id/approve',
    REJECT: '/leave/:id/reject',
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
} as const;
