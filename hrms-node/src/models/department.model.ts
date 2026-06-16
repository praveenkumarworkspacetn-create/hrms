import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Department extends Model {
  declare id: number;
  declare name: string;
  declare company_id: number;
  declare is_active: boolean;
  declare readonly created_at: Date;
}

Department.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  tableName: 'departments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false, // no updated_at column in table
});

export default Department;