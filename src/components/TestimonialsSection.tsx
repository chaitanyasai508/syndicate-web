
import React from 'react';
import FadeIn from './ui/FadeIn';

const TestimonialCard: React.FC<{ quote: string, name: string, title: string, imageUrl: string }> = ({ quote, name, title, imageUrl }) => (
    <div className="bg-gray-800/20 p-8 rounded-2xl border border-gray-700/50 h-full flex flex-col">
        <p className="text-gray-300 flex-grow">"{quote}"</p>
        <div className="mt-6 flex items-center">
            <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div>
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-[#FFD98C]">{title}</p>
            </div>
        </div>
    </div>
);

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        {
            quote: "SyndicateUP's AI connected me with the perfect partner for my startup. The process was seamless and incredibly efficient.",
            name: "Jane Doe",
            title: "Founder, TechSavvy Inc.",
            imageUrl: "https://picsum.photos/100/100?image=29"
        },
        {
            quote: "As an investor, finding quality deals is tough. This platform brought verified, relevant opportunities directly to me. A game-changer.",
            name: "John Smith",
            title: "Angel Investor",
            imageUrl: "https://picsum.photos/100/100?image=31"
        },
        {
            quote: "We sold our family business through SyndicateUP. The confidentiality and control we had over the process were far superior to any traditional broker.",
            name: "Emily White",
            title: "Former Owner, Culinary Creations",
            imageUrl: "https://picsum.photos/100/100?image=32"
        }
    ];

    return (
        <section className="py-20 md:py-32 ">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">Real Connections, Real Growth</h2>
                    <p className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">Hear from users who have transformed their business journey with us.</p>
                </FadeIn>
                <div className="mt-16 grid lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <FadeIn key={index} delay={index * 200}>
                            <TestimonialCard {...testimonial} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
