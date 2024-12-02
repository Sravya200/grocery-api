import { Request, Response } from 'express';
import Grocery from '../models/grocery.model';
import Order from '../models/order.model';
import OrderItem from '../models/orderItem.model';
import { Op } from 'sequelize';

export const viewGroceries = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Fetch groceries where quantity is greater than 0
    const groceries = await Grocery.findAll({ where: { quantity: { [Op.gt]: 0 } } });
    res.status(200).json(groceries); // Don't return this
  } catch (error) {
    res.status(500).json({ error: error }); // Handle errors gracefully
  }
};

export const bookOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    const userId = parseInt(req.user?.id || '', 10);

    if (!items || items.length === 0) {
      res.status(400).json({ message: 'Order items are required' });
      return;
    }

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const order = await Order.create({ userId });

    for (const item of items) {
      const grocery = await Grocery.findByPk(item.groceryId);

      if (!grocery) {
        res.status(404).json({ message: `Grocery item with ID ${item.groceryId} not found` });
        return;
      }

      if (grocery.quantity < item.quantity) {
        res.status(400).json({
          message: `Insufficient stock for ${grocery.name}. Available: ${grocery.quantity}`,
        });
        return;
      }

      await grocery.update({ quantity: grocery.quantity - item.quantity });
      await OrderItem.create({
        orderId: order.id,
        groceryId: item.groceryId,
        quantity: item.quantity,
      });
    }

    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
