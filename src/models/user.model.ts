import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user'), allowNull: false },
  },
  { sequelize, modelName: 'User' }
);

export default User;
