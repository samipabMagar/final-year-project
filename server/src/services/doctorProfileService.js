import connection from "../configs/db.js";
import userModel from "../models/userModel.js";
import doctorProfileModel from "../models/doctorProfileModel.js";

class DoctorProfileService {
  // Register as doctor (Public)
  async registerDoctor(registrationData) {
    const transaction = await connection.transaction();
    try {
      const {
        full_name,
        email,
        phone,
        password,
        gender,
        address,
        specialization,
        license_number,
        years_of_experience,
        consultation_fee,
        bio,
        education,
        certifications,
      } = registrationData;

      const existingUser = await userModel.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const licenseExists = await doctorProfileModel.findOne({
        where: { license_number },
      });

      if (licenseExists) {
        throw new Error("License number already exists");
      }

      // Create user with role="doctor"
      const user = await userModel.create(
        {
          full_name,
          email,
          phone,
          password,
          gender,
          address,
          role: "doctor",
        },
        { transaction },
      );
      // Create doctor profile with pending approval
      const doctorProfile = await doctorProfileModel.create(
        {
          user_id: user.user_id,
          specialization,
          license_number,
          years_of_experience,
          consultation_fee,
          bio,
          education,
          certifications,
          approval_status: "pending",
        },
        { transaction },
      );

      await transaction.commit();

      const userResponse = user.toJSON();
      delete userResponse.password;

      return {
        user: userResponse,
        profile: doctorProfile.toJSON(),
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}


export default new DoctorProfileService();