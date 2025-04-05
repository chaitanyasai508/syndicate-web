import { ForgotPasswordRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, ResetPasswordRequest, ResetPasswordResponse, SignUpRequest, VerifyResetCodeRequest, VerifyResetCodeResponse } from "@/types/auth"
import api from "./axios"
import { TokenService } from "../services/token-service"

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  console.log("Making login request with:", data)

  try {
    const response = await api.post<LoginResponse>("/auth/login", data)
    console.log("Login response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Login failed:", error)
    if (error.response?.data) {
      throw new Error(error.response.data.message || "Failed to sign in")
    }
    throw new Error("Failed to sign in")
  }
}

export async function refreshToken(refreshToken: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("/auth/refresh-tokens", {
      refreshToken,
    })
    return response.data
  } catch (error) {
    console.error("Token refresh failed:", error)
    throw new Error("Failed to refresh token")
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout", {
      refreshToken: TokenService.getRefreshToken(),
    })
  } catch (error) {
    console.error("Logout failed:", error)
    throw new Error("Failed to logout")
  }
}

export async function signup(data: SignUpRequest): Promise<LoginResponse> {
  console.log("Making signup request with:", data)

  try {
    const response = await api.post<LoginResponse>("/auth/register", data)
    console.log("Signup response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Signup failed:", error)
    if (error.response?.data) {
      throw new Error(error.response.data.message || "Failed to sign up")
    }
    throw new Error("Failed to sign up")
  }
}


export async function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  try {
    const response = await api.post<ForgotPasswordResponse>("/auth/forgot-password", data)
    console.log("Forgot password response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Forgot password failed:", error)
    throw new Error("Failed to forgot password")
  }
}

export async function verifyResetCode(data: VerifyResetCodeRequest): Promise<VerifyResetCodeResponse> {
  try {
    const response = await api.post<VerifyResetCodeResponse>("/auth/verify-reset-code", data)
    return response.data
  } catch (error) {
    throw new Error("Failed to verify reset code")
  }
}

export async function resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  try {
    const response = await api.post<ResetPasswordResponse>("/auth/reset-password", data)
    return response.data
  } catch (error) {
    throw new Error("Failed to reset password")
  }
}