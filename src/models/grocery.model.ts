import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface GroceryAttributes {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class Grocery extends Model<GroceryAttributes> implements GroceryAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Grocery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Grocery',
    tableName: 'groceries',
    timestamps: true,
  }
);

export default Grocery;
