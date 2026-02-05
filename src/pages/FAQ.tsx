import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: "How do I place an order for a custom hamper?",
        answer: "To order a custom hamper, you can use our 'Build Custom Hamper' tool on the home page or contact us directly via WhatsApp. Pick your items, and we'll handle the curated packaging!"
    },
    {
        question: "What are your delivery timelines across India?",
        answer: "We typically deliver within 3-5 business days for major cities and 5-7 business days for other parts of India. Express shipping options are available upon request."
    },
    {
        question: "Can I add a personalized note to my gift?",
        answer: "Absolutely! Every Dieuclat gift comes with a complimentary handwritten note. You can provide your message during the checkout process."
    },
    {
        question: "Do you handle bulk orders for corporate events?",
        answer: "Yes, we specialize in corporate gifting. Please visit our 'Corporate' section or reach out to us at hello@dieuclat.com for bespoke bulk pricing and branding options."
    },
    {
        question: "What materials do you use for packaging?",
        answer: "We use premium, eco-friendly materials including kraft boxes, silk ribbons, and dried floral accents to ensure your gift looks stunning and is sustainable."
    },
    {
        question: "Can I track my order once it's shipped?",
        answer: "Yes, once your order is dispatched, you will receive a tracking link via SMS and email to monitor your gift's journey."
    },
    {
        question: "What is your return policy?",
        answer: "Since our products are often personalized or contain perishable items, we only accept returns for items damaged during transit. Please refer to our Returns Policy page for details."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we only ship within India. However, we are working on bringing Dieuclat to the world soon!"
    },
    {
        question: "How can I contact your support team?",
        answer: "You can reach us at hello@dieuclat.com or call/WhatsApp us at +91 98765 43210 between 10 AM and 7 PM, Monday to Saturday."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        gsap.fromTo('.faq-item',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen pt-32 pb-20 bg-warm">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <span className="inline-block text-eyebrow text-brand-rose mb-4 px-4 py-2 glass-warm rounded-full">
                        Support
                    </span>
                    <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-tight text-brand-charcoal mb-4">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h1>
                    <p className="font-body text-brand-charcoal/50 text-lg">
                        Everything you need to know about Dieuclat Gifting
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item group"
                        >
                            <button
                                onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 lg:p-8 bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl border border-white/50 text-left transition-all hover:bg-white"
                            >
                                <span className="font-display text-lg lg:text-xl text-brand-charcoal group-hover:text-brand-rose transition-colors">
                                    {faq.question}
                                </span>
                                <div className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose transition-transform duration-300">
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-8 pt-2 font-body text-brand-charcoal/60 leading-relaxed text-base lg:text-lg">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-10 bg-brand-charcoal rounded-[2.5rem] text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/10 blur-[100px] rounded-full" />
                    <h2 className="font-display text-2xl lg:text-3xl mb-4 relative z-10">Still have questions?</h2>
                    <p className="font-body text-white/50 mb-8 relative z-10">We're here to help you create the perfect gifting moment.</p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-rose text-white font-body text-sm font-semibold rounded-full hover:bg-brand-rose/90 transition-all group relative z-10"
                    >
                        Contact Our Team
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
