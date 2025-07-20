
import React from 'react';
import {Button} from './ui/button';
import Link from 'next/link';


const Header: React.FC = () => {
  return (
    <header className="z-50 p-6 pb-5">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white font-poppins">SyndicateUP</h1>
        <div className="hidden md:flex items-center space-x-8 text-white">
            <a href="#features" className="hover:text-[#FFD98C] transition-colors">Features</a>
            <a href="#how-we-help" className="hover:text-[#FFD98C] transition-colors">How we help</a>
            <a href="#pricing" className="hover:text-[#FFD98C] transition-colors">Pricing</a>
        </div>
        <Link href="/signin">
          <Button variant="secondary" className="hidden md:block px-3 py-0.5">Sign In</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
