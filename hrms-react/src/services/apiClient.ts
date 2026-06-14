import apiClient from '../lib/axios';

export const apiService = {
  get: <T>(url: string) => apiClient.get<T>(url),
  post: <T>(url: string, data: any) => apiClient.post<T>(url, data),
  put: <T>(url: string, data: any) => apiClient.put<T>(url, data),
  delete: <T>(url: string) => apiClient.delete<T>(url),
  patch: <T>(url: string, data: any) => apiClient.patch<T>(url, data),
};
