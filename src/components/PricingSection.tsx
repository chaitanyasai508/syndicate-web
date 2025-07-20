
import React from 'react';
import {Button} from './ui/button';
import FadeIn from './ui/FadeIn';
import { usePlans } from '@/hooks/usePlans';
import PricingPlans from '@/components/PricingPlans';
const TickIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFC346] mr-3 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
import { useRouter } from 'next/navigation'; 


const PricingSection: React.FC = () => {
  const { data: plans, isLoading, error } = usePlans();
  const location = useRouter();

    return (
        <section id="pricing" className="py-20 md:py-32  bg-[#131313]/50">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">Choose the plan that's right for your ambition. Plus, a low transaction fee upon success.</p>
                </FadeIn>
                <div className="mt-16 grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans?.map((plan, index) => (
                        <FadeIn key={plan.id} delay={100 * (index + 1)}>
                            <PricingPlans
                                key={plan.id}
                                plan={plan}
                                onSubscribe={() => location.push('signin')}
                                isLoading={isLoading}
                                popular={plan?.name === '3_MONTHS'}
                            />
                        </FadeIn>
                    ))}
                    {/* <FadeIn>
                        <PricingCard
                            plan="Starter"
                            price="Free"
                            description="For individuals exploring ideas and opportunities."
                            features={["Basic matchmaking", "Community forum access", "Idea validation tools"]}
                        />
                    </FadeIn>
                    <FadeIn delay={200}>
                        <PricingCard
                            plan="Professional"
                            price="$49"
                            description="For serious entrepreneurs and business owners."
                            features={["Advanced AI matchmaking", "Verified listings", "Full operational support", "Regulatory guidance", "Priority support"]}
                            popular={true}
                        />
                    </FadeIn>
                    <FadeIn delay={400}>
                        <PricingCard
                            plan="Enterprise"
                            price="Custom"
                            description="For established businesses and investors."
                            features={["All Professional features", "Dedicated account manager", "API access", "Custom integrations"]}
                        />
                    </FadeIn> */}
                </div>
                <FadeIn>
                   <div className="mt-16 text-center text-gray-400 bg-gray-800/20 border border-gray-700/50 rounded-lg p-6 max-w-2xl mx-auto">
                        <p className="font-bold text-white text-lg">Successful Transaction Fee</p>
                        <p>A low fee of less than <span className="text-[#FFD98C] font-bold">2%</span> is charged only upon successful deal completion. No success, no fee.</p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default PricingSection;
