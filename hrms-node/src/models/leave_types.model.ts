import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class LeaveType extends Model {
  declare id: number;
  declare leave_type: string;
  declare description: string | null;
  declare is_active: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

LeaveType.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  leave_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  tableName: 'leave_types',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default LeaveType;