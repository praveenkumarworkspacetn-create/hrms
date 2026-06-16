import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class HolidayCalendar extends Model {
  declare id: number;
  declare year: number;
  declare holiday_date: Date;
  declare holiday_name: string;
  declare created_by: number | null;
  declare modified_by: number | null;
  declare is_active: boolean;
  declare readonly created_at: Date;
  declare readonly modified_at: Date;
}

HolidayCalendar.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  holiday_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true,
  },
  holiday_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  modified_by: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  tableName: 'holiday_calendar',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
});

export default HolidayCalendar;