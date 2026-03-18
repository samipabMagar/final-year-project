import { authService } from "@/services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, {rejectWithValue}) => {
    try {
        const userData = await authService.login(credentials.email, credentials.password);

        return userData;
    }catch(error) {
        return rejectWithValue(error.message || 'Login failed');
    }
})