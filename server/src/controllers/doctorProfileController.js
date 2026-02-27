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
}

export default new DoctorProfileController();
