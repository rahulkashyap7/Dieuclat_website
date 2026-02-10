import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft,
    Clock,
    Truck,
    CheckCircle,
    XCircle,
    MapPin,
    Phone,
    User,
    CreditCard,
    ArrowRight
} from 'lucide-react';

interface Order {
    id: string;
    date: string;
    status: string;
    items: any[];
    total: number;
    shippingDetails: any;
    expectedDelivery: string;
}

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('dieuclat_orders') || '[]');
        const foundOrder = savedOrders.find((o: Order) => o.id === id);
        setOrder(foundOrder || null);
    }, [id]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'dispatched': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-600 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
            default: return 'bg-brand-charcoal/10 text-brand-charcoal/60 border-brand-charcoal/20';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (!order) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <h2 className="font-display text-3xl text-brand-charcoal mb-4">Order not found</h2>
                <Link to="/profile" className="px-8 py-3 bg-brand-charcoal text-white rounded-full font-semibold">Back to Orders</Link>
            </div>
        );
    }

    const steps = [
        { label: 'Order Placed', status: 'completed', icon: <Clock />, desc: 'We have received your order' },
        { label: 'Pending', status: order.status === 'Pending' ? 'current' : 'completed', icon: <CreditCard />, desc: 'Order is being processed' },
        { label: 'Dispatched', status: order.status === 'Dispatched' ? 'current' : (['Delivered'].includes(order.status) ? 'completed' : 'pending'), icon: <Truck />, desc: 'Handed over to delivery partner' },
        { label: 'Delivered', status: order.status === 'Delivered' ? 'current' : 'pending', icon: <CheckCircle />, desc: 'Successfully delivered' }
    ];

    if (order.status === 'Cancelled') {
        steps.splice(2, 2, { label: 'Cancelled', status: 'current', icon: <XCircle />, desc: 'Order was cancelled' });
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 lg:px-20 bg-warm">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <Link
                        to="/profile"
                        className="inline-flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-rose transition-colors mb-6 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-body text-sm font-bold uppercase tracking-wider">Back to Orders</span>
                    </Link>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h1 className="font-display text-4xl text-brand-charcoal font-bold mb-2">Order Details</h1>
                            <p className="font-body text-brand-charcoal/40">Order #{order.id} • {formatDate(order.date)}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                            {order.status}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Order Tracking */}
                    <div className="lg:col-span-3 glass-warm p-8 rounded-[40px] border border-white/40 shadow-soft">
                        <h2 className="font-display text-2xl text-brand-charcoal font-bold mb-10">Track Order</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {/* Connector Line */}
                            <div className="hidden md:block absolute top-[27px] left-[50px] right-[50px] h-[2px] bg-brand-charcoal/5 -z-10" />

                            {steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-soft mb-4 ${step.status === 'completed' ? 'bg-green-500 text-white' :
                                            step.status === 'current' ? 'bg-brand-rose text-white ring-4 ring-brand-rose/10' :
                                                'bg-white text-brand-charcoal/20'
                                        }`}>
                                        {step.icon}
                                    </div>
                                    <h3 className={`font-display text-sm font-bold mb-1 ${step.status === 'pending' ? 'text-brand-charcoal/40' : 'text-brand-charcoal'
                                        }`}>{step.label}</h3>
                                    <p className="font-body text-[10px] text-brand-charcoal/40 max-w-[120px]">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Left Column: Items and Shipping */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass-warm p-8 rounded-[40px] border border-white/40 shadow-soft">
                            <h2 className="font-display text-xl text-brand-charcoal font-bold mb-6">Order Items</h2>
                            <div className="space-y-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-6 group">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-cream border border-white/40 shrink-0 shadow-soft">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-display text-base text-brand-charcoal font-semibold mb-1">{item.name}</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="font-body text-sm text-brand-charcoal/40">Qty: {item.quantity}</span>
                                                <span className="font-body text-sm font-bold text-brand-rose">{item.price}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-display font-bold text-brand-charcoal">
                                                {formatPrice(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="glass-warm p-8 rounded-[40px] border border-white/40 shadow-soft">
                                <h2 className="font-display text-xl text-brand-charcoal font-bold mb-6 flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-brand-rose" />
                                    Shipping Address
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <User className="w-4 h-4 text-brand-charcoal/20 mt-1" />
                                        <div>
                                            <p className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest mb-1">Receiver</p>
                                            <p className="font-display text-sm font-bold text-brand-charcoal">{order.shippingDetails.receiverName}</p>
                                            <p className="font-body text-xs text-brand-charcoal/60 flex items-center gap-2 mt-1">
                                                <Phone className="w-3 h-3" />
                                                {order.shippingDetails.receiverMobile}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 pt-4 border-t border-brand-charcoal/5">
                                        <MapPin className="w-4 h-4 text-brand-charcoal/20 mt-1" />
                                        <div>
                                            <p className="font-body text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest mb-1">Address</p>
                                            <p className="font-body text-sm text-brand-charcoal/60 leading-relaxed">{order.shippingDetails.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="glass-warm p-8 rounded-[40px] border border-white/40 shadow-soft flex flex-col justify-center bg-brand-charcoal text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Truck className="w-20 h-20" />
                                </div>
                                <h3 className="font-display text-lg font-bold mb-2">Need Support?</h3>
                                <p className="font-body text-xs text-white/50 mb-6">Contact our team for any queries regarding your shipment.</p>
                                <Link to="/contact" className="inline-flex items-center gap-2 text-brand-rose font-bold text-sm group/btn uppercase tracking-widest">
                                    Get Help
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </section>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="space-y-8">
                        <section className="glass-warm p-8 rounded-[40px] border border-white/60 shadow-elevated">
                            <h2 className="font-display text-2xl text-brand-charcoal font-bold mb-8 text-center pt-2">Payment Summary</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-brand-charcoal/60">
                                    <span className="font-body text-sm">Subtotal</span>
                                    <span className="font-body font-bold">{formatPrice(order.total)}</span>
                                </div>
                                <div className="flex justify-between items-center text-brand-charcoal/60">
                                    <span className="font-body text-sm">Shipping</span>
                                    <span className="font-body font-bold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-brand-charcoal/60 text-xs">
                                    <span className="font-body">Estimated GST (18%)</span>
                                    <span className="font-body">Included</span>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-brand-charcoal/5">
                                    <span className="font-display text-lg text-brand-charcoal font-bold">Total Amount</span>
                                    <span className="font-display text-3xl text-brand-charcoal font-black">{formatPrice(order.total)}</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-brand-rose/5 border border-brand-rose/10 flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-brand-rose" />
                                <div>
                                    <p className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest leading-none mb-1">Payment Method</p>
                                    <p className="font-body text-xs font-bold text-brand-charcoal">Prepaid via Razorpay</p>
                                </div>
                            </div>
                        </section>

                        <div className="glass-warm p-8 rounded-[40px] border border-white/40 shadow-soft text-center">
                            <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-brand-rose/10 text-brand-rose'
                                }`}>
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-display text-base font-bold text-brand-charcoal mb-2">
                                {order.status === 'Delivered' ? 'Order Delivered' : 'Estimated Delivery'}
                            </h3>
                            <p className="font-body text-sm text-brand-charcoal/60">
                                {order.status === 'Delivered' ? 'Your package was delivered successfully.' : `Expected by ${new Date(order.expectedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
