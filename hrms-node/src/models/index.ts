import Company from './company.model.js';
import Department from './department.model.js';
import EmployeeLeaves from './employee_leaves.model.js';
import HolidayCalendar from './holiday_calendar.model.js';
import LeaveType from './leave_types.model.js';
import Project from './project.model.js';
import User from './user.model.js';

// Define associations after all models are imported to avoid circular dependencies

// Company associations
Company.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Company.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Department associations
Department.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

// EmployeeLeaves associations
EmployeeLeaves.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
EmployeeLeaves.belongsTo(LeaveType, { foreignKey: 'leave_type_id', as: 'leaveType' });

// HolidayCalendar associations
HolidayCalendar.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
HolidayCalendar.belongsTo(User, { foreignKey: 'modified_by', as: 'modifier' });

// Project associations
Project.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
Project.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Project.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// User associations
User.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
User.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
User.belongsTo(User, { foreignKey: 'reporting_manager_id', as: 'reportingManager' });
User.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
User.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

export { Company, Department, EmployeeLeaves, HolidayCalendar, LeaveType, Project, User };
