import type { RootState } from '../store';

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthEmail = (state: RootState) =>
  state.auth.email;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectAuthLoading = (state: RootState) =>
  state.auth.isLoading;

export const selectAuthError = (state: RootState) =>
  state.auth.error;
