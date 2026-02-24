import userService from "../services/userService.js";

// Controller for user-related operations
class UserController {
  async register(req, res) {
    try {
      const userData = req.body;
      const newUser = await userService.registerUser(userData);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to register user",
      });
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      const user = await userService.loginUser(email, password);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: user
      })
    }catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to login user",
      })
    }
  }
}

export default new UserController();
