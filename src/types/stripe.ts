export interface Plan {
  discountPercentage: number;
  stripeCouponId: string | null;
  isActive: boolean;
  name: string;
  nickName: string;
  basePrice: number;
  duration: number;
  description: string;
  stripePriceId: string;
  currency: string;
  totalPrice: number;
  discountedTotalPrice: number;
  monthlyPrice: number;
  discountedMonthlyPrice: number;
  monthlySavings: number;
  totalSavings: number;
  discountLabel: string;
  id: string;
}

export interface SubscriptionResponse {
id: string;
status: string;
customerId: string;
}