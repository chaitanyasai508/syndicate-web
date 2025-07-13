
import React from 'react';
import FadeIn from './ui/FadeIn';

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M20 6 9 17l-5-5"></path></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>;

const comparisonData = [
    { feature: "Transaction Fees", syndicate: "< 2% Fee", traditional: "8% - 12% Commission" },
    { feature: "Technology", syndicate: "AI-Powered & Self-Serve", traditional: "Manual, Broker-Led" },
    { feature: "Efficiency", syndicate: "Streamlined & In-App", traditional: "Variable, Less Direct" },
    { feature: "Confidentiality", syndicate: "Secure & Built-in NDAs", traditional: "Process Varies" },
    { feature: "Control", syndicate: "High User Control", traditional: "Broker-Mediated" },
    { feature: "Post-Sale Support", syndicate: <CheckIcon />, traditional: <XIcon /> },
];

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 ">
      <div className="container mx-auto px-6">
        <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">A Clear Advantage</h2>
            <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">See how SyndicateUP stacks up against traditional methods.</p>
        </FadeIn>
        <FadeIn delay={200}>
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
                <div className="grid grid-cols-3 text-lg font-bold text-center text-white bg-gray-900/40">
                  <div className="p-4">Feature</div>
                  <div className="p-4 border-l border-r border-gray-700 bg-gradient-to-b from-[#FFC346]/20 to-transparent">SyndicateUP</div>
                  <div className="p-4">Traditional Brokers</div>
                </div>
                {comparisonData.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 text-center items-center border-t border-gray-700/50">
                    <div className="p-4 text-left font-semibold">{item.feature}</div>
                    <div className="p-4 border-l border-r border-gray-700/50 bg-[#FFD98C]/5 text-white flex justify-center items-center h-full">
                      <span className="font-semibold text-lg">{item.syndicate}</span>
                    </div>
                    <div className="p-4 text-gray-400 flex justify-center items-center h-full">
                      <span>{item.traditional}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ComparisonSection;
