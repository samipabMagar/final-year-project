import userModel from "./userModel.js";
import doctorProfileModel from "./doctorProfileModel.js";
import productModel from "./productModel.js";
import brandModel from "./brandModel.js";
import appointmentModel from "./appointmentModel.js";

// Define relationships
// One-to-One: User has one DoctorProfile
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

// One-to-Many: User (patient) has many appointments
userModel.hasMany(appointmentModel, {
  foreignKey: "patient_user_id",
  as: "patientAppointments",
});

// One-to-Many: User (doctor) has many appointments
userModel.hasMany(appointmentModel, {
  foreignKey: "doctor_user_id",
  as: "doctorAppointments",
});

// Many-to-One: Appointment belongs to patient user
appointmentModel.belongsTo(userModel, {
  foreignKey: "patient_user_id",
  as: "patient",
});

// Many-to-One: Appointment belongs to doctor user
appointmentModel.belongsTo(userModel, {
  foreignKey: "doctor_user_id",
  as: "doctor",
});

export {
  userModel,
  doctorProfileModel,
  productModel,
  brandModel,
  appointmentModel,
};
