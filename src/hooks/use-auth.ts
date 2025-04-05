import { useMutation, useQueryClient } from "@tanstack/react-query"
import { forgotPassword, login, logout, resetPassword, signup, verifyResetCode } from "@/lib/api/auth"
import { useAuthStore } from "@/store/use-auth-store"
import { ForgotPasswordRequest, LoginRequest, SignUpRequest, VerifyResetCodeRequest, ResetPasswordRequest } from "@/types/auth"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { signIn, signOut } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      signIn(response.user, response.tokens)
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in",
      })
    },
  })

  const signupMutation = useMutation({
    mutationFn: (data: SignUpRequest) => signup(data),
    onSuccess: (response) => {
      signIn(response.user, response.tokens)
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create account",
      })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      signOut()
      // Invalidate and remove all queries from the cache
      queryClient.clear()
      router.push("/signin")
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign out",
      })
    },
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
  })

  const verifyResetCodeMutation = useMutation({
    mutationFn: (data: VerifyResetCodeRequest) => verifyResetCode(data),
  })

  return {
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    verifyResetCode: verifyResetCodeMutation.mutateAsync,
    isLoading: loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending || forgotPasswordMutation.isPending || resetPasswordMutation.isPending || verifyResetCodeMutation.isPending,
  }
}