import { useState, useEffect } from 'react';
import { Package, ChevronRight, ShoppingBag, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
    id: string;
    date: string;
    status: string;
    items: any[];
    total: number;
    expectedDelivery: string;
}

export default function Profile() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('dieuclat_orders') || '[]');
        setOrders(savedOrders);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'dispatched': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-600 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
            default: return 'bg-brand-charcoal/10 text-brand-charcoal/60 border-brand-charcoal/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'dispatched': return <Truck className="w-4 h-4" />;
            case 'delivered': return <CheckCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 lg:px-20 bg-warm">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="font-display text-4xl lg:text-5xl text-brand-charcoal font-bold mb-4">My Account</h1>
                        <p className="font-body text-brand-charcoal/60">Manage your orders and track your progress</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="font-display text-2xl text-brand-charcoal font-bold">Order History</h2>
                            <span className="px-3 py-1 rounded-full bg-brand-charcoal/5 text-brand-charcoal/40 text-xs font-bold uppercase tracking-wider">
                                {orders.length} Orders
                            </span>
                        </div>

                        {orders.length === 0 ? (
                            <div className="glass-warm rounded-[40px] p-12 text-center border border-white/40">
                                <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-6">
                                    <ShoppingBag className="w-8 h-8 text-brand-charcoal/20" />
                                </div>
                                <h3 className="font-display text-2xl text-brand-charcoal mb-3">No orders found</h3>
                                <p className="font-body text-brand-charcoal/60 mb-8 max-w-sm mx-auto">
                                    You haven't placed any orders yet. Explore our collections to find something you love.
                                </p>
                                <Link
                                    to="/all-products"
                                    className="inline-flex px-8 py-3 bg-brand-charcoal text-white font-body text-sm font-semibold rounded-full hover:bg-brand-rose transition-all shadow-soft"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {orders.map((order) => (
                                    <Link
                                        key={order.id}
                                        to={`/order/${order.id}`}
                                        className="group block glass-warm rounded-[32px] p-6 lg:p-8 border border-white/40 hover:border-brand-rose/30 transition-all shadow-soft hover:shadow-elevated relative overflow-hidden"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                                            <div className="space-y-4">
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <span className="font-display text-lg font-bold text-brand-charcoal">#{order.id}</span>
                                                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        {order.status}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-x-8 gap-y-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-widest leading-none mb-1">Date Placed</span>
                                                        <span className="font-body text-sm text-brand-charcoal/60 font-medium">{formatDate(order.date)}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-widest leading-none mb-1">Expected Delivery</span>
                                                        <span className="font-body text-sm text-brand-charcoal/60 font-medium">{formatDate(order.expectedDelivery)}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-widest leading-none mb-1">Total Amount</span>
                                                        <span className="font-body text-sm font-bold text-brand-rose">{formatPrice(order.total)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 border-brand-charcoal/5 pt-6 lg:pt-0">
                                                <div className="flex -space-x-3">
                                                    {order.items.slice(0, 3).map((item, i) => (
                                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-brand-cream shadow-soft">
                                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <div className="w-12 h-12 rounded-full border-2 border-white bg-brand-charcoal flex items-center justify-center text-white text-[10px] font-bold shadow-soft">
                                                            +{order.items.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-brand-charcoal/5 flex items-center justify-center text-brand-charcoal group-hover:bg-brand-rose group-hover:text-white transition-all">
                                                    <ChevronRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
