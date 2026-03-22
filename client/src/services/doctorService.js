import api from "./api";

const getApiErrorMessage = (error, fallbackMessage) => {
  return (
    error.response?.data?.errors?.[0]?.message ||
    error.response?.data?.message ||
    fallbackMessage
  );
};

const buildQueryParams = (filters = {}) => {
  const params = {};

  if (filters.specialization) {
    params.specialization = filters.specialization;
  }

  if (typeof filters.isAvailable === "boolean") {
    params.is_available = filters.isAvailable;
  }

  return params;
};

export const doctorService = {
  async getDoctors(filters = {}) {
    try {
      const response = await api.get("/doctor-profiles", {
        params: buildQueryParams(filters),
      });

      const doctors = response.data?.data ?? [];

      // Ensure only approved doctors are shown on the public list.
      return doctors.filter((doctor) => doctor.approval_status === "approved");
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to load doctors"));
    }
  },
};
