import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('grocery_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
