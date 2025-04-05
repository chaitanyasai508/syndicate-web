import { create } from 'zustand'
import { User, Tokens } from '@/types/auth'
import { TokenService } from '@/lib/services/token-service'
import { toast } from "@/hooks/use-toast"

interface AuthState {
  user: User | null
  tokens: Tokens | null
  isAuthenticated: boolean
  signIn: (user: User, tokens: Tokens) => void
  signOut: () => void
  refreshTokens: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,

  initialize: async () => {
    const accessToken = TokenService.getAccessToken()
    const refreshToken = TokenService.getRefreshToken()

    if (!accessToken || !refreshToken) {
      return
    }

    try {
      if (TokenService.isAccessTokenExpired(accessToken)) {
        const newTokens = await TokenService.refreshTokens(refreshToken)
        set({ tokens: newTokens })
      } else {
        set({ tokens: {
          access: { token: accessToken, expires: '' },
          refresh: { token: refreshToken, expires: '' }
        }})
      }
      set({ isAuthenticated: true })
    } catch (error) {
      TokenService.clearTokens()
      set({ user: null, tokens: null, isAuthenticated: false })
    }
  },

  signIn: (user, tokens) => {
    TokenService.setTokens(tokens)
    set({ user, tokens, isAuthenticated: true })
    toast({
      title: "Success",
      description: "Signed in successfully",
    })
  },

  signOut: () => {
    TokenService.clearTokens()
    set({ user: null, tokens: null, isAuthenticated: false })
    toast({
      title: "Success",
      description: "Signed out successfully",
    })
  },

  refreshTokens: async () => {
    const refreshToken = TokenService.getRefreshToken()
    if (!refreshToken) {
      set({ user: null, tokens: null, isAuthenticated: false })
      return
    }

    try {
      const newTokens = await TokenService.refreshTokens(refreshToken)
      set({ tokens: newTokens })
    } catch (error) {
      TokenService.clearTokens()
      set({ user: null, tokens: null, isAuthenticated: false })
      toast({
        variant: "destructive",
        title: "Error",
        description: "Session expired. Please sign in again.",
      })
    }
  },
}))

