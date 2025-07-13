
import React from 'react';
import FadeIn from './ui/FadeIn';

const ResourceCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-800/20 p-6 rounded-xl border border-gray-700/50 text-center transition-all duration-300 hover:border-[#FFC346]/50 hover:bg-gray-800/40 hover:-translate-y-2">
        <div className="mx-auto w-16 h-16 flex items-center justify-center text-[#FFD98C] bg-gray-900/50 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
        <a href="#" className="mt-4 inline-block text-[#FFD98C] font-semibold hover:text-white">Learn More &rarr;</a>
    </div>
);


const CommunitySection: React.FC = () => {
    return (
        <section id="community" className="py-20 md:py-32">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">Join Our Growing Community</h2>
                    <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">Connect, learn, and grow with a network of ambitious professionals and investors.</p>
                </FadeIn>
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <FadeIn>
                        <ResourceCard icon={<ForumIcon />} title="Open Forums" description="Connect with peers, ask questions, and share valuable insights in our community-driven forums." />
                    </FadeIn>
                    <FadeIn delay={200}>
                        <ResourceCard icon={<GuidesIcon />} title="Guides & Case Studies" description="Access our library of expert content on business strategy, market trends, and platform best practices." />
                    </FadeIn>
                    <FadeIn delay={400}>
                        <ResourceCard icon={<EventsIcon />} title="Events & Webinars" description="Join exclusive online events for networking opportunities and deep dives with industry leaders." />
                    </FadeIn>
                </div>
                <FadeIn>
                    <div className="mt-20 max-w-2xl mx-auto bg-gray-800/30 rounded-2xl p-8 text-center border border-gray-700/50">
                        <h3 className="text-2xl font-bold text-white">Stay in the Loop</h3>
                        <p className="mt-2 text-gray-400">Subscribe to our newsletter for the latest insights, news, and platform updates.</p>
                        <form className="mt-6 flex flex-col sm:flex-row gap-3">
                            <input type="email" placeholder="Enter your email" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#FFC346] focus:outline-none" />
                            <button type="submit" className="bg-[#FFC346] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#FFD98C] transition-colors">Subscribe</button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

// SVG Icons
const ForumIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const GuidesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const EventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;

export default CommunitySection;
