/* =======================
   API REQUEST TYPES
======================= */

export interface OtpRequestPayload {
  email: string;
}

export interface OtpVerifyPayload {
  email: string;
  otp: string;
}

/* =======================
   API RESPONSE TYPES
======================= */

export interface OtpRequestResponse {
  email: string;
  otp: string;
}

export interface OtpVerifyResponse {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

/* =======================
   AUTH REDUX STATE
======================= */

export interface AuthState {
  email: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}
