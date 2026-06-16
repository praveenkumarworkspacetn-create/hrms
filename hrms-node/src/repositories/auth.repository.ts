import User from '../models/user.model.js';
import { Op } from 'sequelize';

const findUserByIdentifier = async (identifier: string) => {
  return await User.findOne({
    where: {
      [Op.or]: [
        { email: identifier },
        { employee_id: identifier }
      ],
      is_active: 1
    }
  });
};

const findUserById = async (id: number) => {
  return await User.findOne({
    where: {
      id,
      is_active: true
    },
    attributes: {
      exclude: ['password']
    }
  });
};

export { findUserByIdentifier, findUserById };