import User from '../models/user.model.js';
import { Op } from 'sequelize';

const findUserByIdentifier = async (identifier: string) => {
  return await User.findOne({
    where: {
      [Op.or]: [
        { email: identifier },
        { employee_id: identifier }
      ],
      is_active: true
    }
  });
};

const findUserById = async (id: number) => {
  return await User.findByPk(id, {
    attributes: {
      exclude: ['password']
    }
  });
};

export { findUserByIdentifier, findUserById };