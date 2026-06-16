import EmployeeLeaves from "../models/employee_leaves.model.js";
import HolidayCalendar from "../models/holiday_calendar.model.js";
import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import Department from "../models/department.model.js";
import Project from "../models/project.model.js";
import { fn, col, Op } from 'sequelize';

export const getEmpTotLeaves = async (
    userId: number,
    year: number
) => {
    const result = await EmployeeLeaves.findOne({
        attributes: [
            [fn('SUM', col('total_leaves')), 'total_leaves'],
            [fn('SUM', col('remaining_leaves')), 'remaining_leaves'],
        ],
        where: {
            user_id: userId,
            year,
            is_active: 1
        },
        raw: true,
    });

    return {
        total_leaves: Number(result?.total_leaves ?? 0),
        remaining_leaves: Number(result?.remaining_leaves ?? 0),
    };
};

export const getUpcomingHolidays = async (
    today: Date
) => {
    const result = await HolidayCalendar.findAll({
        where: {
            holiday_date: {
                [Op.gte]: today
            },
            is_active: 1
        },
        order: [['holiday_date', 'ASC']],
        limit: 5,
        raw: true,
    });

    return result;
};

export const getEmpDetails = async (
    userId: number
) => {
    const result = await User.findOne({
        attributes: [
            'id',
            'employee_id',
            'name',
            'email',
            'reporting_manager_id'
        ],
        include: [
            {
                model: User,
                as: 'reportingManager',
                attributes: ['id', 'name']
            },
            {
                model: Company,
                as: 'company',
                attributes: ['id', 'name']
            },
            {
                model: Department,
                as: 'department',
                attributes: ['id', 'name']
            },
            {
                model: Project,
                as: 'project',
                attributes: ['id', 'name']
            }
        ],
        where: {
            id: userId,
            is_active: true
        }
    });

    return result;
};

export const projectList = async (
    userId: number
) => {
    const user = await User.findOne({
        attributes: ['company_id'],
        where: {
            id: userId,
            is_active: true
        },
        raw: true
    });

    if (!user) {
        return [];
    }

    const projects = await Project.findAll({
        attributes: ['id', 'name'],
        where: {
            company_id: user.company_id,
            is_active: true
        },
        order: [['name', 'ASC']],
        raw: true
    });

    return projects;
};