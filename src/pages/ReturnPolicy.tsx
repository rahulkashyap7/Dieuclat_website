import { useEffect } from 'react';
import { ShieldCheck, Clock, Truck, RefreshCcw } from 'lucide-react';

export default function ReturnPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 bg-warm">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <span className="inline-block text-eyebrow text-brand-rose mb-4 px-4 py-2 glass-warm rounded-full">
                        Policy
                    </span>
                    <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-tight text-brand-charcoal mb-4">
                        Returns & <span className="text-gradient">Refunds</span>
                    </h1>
                    <p className="font-body text-brand-charcoal/50 text-lg">
                        Our commitment to your satisfaction
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {[
                        {
                            icon: Clock,
                            title: "Return Window",
                            desc: "Requests must be made within 48 hours of delivery for any transit-related damage."
                        },
                        {
                            icon: ShieldCheck,
                            title: "Quality Check",
                            desc: "Items must be unused and in their original premium packaging for evaluation."
                        },
                        {
                            icon: Truck,
                            title: "Easy Pickup",
                            desc: "We arrange for reverse pickup for eligible damaged products across India."
                        },
                        {
                            icon: RefreshCcw,
                            title: "Quick Refunds",
                            desc: "Processed within 5-7 business days once the return is verified."
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-white/60 rounded-[2rem] border border-white/50 backdrop-blur-sm shadow-soft">
                            <div className="w-12 h-12 rounded-2xl bg-brand-rose/10 flex items-center justify-center text-brand-rose mb-6">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-display text-xl text-brand-charcoal mb-3">{item.title}</h3>
                            <p className="font-body text-brand-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="prose prose-rose max-w-none font-body text-brand-charcoal/70 space-y-8 p-10 bg-white/80 rounded-[3rem] border border-white/50 backdrop-blur-sm">
                    <section>
                        <h2 className="font-display text-2xl text-brand-charcoal mb-4">1. Non-Returnable Items</h2>
                        <p>
                            Due to the handcrafted and often personalized nature of our hampers, certain items are non-returnable:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Customized/Personalized products with names or custom photos.</li>
                            <li>Perishable items such as chocolates, flowers, or food treats.</li>
                            <li>Items on clearance or marked as final sale.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-brand-charcoal mb-4">2. Damaged or Incorrect Items</h2>
                        <p>
                            If you receive a damaged or incorrect product, please email us at hello@dieuclat.com with photos of the package and items within 48 hours of receipt. We will prioritize a replacement or full refund in such cases.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-brand-charcoal mb-4">3. Cancellation Policy</h2>
                        <p>
                            Orders can be cancelled within 4 hours of placement. Once the curation process starts (especially for custom hampers), we are unable to accept cancellations.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-brand-charcoal mb-4">4. Refund Process</h2>
                        <p>
                            Refunds for eligible returns are credited back to the original payment method. For Cash on Delivery orders, we will request your bank details for a direct transfer.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
