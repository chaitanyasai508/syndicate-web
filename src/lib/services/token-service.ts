import { jwtDecode } from "jwt-decode"
import { Tokens } from "@/types/auth"
import { env } from "@/config/env"
interface JwtPayload {
  exp: number
  iat: number
  sub: string
  type: string
  userId: string
}

if (!env.apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

export class TokenService {
  private static readonly ACCESS_TOKEN_KEY = "access_token"
  private static readonly REFRESH_TOKEN_KEY = "refresh_token"
  private static readonly TOKEN_EXPIRY_BUFFER = 60 // seconds before expiry to refresh

  static setTokens(tokens: Tokens): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access.token)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh.token)
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static isAccessTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      // Check if token will expire in the next buffer period
      return (decoded.exp * 1000) < (Date.now() + this.TOKEN_EXPIRY_BUFFER * 1000)
    } catch {
      return true
    }
  }

  static async refreshTokens(refreshToken: string): Promise<Tokens> {
    try {
      const response = await fetch(`${env.apiUrl}/auth/refresh-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      const tokens: Tokens = await response.json()
      this.setTokens(tokens)
      return tokens
    } catch (error) {
      this.clearTokens()
      throw error
    }
  }

  static getUserIdFromToken(token: string): string | null {
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      return decoded.userId
    } catch {
      return null
    }
  }
}