import appointmentService from "../services/appointmentService.js";

class AppointmentController {
  async createAppointment(req, res) {
    try {
      const patientUserId = req.user.id;
      const appointmentData = req.body;

      const appointment = await appointmentService.createAppointment(
        patientUserId,
        appointmentData,
      );

      return res.status(201).json({
        success: true,
        message: "Appointment request created successfully",
        data: appointment,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to create appointment",
      });
    }
  }

  async confirmAppointment(req, res) {
    try {
      const doctorUserId = req.user.id;
      const appointmentId = req.params.appointmentId;
      const confirmationData = req.body;

      const appointment = await appointmentService.confirmAppointment(
        doctorUserId,
        appointmentId,
        confirmationData,
      );

      return res.status(200).json({
        success: true,
        message: "Appointment confirmed successfully",
        data: appointment,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to confirm appointment",
      });
    }
  }

  async getMyAppointments(req, res) {
    try {
      const currentUserId = req.user.id;
      const currentUserRole = req.user.role;
      const filters = {
        status: req.query.status,
      };

      const appointments = await appointmentService.getMyAppointments(
        currentUserId,
        currentUserRole,
        filters,
      );

      return res.status(200).json({
        success: true,
        message:
          appointments.length > 0
            ? "Appointments retrieved successfully"
            : "No appointments found",
        data: appointments,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to retrieve appointments",
      });
    }
  }
}

export default new AppointmentController();
