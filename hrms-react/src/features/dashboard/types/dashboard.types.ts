export interface DashboardResponse {
  empTotLeaves: {
    total_leaves: number;
    remaining_leaves: number;
  };
  upcomingHolidays: {
    id: number;
    year: number;
    holiday_date: string;
    holiday_name: string;
  }[];
  empDetails: {
    id: number;
    employee_id: string;
    name: string;
    email: string;
    reporting_manager_id: number;
    reportingManager: {
      id: number;
      name: string;
    };
    company: {
      id: number;
      name: string;
    };
    department: {
      id: number;
      name: string;
    };
    project: {
      id: number;
      name: string;
    };
  };
  projects: {
    id: number;
    name: string;
  }[];
  upcomingBirthdays: {
    id: number;
    name: string;
    date_of_birth: string;
  }[];
}