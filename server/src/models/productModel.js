import connection from "../configs/db.js";
import { DataTypes } from "sequelize";

const productModel = connection.define(
  "Product",
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    category: {
      type: DataTypes.ENUM(
        "cleanser",
        "moisturizer",
        "serum",
        "sunscreen",
        "toner",
        "mask",
        "eye_care",
        "lip_care",
      ),
      allowNull: false,
    },

    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },

    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "brands",
        key: "brand_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    skin_type: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      // Expected array: ["normal", "oily", "dry", "combination", "sensitive"]
    },

    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default productModel;
