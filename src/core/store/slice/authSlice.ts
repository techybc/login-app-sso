import { createSlice } from '@reduxjs/toolkit';

interface AuthState {}

const initialState: AuthState = {};

const appSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const {} = appSlice.actions;
export default appSlice.reducer;