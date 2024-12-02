import express from 'express';
import {
  addGrocery,
  viewGroceries,
  updateGrocery,
  deleteGrocery,
} from '../controllers/admin.controller';
import { authenticateAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

// Wrap route handlers to return void
router.post('/groceries', authenticateAdmin, async (req, res, next) => {
  try {
    await addGrocery(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/groceries', authenticateAdmin, async (req, res, next) => {
  try {
    await viewGroceries(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/groceries/:id', authenticateAdmin, async (req, res, next) => {
  try {
    await updateGrocery(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/groceries/:id', authenticateAdmin, async (req, res, next) => {
  try {
    await deleteGrocery(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
