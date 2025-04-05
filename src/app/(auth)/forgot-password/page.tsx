"use client"

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"
import { resetPassword, verifyResetCode } from "@/lib/api/auth"
import { catchAsync } from "@/lib/utils/error-handler"
import { ForgotPasswordFormValues, ResetPasswordFormValues, VerifyResetCodeFormValues } from "@/lib/validations/auth"
import { useMemo, useState } from "react"
import { VerifyResetCodeForm } from "@/components/auth/verify-reset-code-form"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

enum ForgotPasswordStep {
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  VERIFY_RESET_CODE = "VERIFY_RESET_CODE",
  RESET_PASSWORD = "RESET_PASSWORD",
}

 function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();
  const [step, setStep] = useState(ForgotPasswordStep.FORGOT_PASSWORD);

  const sendResetCode = catchAsync(async (data: ForgotPasswordFormValues) => {
    await forgotPassword(data);
    setStep(ForgotPasswordStep.VERIFY_RESET_CODE);
    toast({
      title: "Check your email",
      description: "We have sent a password reset link to your email address.",
    })
  })


  const onResendCode = catchAsync(async () => {
    setStep(ForgotPasswordStep.FORGOT_PASSWORD);
  })

  const onVerifyResetCode = catchAsync(async (data: any) => {
    await verifyResetCode(data);
    setStep(ForgotPasswordStep.RESET_PASSWORD);
  })

  const onResetPassword = catchAsync(async (data: any) => {
    await resetPassword(data);
  })

  const formStepToComponent = useMemo(() => {
    if(step === ForgotPasswordStep.FORGOT_PASSWORD) {
      return <ForgotPasswordForm isLoading={isLoading} onSubmit={sendResetCode} />
    }else if(step === ForgotPasswordStep.VERIFY_RESET_CODE) {
      return <VerifyResetCodeForm isLoading={isLoading} onSubmit={onVerifyResetCode} onResendCode={onResendCode}/>
    }else if(step === ForgotPasswordStep.RESET_PASSWORD) {
      return <ResetPasswordForm isLoading={isLoading} onSubmit={onResetPassword}/>
    }
  }, [step, isLoading, sendResetCode, onVerifyResetCode, onResetPassword, onResendCode])

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
      {formStepToComponent}
    </div>
  )
}

export default ForgotPasswordPage;