import express from 'express';
import { viewGroceries, bookOrder } from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/groceries', authenticateUser, async (req, res, next) => {
  try {
    await viewGroceries(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/orders', authenticateUser, async (req, res, next) => {
  try {
    await bookOrder(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
