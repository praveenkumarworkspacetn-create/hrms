import { useState } from 'react';
import { authApi } from '../api/authApi';
import { tokenService } from '../../../services/tokenService';
import type { LoginRequest } from '../types/auth.types';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(data);
      
      // Store tokens and user data using tokenService
      tokenService.setAccessToken(response.accessToken);
      tokenService.setRefreshToken(response.refreshToken);
      tokenService.setUser(response.user);

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
