import { Op } from "sequelize";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import doctorProfileModel from "../models/doctorProfileModel.js";
import { sendAppointmentConfirmationEmail } from "../utils/emailService.js";
import {format} from "date-fns";

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

  // Doctor confirms appointment and adds meeting details
  async confirmAppointment(doctorUserId, appointmentId, confirmationData) {
    const { meeting_provider, meeting_link, doctor_notes } = confirmationData;

    const appointment = await appointmentModel.findByPk(appointmentId, {
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
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (Number(appointment.doctor_user_id) !== Number(doctorUserId)) {
      throw new Error("You are not authorized to confirm this appointment");
    }

    if (appointment.status !== "pending") {
      throw new Error(
        `Only pending appointments can be confirmed. Current status: ${appointment.status}`,
      );
    }

    await appointment.update({
      status: "confirmed",
      meeting_provider,
      meeting_link,
      doctor_notes: doctor_notes || null,
    });

    const appointmentDateTime = format(new Date(appointment.scheduled_at), "MMMM d, yyyy 'at' h:mm a");

    const meetingProviderLabel =
      meeting_provider === "google_meet" ? "Google Meet" : "Zoom";

    try {
      await sendAppointmentConfirmationEmail({
        patientEmail: appointment.patient.email,
        patientName: appointment.patient.full_name,
        doctorName: appointment.doctor.full_name,
        appointmentDateTime,
        meetingProvider: meetingProviderLabel,
        meetingLink: meeting_link,
      });
    } catch (error) {
      console.error("Failed to send appointment confirmation email:", error);
    }

    return appointment;
  }

  async getMyAppointments(currentUserId, currentUserRole, filters = {}) {
    const whereClause = {};

    if (filters.status) {
      whereClause.status = filters.status;
    }

    if (currentUserRole === "user") {
      whereClause.patient_user_id = currentUserId;

      return await appointmentModel.findAll({
        where: whereClause,
        include: [
          {
            model: userModel,
            as: "doctor",
            attributes: ["user_id", "full_name", "email"],
          },
        ],
        order: [["scheduled_at", "ASC"]],
      });
    }

    if (currentUserRole === "doctor") {
      whereClause.doctor_user_id = currentUserId;

      return await appointmentModel.findAll({
        where: whereClause,
        include: [
          {
            model: userModel,
            as: "patient",
            attributes: ["user_id", "full_name", "email"],
          },
        ],
        order: [["scheduled_at", "ASC"]],
      });
    }

    throw new Error("Only users and doctors can view their appointments");
  }

  async completeAppointment(doctorUserId, appointmentId, completionData = {}) {
    const { doctor_notes } = completionData;

    const appointment = await appointmentModel.findByPk(appointmentId, {
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
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (Number(appointment.doctor_user_id) !== Number(doctorUserId)) {
      throw new Error("You are not authorized to complete this appointment");
    }

    if (appointment.status !== "confirmed") {
      throw new Error(
        `Only confirmed appointments can be completed. Current status: ${appointment.status}`,
      );
    }

    await appointment.update({
      status: "completed",
      doctor_notes:
        doctor_notes !== undefined ? doctor_notes : appointment.doctor_notes,
    });

    return appointment;
  }

  async cancelAppointment(
    currentUserId,
    currentUserRole,
    appointmentId,
    cancellationData = {},
  ) {
    const { cancellation_reason } = cancellationData;

    const appointment = await appointmentModel.findByPk(appointmentId, {
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
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    let cancelledBy;

    if (currentUserRole === "admin") {
      cancelledBy = "admin";
    } else if (
      currentUserRole === "user" &&
      Number(appointment.patient_user_id) === Number(currentUserId)
    ) {
      cancelledBy = "patient";
    } else if (
      currentUserRole === "doctor" &&
      Number(appointment.doctor_user_id) === Number(currentUserId)
    ) {
      cancelledBy = "doctor";
    } else {
      throw new Error("You are not authorized to cancel this appointment");
    }

    if (appointment.status === "cancelled") {
      throw new Error("Appointment is already cancelled");
    }

    if (appointment.status === "completed") {
      throw new Error("Completed appointments cannot be cancelled");
    }

    if (appointment.status === "rejected") {
      throw new Error("Rejected appointments cannot be cancelled");
    }

    await appointment.update({
      status: "cancelled",
      cancelled_by: cancelledBy,
      cancellation_reason: cancellation_reason || null,
      cancelled_at: new Date(),
    });

    return appointment;
  }
}

export default new AppointmentService();
