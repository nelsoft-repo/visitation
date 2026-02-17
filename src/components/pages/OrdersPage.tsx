import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  shipping_address: any;
  tracking_number: string | null;
  created_at: string;
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export default function OrdersPage() {
  const { customer } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (customer) {
      fetchOrders();
    }
  }, [customer]);

  const fetchOrders = async () => {
    if (!customer) return;

    setLoading(true);
    const { data, error } = await supabase
      .schema('visitation')
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'processing': return <Package className="w-5 h-5 text-blue-600" />;
      case 'shipped': return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your orders</h1>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading orders...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-serif text-slate-800 mb-8">My Orders</h1>

        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredOrders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-6">
              {filter === 'all' 
                ? "You haven't placed any orders yet." 
                : `No ${filter} orders found.`}
            </p>
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(order.status)}
                      <h3 className="text-lg font-semibold">Order #{order.order_number}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {order.tracking_number && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">
                      Tracking Number: <span className="font-mono">{order.tracking_number}</span>
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.product_name} <span className="text-muted-foreground">x{item.quantity}</span>
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t mt-4 pt-4">
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping_address.name}<br />
                    {order.shipping_address.street}<br />
                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
