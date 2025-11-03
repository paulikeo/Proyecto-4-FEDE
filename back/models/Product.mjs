import { sequelize } from '../config/db.mjs'
import { DataTypes, Model } from 'sequelize'
import { User } from './User.mjs'

export class Product extends Model { }

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  },
);

// Asociaciones
Product.belongsTo(User, { foreignKey: 'userId', as: 'creator' });
User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
