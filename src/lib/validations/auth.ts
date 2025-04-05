import * as z from "zod"

export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  role: z.string().default("1").optional(),
  phone: z.string().optional().default(""),
  isSocial: z.boolean().default(false).optional(),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const verifyResetCodeSchema = z.object({
  code: z.string().length(6).regex(/^[a-zA-Z0-9]+$/, "Code must contain only letters and numbers"),
})

export type VerifyResetCodeFormValues = z.infer<typeof verifyResetCodeSchema>

export const resetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
})

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>