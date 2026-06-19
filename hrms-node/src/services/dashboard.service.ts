import { getEmpTotLeaves, getUpcomingHolidays, getEmpDetails, projectList, getUpcomingBirthdays } from '../repositories/dashboard.repository.js';

export const getDashboardData = async (userId: number) => {
    const [empTotLeaves, upcomingHolidays, empDetails, projects, upcomingBirthdays] = await Promise.all([
        getEmpTotLeaves(userId, new Date().getFullYear()),
        getUpcomingHolidays(new Date()),
        getEmpDetails(userId),
        projectList(userId),
        getUpcomingBirthdays()
    ]);

    return {
        empTotLeaves,
        upcomingHolidays,
        empDetails,
        projects,
        upcomingBirthdays
    };
};