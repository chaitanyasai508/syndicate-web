"use client"

import { SignInForm } from "@/components/auth/signin-form"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { signInSchema } from "@/lib/validations/auth"
import type { z } from "zod"
import { catchAsync } from "@/lib/utils/error-handler"

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const onSubmit = catchAsync(async (data: SignInFormValues) => {
    await login({
      email: data.email,
      password: data.password,
    });
    toast({
      title: "Success",
      description: "Signed in successfully",
    });

    router.push('/dashboard');
  })

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
      <SignInForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}