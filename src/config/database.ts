import { Sequelize } from 'sequelize';

// Database connection details
const sequelize = new Sequelize({
  database: 'grocery_Db', // Replace with your database name
  username: 'root', // Replace with your database username
  password: '12345', // Replace with your database password
  host: 'localhost',               // Replace with your host (e.g., '127.0.0.1')
  dialect: 'mysql',                // Replace with your dialect (e.g., 'postgres', 'mysql')
  logging: false,                  // Disable SQL query logging
});

export default sequelize;
