import userModel from "./userModel.js";
import doctorProfileModel from "./doctorProfileModel.js";
import productModel from "./productModel.js";
import brandModel from "./brandModel.js";

// Define relationships
// One-to-One: User has one DoctorProfile (if user.role === "doctor")
userModel.hasOne(doctorProfileModel, {
  foreignKey: "user_id",
  as: "doctorProfile",
});

doctorProfileModel.belongsTo(userModel, {
  foreignKey: "user_id",
  as: "user",
});

// One-to-Many: Brand has many Products
brandModel.hasMany(productModel, {
  foreignKey: "brand_id",
  as: "products",
});

// Many-to-One: Product belongs to Brand
productModel.belongsTo(brandModel, {
  foreignKey: "brand_id",
  as: "brand",
});

export { userModel, doctorProfileModel, productModel, brandModel };
