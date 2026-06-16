import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Company extends Model {
  declare id: number;
  declare name: string;
  declare is_active: boolean;
  declare created_by: number | null;
  declare updated_by: number | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Company.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'companies',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Company;