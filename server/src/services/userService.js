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

  async loginUser(email, password) {
    const user = await userModel.findOne({ where: { email } });
    if(!user) {
      throw new Error("User not found");
    }

    const isPassword = await user.comparePassword(password);
    if(!isPassword) {
      throw new Error("Invalid email or password");
    }

    const userResponse = user.toJSON();
    delete userResponse.password;

    return userResponse;
  }
}

export default new UserService();
