interface JwtPayload {
  id: number;
  email: string;
  role: string;
  company_id: number;
}

interface RefreshPayload {
  id: number;
}

export type { JwtPayload, RefreshPayload };