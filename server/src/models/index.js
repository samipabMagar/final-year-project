import userModel from "./userModel.js";
import doctorProfileModel from "./doctorProfileModel.js";
import productModel from "./productModel.js";

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

export { userModel, doctorProfileModel };