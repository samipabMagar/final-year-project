import userModel from "../models/userModel.js";

// Service for user-related operations
class UserService {
  async registerUser(userData) {
    const existingUser = await userModel.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const user = await userModel.create(userData);

    const userResponse = user.toJSON();
    delete userResponse.password;

    return userResponse;
  }
}

export default new UserService();
