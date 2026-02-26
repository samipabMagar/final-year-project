import { json } from "sequelize";
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

    // Parse address if it's a string
    if (userResponse.address && typeof userResponse.address === "string") {
      try {
        userResponse.address = JSON.parse(userResponse.address);
      } catch (error) {
        console.error("Failed to parse address:", error);
      }
    }

    return userResponse;
  }

  async loginUser(email, password) {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      throw new Error("Invalid email or password");
    }

    const userResponse = user.toJSON();
    delete userResponse.password;

    // Parse address if it's a string
    if (userResponse.address && typeof userResponse.address === "string") {
      try {
        userResponse.address = JSON.parse(userResponse.address);
      } catch (error) {
        console.error("Failed to parse address:", error);
      }
    }

    return userResponse;
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await userModel.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }

    // Convert Sequelize instance to plain object and remove password
    const userResponse = user.toJSON();

    if (userResponse.address && typeof userResponse.address === "string") {
      try {
        userResponse.address = JSON.parse(userResponse.address);
      } catch (error) {
        console.error("Failed to parse address:", error);
      }
    }

    return userResponse;
  }

  // Update user profile
  async updateUserProfile(userId, updateData){
    const user = await userModel.findByPk(userId);
    if(!user) {
      throw new Error("User not found");
    }

    await user.update(updateData);

    const updatedUser = user.toJSON();
    delete updatedUser.password;

    if(updatedUser.address && typeof updatedUser.address === "string") {
      try {
        updatedUser.address = JSON.parse(updatedUser.address);
      }catch (error) {
        console.error("Failed to parse address:", error);
      }
    }
    return updatedUser;
  }
}

export default new UserService();
