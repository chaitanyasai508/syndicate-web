import { create } from 'zustand'

interface SubscriptionState {
  subscription: any;
  status: string | null;
  setSubscription: (subscription: any) => void;
  setStatus: (status: string | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscription: null,
  status: null,

  setSubscription: (subscription: any) => set({ subscription }),
  setStatus: (status: string | null) => set({ status }),

}));