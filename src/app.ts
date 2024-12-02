import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.routes';
import userRoutes from './routes/user.routes';
import sequelize from './models';

// Load environment variables from `.env` file
dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'API is running' });
});

// Routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// Connect to Database
sequelize
  .authenticate()
  .then(() => console.log('Connected to the MySQL database.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

export default app;
