import api from "./api";

const getApiErrorMessage = (error, fallbackMessage) => {
  return (
    error.response?.data?.errors?.[0]?.message ||
    error.response?.data?.message ||
    fallbackMessage
  );
};

// Auth service - handles all authentication API calls
export const authService = {
  // register patient
  async registerPatient(data) {
    try {
      const response = await api.post("/users/register", {
        ...data,
        role: "user",
      });
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Patient registration failed"));
    }
  },

  // register doctor
  async registerDoctor(data) {
    try {
      const response = await api.post("/doctors/register", data);
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Doctor registration failed"));
    }
  },

  // login user
  async login(email, password) {
    try {
      const response = await api.post("/users/login", { email, password });
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Login failed"));
    }
  },

  // get currently logged in user from cookie session
  async getCurrentUser() {
    try {
      const response = await api.get("/users/profile");
      return response.data?.data ?? null;
    } catch {
      return null;
    }
  },
};
