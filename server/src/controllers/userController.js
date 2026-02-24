import userService from "../services/userService.js";

// Controller for user-related operations
class UserController {
    async register(req, res) {
        try {
            const userData = req.body;
            const newUser = await userService.registerUser(userData);

            res.status(201).json({
                success: true,
                message:"User registered successfully",
                data: newUser
            });
        }catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || "Failed to register user"
            })
        }
        
    }
}

export default new UserController();