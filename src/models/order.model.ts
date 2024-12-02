import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OrderAttributes {
  id?: number; // Mark `id` as optional
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Use Sequelize's `Optional` to mark optional attributes for `create` method
type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
  }
);

export default Order;
