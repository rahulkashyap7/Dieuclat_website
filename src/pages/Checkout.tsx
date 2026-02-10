import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronLeft, CreditCard, Truck, User, Phone, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        address: '',
        receiverName: '',
        receiverMobile: '',
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call for order placement
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create order object for persistence
        const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            status: 'Pending',
            items: cart,
            total: cartTotal,
            shippingDetails: formData,
            expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
        };

        // Save to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('dieuclat_orders') || '[]');
        localStorage.setItem('dieuclat_orders', JSON.stringify([newOrder, ...existingOrders]));

        // For now, bypass payment and show success
        alert(`Order ${orderId} placed successfully! (Payment bypassed for testing)`);
        clearCart();
        navigate('/profile'); // Redirect to profile to see order history
        setIsProcessing(false);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-cream flex items-center justify-center mb-8 animate-bounce">
                    <ShoppingBag className="w-10 h-10 text-brand-charcoal/20" />
                </div>
                <h1 className="font-display text-4xl text-brand-charcoal mb-4">Your cart is empty</h1>
                <p className="font-body text-brand-charcoal/60 mb-10 max-w-md">
                    Looks like you haven't added anything to your cart yet. Let's find something special for you.
                </p>
                <Link
                    to="/all-products"
                    className="px-10 py-4 bg-brand-charcoal text-white font-body font-semibold rounded-full hover:bg-brand-rose transition-all shadow-lg flex items-center gap-3"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 lg:px-20 bg-warm">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                            <Link to="/all-products" className="w-10 h-10 rounded-full glass-warm flex items-center justify-center text-brand-charcoal hover:bg-brand-rose hover:text-white transition-all shadow-soft">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="font-display text-4xl text-brand-charcoal font-bold">Checkout</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <section className="glass-warm p-8 rounded-[32px] border border-white/40 shadow-soft">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center text-brand-rose">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <h2 className="font-display text-xl text-brand-charcoal font-semibold">Sender Details</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider ml-4">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                            className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-brand-charcoal/5 focus:border-brand-rose focus:bg-white outline-none transition-all font-body text-brand-charcoal"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider ml-4">Mobile Number</label>
                                        <input
                                            required
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            placeholder="Enter 10-digit number"
                                            className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-brand-charcoal/5 focus:border-brand-rose focus:bg-white outline-none transition-all font-body text-brand-charcoal"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider ml-4">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-brand-charcoal/5 focus:border-brand-rose focus:bg-white outline-none transition-all font-body text-brand-charcoal"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Information */}
                            <section className="glass-warm p-8 rounded-[32px] border border-white/40 shadow-soft">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-brand-charcoal/5 flex items-center justify-center text-brand-charcoal">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <h2 className="font-display text-xl text-brand-charcoal font-semibold">Shipping Address</h2>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider ml-4">Full Address</label>
                                    <textarea
                                        required
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="House No, Street, Landmark, Pincode"
                                        rows={4}
                                        className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-brand-charcoal/5 focus:border-brand-rose focus:bg-white outline-none transition-all font-body text-brand-charcoal resize-none"
                                    />
                                </div>
                            </section>

                            {/* Receiver Information */}
                            <section className="glass-warm p-8 rounded-[32px] border border-white/40 shadow-soft">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center text-brand-rose">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <h2 className="font-display text-xl text-brand-charcoal font-semibold">Receiver Details (For Reference)</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider ml-4">Receiver Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="receiverName"
                                            value={formData.receiverName}
                                            onChange={handleInputChange}
                                            placeholder="Name of receiver"
                                            className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-brand-charcoal/5 focus:border-brand-rose focus:bg-white outline-none transition-all font-body text-brand-charcoal"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider ml-4">Receiver Mobile</label>
                                        <input
                                            required
                                            type="tel"
                                            name="receiverMobile"
                                            value={formData.receiverMobile}
                                            onChange={handleInputChange}
                                            placeholder="10-digit number"
                                            className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-brand-charcoal/5 focus:border-brand-rose focus:bg-white outline-none transition-all font-body text-brand-charcoal"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Section - Bypassed for now */}
                            <section className="p-8 rounded-[32px] bg-brand-charcoal text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <LockupIcon />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <CreditCard className="w-6 h-6 text-brand-rose" />
                                    <h2 className="font-display text-2xl font-semibold">Payment Method</h2>
                                </div>
                                <p className="font-body text-white/60 mb-8 max-w-sm">
                                    Payment will be collected via Razorpay. Currently in testing mode.
                                </p>
                                <button
                                    disabled={isProcessing}
                                    type="submit"
                                    className="w-full py-5 bg-brand-rose text-white font-display text-lg font-bold rounded-2xl hover:bg-white hover:text-brand-charcoal transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                                <p className="text-center font-body text-[10px] text-white/30 mt-6">
                                    Secure encryption enabled. Terms and conditions apply.
                                </p>
                            </section>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-[450px]">
                        <div className="sticky top-32 space-y-8">
                            <div className="glass-warm p-8 rounded-[40px] border border-white/60 shadow-elevated">
                                <h2 className="font-display text-2xl text-brand-charcoal font-bold mb-8">Order Summary</h2>

                                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-cream border border-white/40 shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h3 className="font-display text-sm text-brand-charcoal font-semibold line-clamp-1">{item.name}</h3>
                                                <div className="flex items-center justify-between mt-1">
                                                    <p className="font-body text-xs text-brand-charcoal/40">Qty: {item.quantity}</p>
                                                    <p className="font-body text-sm font-bold text-brand-rose">{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 border-t border-brand-charcoal/5 pt-8">
                                    <div className="flex justify-between items-center text-brand-charcoal/60">
                                        <span className="font-body text-sm">Subtotal</span>
                                        <span className="font-body font-bold">{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-brand-charcoal/60">
                                        <span className="font-body text-sm">Shipping</span>
                                        <span className="font-body font-bold text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between items-center text-brand-charcoal/60 text-xs">
                                        <span className="font-body">Estimated GST (18%)</span>
                                        <span className="font-body">Included</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-brand-charcoal/5">
                                        <span className="font-display text-lg text-brand-charcoal font-bold">Total Amount</span>
                                        <span className="font-display text-3xl text-brand-charcoal font-black">{formatPrice(cartTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-brand-rose/5 border border-brand-rose/10 p-6 rounded-3xl">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0">
                                        <Truck className="w-6 h-6 text-brand-rose" />
                                    </div>
                                    <div>
                                        <p className="font-display text-sm font-bold text-brand-charcoal">Free Priority Shipping</p>
                                        <p className="font-body text-xs text-brand-charcoal/60 mt-1">Expected delivery within 3-5 business days across India.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const LockupIcon = () => (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);
