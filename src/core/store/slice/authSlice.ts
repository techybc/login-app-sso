import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  AuthState,
  OtpRequestPayload,
  OtpVerifyPayload,
  OtpVerifyResponse
} from '../index';
import { requestOtp, verifyOtp } from '../../api/auth/auth';

const initialState: AuthState = {
  email: null,
  isLoading: false,
  isAuthenticated: false,
  error: null
};

export const requestOtpThunk = createAsyncThunk(
  'auth/requestOtp',
  async (payload: OtpRequestPayload) => {
    return await requestOtp(payload);
  }
);

export const verifyOtpThunk = createAsyncThunk<
  OtpVerifyResponse,
  OtpVerifyPayload
>('auth/verifyOtp', async (payload) => {
  return await verifyOtp(payload);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestOtpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
      })
      .addCase(requestOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'OTP request failed';
      })
      .addCase(verifyOtpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'OTP verification failed';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
