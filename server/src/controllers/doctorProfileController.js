import doctorProfileService from "../services/doctorProfileService.js";

class DoctorProfileController {
  async registerDoctor(req, res) {
    try {
      const registrationData = req.body;
      const result =
        await doctorProfileService.registerDoctor(registrationData);

      res.status(201).json({
        success: true,
        message:
          "Doctor registration submitted successfully. Please wait for admin approval.",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to register doctor",
      });
    }
  }

  // Admin: Get pending doctor registrations
  async getPendingDoctorRegistrations(req, res) {
    try {
      const pendingDoctors = await doctorProfileService.getPendingDoctors();

      res.status(200).json({
        success: true,
        message: "Pending doctor registrations retrieved successfully",
        data: pendingDoctors,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error.message || "Failed to retrieve pending doctor registrations",
      });
    }
  }

  // Admin: Approve doctor registration
  async approveDoctorRegistration(req, res) {
    try {
      const { userId } = req.params;

      const result = await doctorProfileService.approveDoctor(parseInt(userId));

      res.status(200).json({
        success: true,
        message: "Doctor registration approved successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to approve doctor registration",
      });
    }
  }
}

export default new DoctorProfileController();
