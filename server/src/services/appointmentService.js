import { Op } from "sequelize";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import doctorProfileModel from "../models/doctorProfileModel.js";

class AppointmentService {
  async createAppointment(patientUserId, appointmentData) {
    const { doctor_user_id, scheduled_at } = appointmentData;

    if (Number(patientUserId) === Number(doctor_user_id)) {
      throw new Error("You cannot book an appointment with yourself");
    }

    const doctorUser = await userModel.findByPk(doctor_user_id, {
      attributes: ["user_id", "full_name", "email", "role"],
    });

    if (!doctorUser || doctorUser.role !== "doctor") {
      throw new Error("Selected doctor does not exist");
    }

    const doctorProfile = await doctorProfileModel.findOne({
      where: {
        user_id: doctor_user_id,
        approval_status: "approved",
      },
    });

    if (!doctorProfile) {
      throw new Error("Doctor is not approved for appointments yet");
    }

    const scheduledAt = new Date(scheduled_at);

    if (Number.isNaN(scheduledAt.getTime())) {
      throw new Error("Invalid appointment date or time");
    }

    if (scheduledAt <= new Date()) {
      throw new Error(
        "Appointment must be scheduled for a future date and time",
      );
    }

    const conflictingAppointment = await appointmentModel.findOne({
      where: {
        doctor_user_id,
        scheduled_at: scheduledAt,
        status: {
          [Op.in]: ["pending", "confirmed"],
        },
      },
    });

    if (conflictingAppointment) {
      throw new Error(
        "Doctor already has an appointment at this date and time. Please choose another slot",
      );
    }

    const newAppointment = await appointmentModel.create({
      patient_user_id: patientUserId,
      doctor_user_id,
      scheduled_at: scheduledAt,
      status: "pending",
    });

    const appointment = await appointmentModel.findByPk(
      newAppointment.appointment_id,
      {
        include: [
          {
            model: userModel,
            as: "patient",
            attributes: ["user_id", "full_name", "email"],
          },
          {
            model: userModel,
            as: "doctor",
            attributes: ["user_id", "full_name", "email"],
          },
        ],
      },
    );

    return appointment;
  }
}

export default new AppointmentService();
