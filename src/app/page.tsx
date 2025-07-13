"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturesSection from '@/components/FeaturesSection';
import TargetUsersSection from '@/components/TargetUsersSection';
import LifecycleSection from '@/components/LifecycleSection';
import ComparisonSection from '@/components/ComparisonSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CommunitySection from '@/components/CommunitySection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="bg-transparent overflow-x-hidden">
      <main>
        <div className="h-screen flex flex-col">
          <Header />
          <HeroSection />
        </div>
        <HowItWorksSection />
        <FeaturesSection />
        {/* <TargetUsersSection /> */}
        <LifecycleSection />
        <ComparisonSection />
        <PricingSection />
        <TestimonialsSection />
        {/* <CommunitySection /> */}
        <CtaSection />
      </main>
      <Footer />
  </div>
  )
}
