import React, { useRef, useEffect } from 'react';
import FadeIn from './ui/FadeIn';

const ParallaxCard: React.FC<{
  imageUrl: string;
  title: string;
  who: string;
  why: string;
  reverse?: boolean;
}> = ({ imageUrl, title, who, why, reverse = false }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current && imageRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const yOffset = (scrollPercent - 0.5) * 40; // parallax effect strength
          imageRef.current.style.transform = `scale(1.15) translateY(${yOffset}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-gray-800/20 border border-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-sm grid md:grid-cols-2 gap-8 items-center transition-all duration-300 hover:border-[#FFC346]/50 hover:shadow-2xl hover:shadow-[#FFC346]/10`}
    >
      <div className={`h-96 md:h-[500px] overflow-hidden ${reverse ? 'md:order-last' : ''} ${reverse ? 'clip-angled-reverse' : 'clip-angled'}`}>
        <img
          ref={imageRef}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{ transform: 'scale(1.15)' }}
        />
      </div>
      <div className={`p-8 md:p-12 ${reverse ? 'md:order-first' : ''}`}>
        <h3 className="text-3xl font-bold text-[#FFD98C] mb-4 font-poppins">{title}</h3>
        <div className="space-y-4">
            <div>
                <p className="text-white font-semibold mb-1 text-lg">Who:</p>
                <p className="text-gray-300">{who}</p>
            </div>
             <div>
                <p className="text-white font-semibold mb-1 text-lg">Why:</p>
                <p className="text-gray-300">{why}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const TargetUsersSection: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-[#131313]/50">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">Who Benefits from SyndicateUP?</h2>
                    <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">A platform built for the ambitious and the visionary.</p>
                </FadeIn>
                <div className="mt-20 space-y-16">
                    <FadeIn>
                        <ParallaxCard
                            imageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop"
                            title="Business Professionals"
                            who="Entrepreneurs, small business owners, consultants, freelancers, and corporate professionals."
                            why="They seek tools for networking, collaboration, deal-making, or project management."
                        />
                    </FadeIn>
                    <FadeIn delay={200}>
                        <ParallaxCard
                            imageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2787&auto=format&fit=crop"
                            title="Investors & Dealmakers"
                            who="Private equity professionals, small investors, angel investors, and business buyers/sellers."
                            why="They need tools for connecting, negotiating, and finalizing deals efficiently and securely."
                            reverse={true}
                        />
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default TargetUsersSection;