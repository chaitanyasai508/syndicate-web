
import React from 'react';
import {Button} from './ui/button';
import FadeIn from './ui/FadeIn';

const TickIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFC346] mr-3 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

const PricingCard: React.FC<{ plan: string, price: string, description: string, features: string[], popular?: boolean }> = ({ plan, price, description, features, popular }) => (
    <div className={`relative p-8 rounded-2xl border transition-all duration-300 ${popular ? 'border-[#FFC346] bg-gray-800/30' : 'border-gray-700 bg-gray-900/30'}`}>
        {popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFC346] text-black text-sm font-semibold rounded-full">Most Popular</div>}
        <h3 className="text-2xl font-bold text-white">{plan}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
        <div className="mt-6">
            <span className="text-5xl font-extrabold text-white">{price}</span>
            {price !== "Free" && <span className="text-gray-400">/ month</span>}
        </div>
        <ul className="mt-8 space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <TickIcon />
                    <span className="text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>
        <Button variant={popular ? 'primary' : 'secondary'} className="w-full mt-10">
            Choose Plan
        </Button>
    </div>
);


const PricingSection: React.FC = () => {
    return (
        <section id="pricing" className="py-20 md:py-32  bg-[#131313]/50">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">Choose the plan that's right for your ambition. Plus, a low transaction fee upon success.</p>
                </FadeIn>
                <div className="mt-16 grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <FadeIn>
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
                    </FadeIn>
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
