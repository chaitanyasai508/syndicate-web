import { toast } from "@/hooks/use-toast"
import { AxiosError } from "axios"

interface ErrorResponse {
  message: string
  code?: string
  status?: number
}

export function handleError(error: unknown): never {
  console.error("Error:", error)

  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message
    toast({
      variant: "destructive",
      title: "Api Error",
      description: message,
    })
    throw new Error(message)
  }

  if (error instanceof Error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    })
    throw error
  }

  toast({
    variant: "destructive",
    title: "Unexpected Error",
    description: "An unexpected error occurred",
  })
  throw new Error("An unexpected error occurred")
}

export function catchAsync<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>
): (...args: Args) => Promise<T> {
  return async (...args: Args) => {
    try {
      return await fn(...args)
    } catch (error) {
      return handleError(error)
    }
  }
}