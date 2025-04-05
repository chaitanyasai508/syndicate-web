import { useQuery } from "@tanstack/react-query"
import { User } from "@/types/auth"
import api from "@/lib/api/axios"

async function getUser(): Promise<User> {
  const response = await api.get("/auth/me")
  return response.data
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}