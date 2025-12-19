import axios from "axios";
import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import type {
  OtpRequestPayload,
  OtpRequestResponse,
  OtpVerifyPayload,
  OtpVerifyResponse,
} from "../../store/index";

// Axios instance for Auth APIs
const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

// Request OTP
export const requestOtp = async (
  payload: OtpRequestPayload
): Promise<OtpRequestResponse> => {
  const { data } = await authApi.post<OtpRequestResponse>(
    "/api/v1/auth/otp/request",
    payload
  );
  return data;
};

// Verify OTP and Stores access_token in cookies
export const verifyOtp = async (
  payload: OtpVerifyPayload
): Promise<OtpVerifyResponse> => {
  const { data } = await authApi.post<OtpVerifyResponse>(
    "/api/v1/auth/otp/verify",
    payload
  );

  if (data.access_token) {
    Cookies.set("access_token", data.access_token, {
      expires: data.expires_in / 86400, // seconds → days
      secure: true,
      sameSite: "strict",
    });
  }

  return data;
};

export default authApi;
