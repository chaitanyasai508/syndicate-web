

import { useQuery } from '@tanstack/react-query';
import { Plan } from '@/types/stripe';
import api from '@/lib/api/axios';


async function getSubscriptionDetails(): Promise<Plan[]> {
    const response = await api.get("/subscriptions/current")
    console.log(response)
    return response.data
  }
export function useSubscriptionStatus() {
  return useQuery<Plan[]>({
    queryKey: ['subsctiption-status'],
    queryFn: getSubscriptionDetails,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}