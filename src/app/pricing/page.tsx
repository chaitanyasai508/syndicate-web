'use client';

import { useState } from 'react';
import { usePlans } from '@/hooks/usePlans';
import { Plan } from '@/types/stripe';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api/axios';

export default function PricingPage() {
  const { data: plans, isLoading, error } = usePlans();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(planId);
      const response = await api.get(`/subscriptions/${planId}/create-checkout-session`)
      const { sessionUrl } = response.data;

      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
        if((err as unknown as { response: { data: { errorKey: string } } })?.response?.data?.errorKey === 'ACTIVE_SUBSCRIPTION_EXISTS') {
            toast({
              title: 'Subscription error',
              description: 'You already have an active subscription',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Subscription error',
              description: 'Failed to start checkout session',
              variant: 'destructive',
            });
          }
    } finally {
      setLoading(null);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Failed to load plans</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 h-full">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          Pricing Plans
        </h1>
        <p className="mt-4 text-xl text-foreground/70">
          Choose the perfect plan for your needs
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans?.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onSubscribe={() => handleSubscribe(plan.id)}
            isLoading={loading === plan.id}
          />
        ))}
      </div>
    </div>
  );
}

function PricingCard({
    plan,
    onSubscribe,
    isLoading
  }: {
    plan: Plan;
    onSubscribe: () => void;
    isLoading: boolean;
  }) {
    return (
      <div className="rounded-lg shadow-xl bg-foreground/10 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
        <div className="px-6 py-8">
          {/* Header */}
          <h3 className="text-2xl font-bold text-foreground">{plan.nickName}</h3>
          <p className="mt-2 text-foreground/70">{plan.description}</p>

          {/* Price Display */}
          <div className="mt-4">
            {plan.discountPercentage > 0 && (
              <div className="flex items-center gap-2">
                <span className="line-through text-foreground/70">
                  ${(plan.totalPrice).toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  {plan.discountLabel}
                </span>
              </div>
            )}
            <div className="flex items-baseline">
                <span className="text-4xl font-bold text-foreground">
                ${(plan.discountedTotalPrice).toFixed(2)}
              </span>
              <span className="ml-2 text-foreground/70">
                for {plan.duration} {plan.duration === 1 ? 'month' : 'months'}
              </span>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="mt-4 space-y-2 bg-foreground/5 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/70">Monthly price:</span>
              <span className="font-medium text-green-600">
                ${(plan.discountedMonthlyPrice).toFixed(2)}/mo
              </span>
            </div>
            {plan.monthlySavings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-foreground/70">Monthly savings:</span>
                <span className="text-green-600 font-medium">
                  ${(plan.monthlySavings).toFixed(2)}/mo
                </span>
              </div>
            )}
            {plan.totalSavings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-foreground/70">Total savings:</span>
                <span className="text-green-600 font-medium">
                  ${(plan.totalSavings).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Features or Additional Info */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center text-sm">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className='text-foreground/70'>Full access to all features</span>
            </div>
            <div className="flex items-center text-sm">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className='text-foreground/70'>{plan.duration}-month billing</span>
            </div>
            {plan.discountPercentage > 0 && (
              <div className="flex items-center text-sm">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className='text-foreground/70'>{plan.discountPercentage}% discount applied</span>
              </div>
            )}
          </div>

          {/* Subscribe Button */}
          <button
            onClick={onSubscribe}
            disabled={isLoading}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Processing...' : 'Subscribe'}
          </button>
        </div>
      </div>
    );
  }
