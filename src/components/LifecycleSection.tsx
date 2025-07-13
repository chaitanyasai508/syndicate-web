import React from 'react';
import FadeIn from './ui/FadeIn';

// Icons
const IdeaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l.346.666L19.5 15.3l-1.346 2.333H5.846L4.5 15.3l7.154-11.934.346-.666z"/><path d="M12 22v-3"/><path d="M12 9l-2 3h4l-2 3"/></svg>;
const SetupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-4.44a2 2 0 00-2 2v16a2 2 0 002 2h8.88a2 2 0 002-2v-8.88"/><path d="M18 2h2v2h-2zM15 2h2v2h-2zM18 5h2v2h-2zM15 5h2v2h-2zM12 12.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/><path d="M12 18H7"/></svg>;
const MatchmakingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="m22.5 11-2.5-2.5-2.5 2.5"/></svg>;
const ExpansionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m6 6v-4m0 4h-4"/><path d="M3 3v4m0-4h4"/><path d="M3 12a9 9 0 0113.46-7.55L21 9"/></svg>;
const SuccessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;

const phases = [
    {
        icon: <IdeaIcon />,
        name: "Idea Validation",
        description: "Free tools for market feasibility analysis, personalized recommendations, and industry insights."
    },
    {
        icon: <SetupIcon />,
        name: "Business Setup",
        description: "Support for legal setup, operational guidance, vendor connections, and marketing strategies."
    },
    {
        icon: <MatchmakingIcon />,
        name: "Business Matchmaking",
        description: "Access to finding collaborators and investor connections, with tools for skill alignment."
    },
    {
        icon: <ExpansionIcon />,
        name: "Expansion",
        description: "Tools for revisiting matchmaking, market expansion, growth capital access, and team scaling."
    },
    {
        icon: <SuccessIcon />,
        name: "Sustaining Success",
        description: "Features for sharing success stories, data monetization, community building, and loyalty rewards."
    }
];

const LifecycleSection: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-[#131313]/50" id="how-we-help">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">Your Business Lifecycle Partner</h2>
                    <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">From a spark of an idea to a lasting legacy, we're with you at every step.</p>
                </FadeIn>
                <div className="relative mt-20">
                    {/* Single vertical line for the timeline */}
                    <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-gray-700 z-0" aria-hidden="true"></div>
                    <div className="grid grid-cols-3 gap-x-0 gap-y-12 relative z-10">
                        {phases.map((phase, index) => (
                            <React.Fragment key={index}>
                                {/* Left Card (even index) */}
                                {index % 2 === 0 ? (
                                    <>
                                        <div className="col-span-1 flex justify-start items-center h-full hover:scale-105 transition-all duration-300 z-10">
                                            <FadeIn delay={index * 100} className="flex justify-end">
                                                <div className="w-full md:w-11/12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl shadow-lg hover:border-[#FFC346]/50 transition-colors duration-300">
                                                    <div className="flex items-center gap-1">
                                                        <div className="text-[#FFC346] bg-gray-900/50 p-2 rounded-full">
                                                            {phase.icon}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                                                    </div>
                                                    <p className="mt-3 text-gray-400">{phase.description}</p>
                                                </div>
                                            </FadeIn>
                                        </div>
                                        {/* Timeline Dot + Horizontal Line */}
                                        <div className="col-span-1 flex flex-col items-center relative h-full justify-center">
                                        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1/2 border-t-2 border-dashed border-gray-500 z-0" />
                                        <div className="w-5 h-5 rounded-full bg-[#FFC346] border-4 border-[#131313] z-10"></div>
                                        </div>
                                        {/* Empty right cell */}
                                        <div className="col-span-1"></div>
                                    </>
                                ) : (
                                    <>
                                        {/* Empty left cell */}
                                        <div className="col-span-1"></div>
                                        {/* Timeline Dot + Horizontal Line */}
                                        <div className="col-span-1 flex flex-col items-center relative h-full justify-center">
                                        {/* Horizontal line from dot to right card */}
                                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 border-t-2 border-dashed border-gray-500 z-0" />                                        <div className="w-5 h-5 rounded-full bg-[#FFC346] border-4 border-[#131313] z-10"></div>
                                        </div>
                                        {/* Right Card */}
                                        <div className="col-span-1 flex justify-start items-center h-full hover:scale-105 transition-all duration-300 z-10">
                                            <FadeIn delay={index * 100}>
                                                <div className="w-full md:w-11/12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl shadow-lg hover:border-[#FFC346]/50 transition-colors duration-300">
                                                    <div className="flex items-center gap-1">
                                                        <div className="text-[#FFC346] bg-gray-900/50 p-2 rounded-full">
                                                            {phase.icon}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                                                    </div>
                                                <p className="mt-3 text-gray-400">{phase.description}</p>
                                                </div>
                                            </FadeIn>
                                        </div>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LifecycleSection;