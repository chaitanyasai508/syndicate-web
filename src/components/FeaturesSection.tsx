import React, { useRef } from 'react';
import FadeIn from './ui/FadeIn';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="feature-card bg-gray-900/30 p-8 rounded-2xl border border-gray-700/50 transition-all duration-300"
    >
      <div className="text-[#FFD98C] mb-4 w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-[#FFC346]/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <MatchmakingIcon />,
            title: "Business Matchmaking",
            description: "AI-driven recommendations for buyers, sellers, and partners based on detailed profiles and preferences."
        },
        {
            icon: <LocationIcon />,
            title: "Location-Based Insights",
            description: "Access local market data, trends, and opportunities relevant to your business or search area."
        },
        {
            icon: <IndustryIcon />,
            title: "Industry-Specific Support",
            description: "Curated resources, operational templates, and success strategies tailored to various industries."
        },
        {
            icon: <StreamlinedOpsIcon />,
            title: "Streamlined Operations",
            description: "Tools and guidance for managing financial documentation, business presentations, and other operational aspects."
        },
        {
            icon: <RegulatoryIcon />,
            title: "Regulatory Guidance",
            description: "Step-by-step assistance for understanding and obtaining necessary permits, certifications, and licenses."
        },
        {
            icon: <AiRecsIcon />,
            title: "AI Recommendations",
            description: "Insights on business health, market trends, and potential cost-saving measures powered by AI analysis."
        }
    ];

    return (
        <section id="features" className="py-20 md:py-32">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">Powerful Features to Propel Your Business</h2>
                    <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">Everything you need to connect, grow, and succeed.</p>
                </FadeIn>
                <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={100 * (index % 3)}>
                            <FeatureCard {...feature} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

// SVG Icons
const MatchmakingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IndustryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16.7V6.3c0-1.2 1.3-2 2.4-1.3l6.5 3.7c1.1.6 1.1 2.1 0 2.7l-6.5 3.7c-1.1.7-2.4 0-2.4-1.3zM16 18V6"></path></svg>;
const StreamlinedOpsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
const RegulatoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;
const AiRecsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 12.5c0 .6-.4 1-1 1h-12c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v1zM8.5 10.5h7c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1h-7c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1zM4 17h16"></path><path d="M12 17v-2.5"></path><path d="M12 8.5V6"></path></svg>;

export default FeaturesSection;