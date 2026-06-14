interface UserDTO {
  id: number;
  email: string;
  role: string;
  company_id: number;
  password: string;
  [key: string]: any;
}

interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: Omit<UserDTO, 'password'>;
}

interface RefreshResult {
  accessToken: string;
}

export type { UserDTO, LoginResult, RefreshResult };
