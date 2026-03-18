import api from './api';

// Auth service - handles all authentication API calls
export const authService = {
    // login user
    async login(email, password) {
        try {
            const response = await api.post('/users/login', {email, password});
            return response.data;
        }catch(error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
}

