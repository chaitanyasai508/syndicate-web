
import React from 'react';
import {Button} from './ui/button';
import FadeIn from './ui/FadeIn';
import Link from 'next/link';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <FadeIn>
                <div className="relative rounded-2xl bg-gradient-to-r from-[#FFD98C] to-[#FFC346] p-12 text-center overflow-hidden">
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-black/10 rounded-full"></div>
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-black/10 rounded-full"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-black font-poppins">Ready to Connect and Create?</h2>
                        <p className="mt-4 text-lg text-black/80 max-w-2xl mx-auto">
                            Join SyndicateUP today and unlock a world of business opportunities. Your next great venture is just a connection away.
                        </p>
                        <div className="mt-8">
                            <Link href={'/signup'}>  
                                <Button variant="secondary" className="bg-black text-white border-black hover:bg-gray-800 hover:text-white">
                                    Join Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
  );
};

export default CtaSection;
