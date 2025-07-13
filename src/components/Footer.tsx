
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#131313] py-12">
            <div className="container mx-auto px-6 text-center text-gray-400">
                <h2 className="text-2xl font-bold text-white font-poppins">SyndicateUP</h2>
                <div className="flex justify-center gap-6 my-6">
                    <a href="#" className="hover:text-[#FFD98C] transition-colors">About Us</a>
                    <a href="#" className="hover:text-[#FFD98C] transition-colors">Blog</a>
                    <a href="#" className="hover:text-[#FFD98C] transition-colors">Careers</a>
                    <a href="#" className="hover:text-[#FFD98C] transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-[#FFD98C] transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-[#FFD98C] transition-colors">Contact</a>
                </div>
                <div className="flex justify-center gap-6 my-6">
                    {/* Social Media Icons would go here */}
                </div>
                <p>&copy; {new Date().getFullYear()} SyndicateUP. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
