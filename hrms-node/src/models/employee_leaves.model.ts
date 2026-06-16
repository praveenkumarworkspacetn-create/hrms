import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class EmployeeLeaves extends Model {
  declare id: number;
  declare user_id: number;
  declare year: number;
  declare leave_type_id: number;
  declare total_leaves: number;
  declare remaining_leaves: number;
  declare is_active: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

EmployeeLeaves.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    leave_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total_leaves: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    remaining_leaves: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'employee_leaves',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    indexes: [
      {
        unique: true,
        name: 'uk_user_year_leave_type',
        fields: ['user_id', 'year', 'leave_type_id'],
      },
    ],
  }
);

export default EmployeeLeaves;