import apiClient from '../../../lib/axios';
import { API_ENDPOINTS } from '../../../lib/constants';
import type { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '../types/auth.types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, data);
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },
};
