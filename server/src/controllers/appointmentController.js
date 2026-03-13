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
}

export default new AppointmentController();
