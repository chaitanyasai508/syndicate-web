"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { forgotPasswordSchema } from "@/lib/validations/auth"

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

interface ForgotPasswordFormProps {
  isLoading: boolean
  onSubmit: (data: ForgotPasswordFormValues) => void
}

export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { isLoading, onSubmit } = props;
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })


  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending reset code..." : "Send reset code"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/signin" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}