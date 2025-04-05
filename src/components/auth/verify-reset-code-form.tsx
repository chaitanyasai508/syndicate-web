"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,

} from "@/components/ui/input-otp"
import {  } from "@/components/ui/input-otp";

const verifyResetCodeSchema = z.object({
  code: z.string().length(6).regex(/^\d+$/, "Code must contain only numbers"),
})

type VerifyResetCodeFormValues = z.infer<typeof verifyResetCodeSchema>

interface VerifyResetCodeFormProps {
  isLoading: boolean
  onSubmit: (data: VerifyResetCodeFormValues) => void
  onResendCode: () => void
}

export function VerifyResetCodeForm(props: VerifyResetCodeFormProps) {
  const { isLoading, onSubmit, onResendCode } = props;

  const form = useForm<VerifyResetCodeFormValues>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      code: "123456",
    },
  });

  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Enter Reset Code</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please enter the 6-digit code sent to your email
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-center">Reset Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the 6-digit code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Didn&apos;t receive the code?{" "}
        <Link href="#" onClick={onResendCode} className="text-blue-500 hover:underline">
          Request again
        </Link>
      </div>
    </div>
  )
}