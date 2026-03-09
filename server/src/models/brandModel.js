import connection from "../configs/db.js";
import { DataTypes } from "sequelize";

const brandModel = connection.define("Brand", {
  brand_id: {
    type: DataTypes.INTEGER,
    autIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  logo_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  website_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
    tableName: "brands",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default brandModel;