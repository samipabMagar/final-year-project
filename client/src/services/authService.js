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
};
