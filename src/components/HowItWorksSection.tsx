import React, { useState, useRef, useEffect, useCallback } from 'react';
import FadeIn from './ui/FadeIn';
import Link from 'next/link';

// Modern SVG Icons with better styling
const ListFindIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
);

const AiMatchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m13.5 10.5-3 3"></path>
        <path d="m10.5 10.5-3 3"></path>
        <path d="M12 8v8"></path>
        <path d="m15 11-3-3"></path>
    </svg>
);

const SecureDealIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        <path d="M12 16a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1z"></path>
    </svg>
);

interface Step {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    accentColor: string;
}

const steps: Step[] = [
    {
        icon: <ListFindIcon />,
        title: "List or Find an Opportunity",
        description: "Easily create a profile for your business or browse our curated listings to find your next venture. Our platform provides the tools to present your opportunity in the best light.",
        gradient: "from-[#FFC346]/20 to-[#FFD98C]/20",
        accentColor: "from-[#FFC346] to-[#FFD98C]"
    },
    {
        icon: <AiMatchIcon />,
        title: "AI-Powered Matchmaking",
        description: "Our intelligent platform analyzes vast datasets to connect you with the most relevant partners, buyers, or sellers. Say goodbye to endless searching and hello to qualified leads.",
        gradient: "from-[#FFD98C]/20 to-[#FFC346]/20",
        accentColor: "from-[#FFD98C] to-[#FFC346]"
    },
    {
        icon: <SecureDealIcon />,
        title: "Secure, Confidential Deal-Making",
        description: "Utilize our suite of secure, in-app tools to negotiate terms, manage documentation, sign NDAs, and finalize deals with complete confidence and confidentiality.",
        gradient: "from-[#FFC346]/20 to-[#FFD98C]/20",
        accentColor: "from-[#FFC346] to-[#FFD98C]"
    }
];

const HowItWorksSection: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);

    // Handle scroll-based parallax effect with performance optimization
    const handleScroll = useCallback(() => {
        if (!sectionRef.current) return;

        if (animationFrameRef.current !== undefined) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;

            // Calculate scroll progress within the section
            const scrollTop = window.pageYOffset;
            const sectionTop = sectionRef.current.offsetTop;
            const progress = Math.max(0, Math.min(1, (scrollTop - sectionTop + windowHeight) / (sectionHeight + windowHeight)));

            setScrollProgress(progress);
        });
    }, []);

    // Handle mouse movement for interactive effects
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial call
        }

        return () => {
            if (animationFrameRef.current !== undefined) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (!prefersReducedMotion) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-step-index') || '0', 10);
                        setActiveStep(index);
                    }
                });
            },
            {
                rootMargin: '-30% 0px -30% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        const currentRefs = stepRefs.current;
        currentRefs.forEach((ref: HTMLDivElement | null) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            currentRefs.forEach((ref: HTMLDivElement | null) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-32 bg-[#131313]/50 relative overflow-hidden"
            onMouseMove={handleMouseMove}
            id="how-it-works"
        >
            {/* Animated background elements */}
            {/* <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#FFC346]/10 to-[#FFD98C]/10 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                ></div>
                <div
                    className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[#FFD98C]/10 to-[#FFC346]/10 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-[#FFC346]/10 to-[#FFD98C]/10 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                ></div>

                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 195, 70, 0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
            </div> */}

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <FadeIn>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FFC346]/20 to-[#FFD98C]/20 rounded-full border border-[#FFC346]/30 mb-6">
                            <span className="text-[#FFD98C] text-sm font-medium">How It Works</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white font-poppins mb-6 bg-gradient-to-r from-white via-[#FFD98C] to-[#FFC346] bg-clip-text text-transparent">
                            Your Path to Business Growth
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            A streamlined process designed for efficiency and success, powered by AI at every step.
                        </p>
                    </FadeIn>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            ref={(el: HTMLDivElement | null) => {
                                if (el) stepRefs.current[index] = el;
                            }}
                            data-step-index={index}
                            className={`group relative transition-all duration-700 ease-out ${
                                activeStep === index ? 'scale-105' : 'scale-100'
                            }`}
                        >
                            {/* Custom shaped card - clean and subtle */}
                            <div className="relative">
                                {/* Main card */}
                                <div className={`relative border-gray-700 bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border hover:border-[#FFC346]/20 transition-all duration-300 h-full group`}>
                                    {/* Step number - subtle */}
                                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-800/80 rounded-full border border-[#FFC346]/30 flex items-center justify-center">
                                        <span className="text-[#FFD98C] font-semibold text-sm">{index + 1}</span>
                                    </div>

                                    {/* Icon - clean and simple */}
                                    <div className="relative mb-6">
                                        <div className={`w-14 h-14 bg-gray-800/60 rounded-xl flex items-center justify-center text-[#FFD98C] group-hover:bg-gray-800/80 transition-all duration-300`}>
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FFD98C] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                                {/* Connection line (for desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-gradient-to-r from-[#FFC346] to-transparent"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <Link href="/signin">
                    <div className="text-center mt-20">
                        <FadeIn>
                            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#FFC346]/20 to-[#FFD98C]/20 rounded-full border border-[#FFC346]/30 hover:border-[#FFD98C]/50 transition-all duration-300 cursor-pointer group">
                                <span className="text-[#FFD98C] group-hover:text-[#FFC346] transition-colors duration-300">Ready to get started?</span>
                                <svg className="w-5 h-5 text-[#FFD98C] group-hover:text-[#FFC346] transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </FadeIn>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default HowItWorksSection;