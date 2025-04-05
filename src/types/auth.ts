export interface User {
  id: string
  name: string
  email: string
  role: string
  isEmailVerified: boolean
  isActive: boolean
  isSocial: boolean
  phone: string
}

export interface Tokens {
  access: {
    token: string
    expires: string
  }
  refresh: {
    token: string
    expires: string
  }
}

export interface LoginResponse {
  user: User
  tokens: Tokens
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  name: string
  email: string
  password: string
  role: string
  phone: string
  isSocial: boolean
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  resetPasswordCode: string
}

export interface ResetPasswordRequest {
  email: string
  password: string
  code: string
}

export interface ResetPasswordResponse {

}

export interface VerifyResetCodeRequest {
  email: string
  code: string
}

export interface VerifyResetCodeResponse {

}
