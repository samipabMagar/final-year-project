import api from "./api";

// Helper to extract a clean error message from API responses
const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

// User service — handles profile-related API calls
export const userService = {
  // Update profile info (full_name, phone, gender, skin_type, address)
  async updateProfile(data) {
    try {
      const response = await api.put("/users/profile", data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to update profile"));
    }
  },

  // Change password (current_password, new_password, confirm_new_password)
  async changePassword(data) {
    try {
      const response = await api.put("/users/profile/change-password", data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to change password"));
    }
  },

  // Upload a new profile image (expects a File object)
  async uploadProfileImage(file) {
    try {
      const formData = new FormData();
      formData.append("profile_image", file);
      const response = await api.put("/users/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to upload profile image"));
    }
  },
};
