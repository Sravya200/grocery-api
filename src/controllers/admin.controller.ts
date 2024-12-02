import { Request, Response } from 'express';
import Grocery from '../models/grocery.model';

export const addGrocery = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity } = req.body;
    const grocery = await Grocery.create({ name, price, quantity });
    res.status(201).json({ message: 'Grocery added', grocery });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const viewGroceries = async (_req: Request, res: Response) => {
  const groceries = await Grocery.findAll();
  res.status(200).json(groceries);
};

export const updateGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  const grocery = await Grocery.findByPk(id);
  if (!grocery) return res.status(404).json({ message: 'Grocery not found' });

  await grocery.update({ name, price, quantity });
  res.json({ message: 'Grocery updated', grocery });
};

export const deleteGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const grocery = await Grocery.findByPk(id);
  if (!grocery) return res.status(404).json({ message: 'Grocery not found' });

  await grocery.destroy();
  res.json({ message: 'Grocery deleted' });
};
