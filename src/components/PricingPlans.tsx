import React from 'react';
import { Plan } from '@/types/stripe';
import { Button } from '@/components/ui/button';

function PricingPlans({
    plan,
    onSubscribe,
    isLoading,
    popular
  }: {
    plan: Plan;
    onSubscribe?: () => void;
    isLoading: boolean;
    popular?: boolean;
  }) {
    const TickIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFC346] mr-3 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
    const isLoggedIn = Boolean(onSubscribe);
    
    return (
      <div className={`relative p-8 rounded-2xl border scale-2 transition-all duration-300 ${popular ? 'border-[#FFC346] bg-gray-800/30' : 'border-gray-700 bg-gray-900/30'}`}>
        {popular && (
          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFC346] text-black text-sm font-semibold rounded-full">
            Most Popular
          </div>
        )}
        <div className="">
          {/* Header */}
          <h3 className="text-2xl font-bold text-foreground">{plan.nickName}</h3>
          <p className="mt-2 text-foreground/70">{plan.description}</p>
  
          {/* Price Display */}
          <div className="mt-4">
            {plan.discountPercentage > 0 && (
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400">
                  ${(plan.totalPrice).toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  {plan.discountLabel}
                </span>
              </div>
            )} 
            <div className="mt-6">
                <span className="text-5xl font-extrabold text-white">
                ${(plan.discountedTotalPrice).toFixed(2)}
              </span>
              <span className="ml-2 text-foreground/70">
                for {plan.duration} {plan.duration === 1 ? 'month' : 'months'}
              </span>
            </div>
          </div>
  
          {/* Monthly Breakdown */}
          {/* <div className="mt-4 space-y-2 bg-gray-800/50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Monthly price:</span>
              <span className="font-medium text-green-600">
                ${(plan.discountedMonthlyPrice).toFixed(2)}/mo
              </span>
            </div>
            {plan.monthlySavings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Monthly savings:</span>
                <span className="text-green-600 font-medium">
                  ${(plan.monthlySavings).toFixed(2)}/mo
                </span>
              </div>
            )}
            {plan.totalSavings > 0 && (
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total savings:</span>
                    <span className="text-green-600 font-medium">
                        ${(plan.totalSavings).toFixed(2)}
                    </span>
                </div>
            )}
  
          </div> */}
  
          {/* Features or Additional Info */}
          <ul className="mt-8 space-y-4">
            <li className="flex items-start">
                <TickIcon />
                <span className='text-gray-300'>Full access to all features</span>
            </li>
            <li className="flex items-start">
                <TickIcon />
                <span className='text-gray-300'>{plan.duration}-month billing</span>
            </li>
            {plan.discountPercentage > 0 && (
              <li className="flex items-start">
                <TickIcon />
                <span className='text-gray-300'>{plan.discountPercentage}% discount applied</span>
              </li>
            )}
          </ul>
  
          {/* Subscribe Button */}
          <Button
            onClick={onSubscribe}
            disabled={isLoading}
            variant={popular ? 'default' : 'secondary'}
            className="w-full mt-10"
          >
            {isLoading ? 'Processing...' : 'Choose Plan'}
          </Button>
        </div>
      </div>
    );
  }

export default PricingPlans;