"use client"

import { SignUpForm } from "@/components/auth/signup-form"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast";
import { catchAsync } from "@/lib/utils/error-handler";
import { SignUpFormValues } from "@/lib/validations/auth"
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const onSubmit = catchAsync(async (values: SignUpFormValues) => {
    const data = {
      ...values,
      role: "1",
      isSocial: false,
    }
    await signup(data)
    toast({
      title: "Success",
      description: "Account created successfully",
    })

    router.replace('/dashboard')
  })

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
      <SignUpForm  isLoading={isLoading} onSubmit={onSubmit}/>
    </div>
  )
}