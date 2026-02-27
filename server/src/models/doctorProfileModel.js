import { DataTypes } from "sequelize";
import connection from "../configs/db.js";

const doctorProfileModel = connection.define(
  "DoctorProfile",
  {
    profile_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // e.g., "Dermatologist", "Skin Specialist", "Cosmetic Dermatologist"
    },
    license_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    years_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    consultation_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    education: {
      type: DataTypes.JSON,
      allowNull: true,
      // Array of education: [{ degree: "MBBS", institution: "...", year: 2015 }]
    },
    certifications: {
      type: DataTypes.JSON,
      allowNull: true,
      // Array of certifications
    },
    availability_hours: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      // Structure: { monday: { start: "09:00", end: "17:00" }, tuesday: {...}, ... }
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      // Can be set to false if doctor is on leave or unavailable
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
    total_reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    approval_status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    rejection_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "doctor_profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default doctorProfileModel;
