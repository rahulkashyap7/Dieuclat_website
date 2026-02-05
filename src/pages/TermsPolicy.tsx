import { useEffect } from 'react';

export default function TermsPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 bg-warm">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <span className="inline-block text-eyebrow text-brand-rose mb-4 px-4 py-2 glass-warm rounded-full">
                        Legal
                    </span>
                    <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-tight text-brand-charcoal mb-4">
                        Terms & <span className="text-gradient">Conditions</span>
                    </h1>
                    <p className="font-body text-brand-charcoal/50 text-lg">
                        Guidelines for our valued customers
                    </p>
                </div>

                <div className="bg-white/80 rounded-[3rem] p-10 lg:p-16 border border-white/50 backdrop-blur-sm shadow-soft">
                    <div className="prose prose-rose max-w-none font-body text-brand-charcoal/70 space-y-10">
                        <section>
                            <h2 className="font-display text-2xl text-brand-charcoal mb-4 border-b border-brand-charcoal/10 pb-2">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the Dieuclat website, you agree to comply with and be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl text-brand-charcoal mb-4 border-b border-brand-charcoal/10 pb-2">2. Product Representation</h2>
                            <p>
                                We strive to display our hampers as accurately as possible. However, since many items are handcrafted or seasonal, slight variations in color, floral arrangement, or packaging may occur. This is part of the artisanal charm of Dieuclat.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl text-brand-charcoal mb-4 border-b border-brand-charcoal/10 pb-2">3. Pricing & Payment</h2>
                            <p>
                                All prices are in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time. Payments are secured via our third-party payment gateways.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl text-brand-charcoal mb-4 border-b border-brand-charcoal/10 pb-2">4. User Conduct</h2>
                            <p>
                                When using our 'Build Custom Hamper' service, users are prohibited from submitting any content that is offensive, illegal, or violates any third-party rights. We reserve the right to reject orders containing such content.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl text-brand-charcoal mb-4 border-b border-brand-charcoal/10 pb-2">5. Intellectual Property</h2>
                            <p>
                                All content on this website, including designs, text, graphics, and logos, is the property of Dieuclat and is protected by copyright laws. Reproduction without prior written consent is strictly prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl text-brand-charcoal mb-4 border-b border-brand-charcoal/10 pb-2">6. Privacy Policy</h2>
                            <p>
                                Your privacy is paramount. We only collect necessary information to process your orders and improve your experience. We never sell your personal data to third parties.
                            </p>
                        </section>

                        <p className="text-xs text-brand-charcoal/40 pt-10 text-center">
                            Last Updated: February 2026 | Dieuclat Gifting Solutions Pvt. Ltd.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
