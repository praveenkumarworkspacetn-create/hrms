import apiClient from "../../../lib/axios";
import { API_ENDPOINTS } from "../../../lib/constants";
import type { DashboardResponse } from "../types/dashboard.types";

export const dashboardApi = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await apiClient.get<DashboardResponse>(API_ENDPOINTS.DASHBOARD.DASHBOARD);
    return response.data;
  },
};