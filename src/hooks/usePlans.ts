import { useQuery } from '@tanstack/react-query';
import { Plan } from '@/types/stripe';
import api from '@/lib/api/axios';


async function getPlans(): Promise<Plan[]> {
    const response = await api.get("/plans/list")
    return response.data.plans
  }
export function usePlans() {
  return useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: getPlans,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}