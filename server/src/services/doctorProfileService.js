import connection from "../configs/db.js";
import userModel from "../models/userModel.js";
import doctorProfileModel from "../models/doctorProfileModel.js";
import {
  sendDoctorApprovalEmail,
  sendDoctorRejectionEmail,
} from "../utils/emailService.js";

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
  // Get pending doctor approvals (Admin only)
  async getPendingDoctors() {
    const profiles = await doctorProfileModel.findAll({
      where: { approval_status: "pending" },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: [
            "user_id",
            "full_name",
            "email",
            "phone",
            "profile_image",
            "created_at",
          ],
        },
      ],
      order: [["created_at", "ASC"]],
    });

    return profiles.map((profile) => profile.toJSON());
  }

  // Approve doctor registration (Admin only)
  async approveDoctor(userId) {
    const profile = await doctorProfileModel.findOne({
      where: { user_id: userId },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: ["user_id", "full_name", "email", "phone"],
        },
      ],
    });

    if (!profile) {
      throw new Error("Doctor profile not found");
    }

    if (profile.approval_status == "approved") {
      throw new Error("Doctor is already approved");
    }

    await profile.update({
      approval_status: "approved",
      approved_at: new Date(),
      rejection_reason: null,
    });

    // send approval email to doctor
    try {
      await sendDoctorApprovalEmail(profile.user.email, profile.user.full_name);
    } catch (error) {
      console.error("Failed to send approval email:", error);
    }

    return profile.toJSON();
  }

  // Reject doctor registration (Admin only)
  async rejectDoctor(userId, reason) {
    const profile = await doctorProfileModel.findOne({
      where: { user_id: userId },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: ["user_id", "full_name", "email", "phone"],
        },
      ],
    });

    if (!profile) {
      throw new Error("Doctor profile not found");
    }

    if (profile.approval_status == "rejected") {
      throw new Error("Doctor is already rejected");
    }

    await profile.update({
      approval_status: "rejected",
      rejection_reason: reason || "No reason provided",
      approved_at: new Date(),
    });

    try {
      await sendDoctorRejectionEmail(
        profile.user.email,
        profile.user.full_name,
        reason,
      );
    } catch (error) {
      console.error("Failed to send rejection email:", error);
    }

    return profile.toJSON();
  }

  // Get all doctor profiles
  async getAllDoctors(filters = {}) {
    const whereClause = {};

    if (filters.specialization) {
      whereClause.specialization = filters.specialization;
    }

    if (filters.is_available !== undefined) {
      whereClause.is_available = filters.is_available;
    }

    const profiles = await doctorProfileModel.findAll({
      where: whereClause,
      include: [
        {
          model: userModel,
          as: "user",
          attributes: [
            "user_id",
            "full_name",
            "email",
            "phone",
            "profile_image",
          ],
        },
      ],
      order: [["rating", "DESC"]],
    });

    return profiles.map((profile) => profile.toJSON());
  }

  // Get doctor profile by user ID
  async getDoctorProfileByUserId(userId) {
    const profile = await doctorProfileModel.findOne({
      where: { user_id: userId },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: [
            "user_id",
            "full_name",
            "email",
            "phone",
            "profile_image",
          ],
        },
      ],
    });

    if (!profile) {
      throw new Error("Doctor profile not found");
    }

    return profile.toJSON();
  }

  // Update doctor profile
  async updateDoctorProfile(userId, updateData) {
    const profile = await doctorProfileModel.findOne({
      where: { user_id: userId },
    });

    if (!profile) {
      throw new Error("Doctor profile not found");
    }

    if (
      updateData.license_number &&
      updateData.license_number !== profile.license_number
    ) {
      const licenseExists = await doctorProfileModel.findOne({
        where: { license_number: updateData.license_number },
      });
      if (licenseExists) {
        throw new Error("License number already exists");
      }
    }

    await profile.update(updateData);

    return profile.toJSON();
  }
}

export default new DoctorProfileService();
