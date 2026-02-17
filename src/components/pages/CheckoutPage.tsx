import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/use-toast';
import { Checkbox } from '../ui/checkbox';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, customer, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    email: customer?.email || '',
    firstName: customer?.first_name || '',
    lastName: customer?.last_name || '',
    phone: customer?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    cardNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let customerId = user?.id;

      // Create account if guest wants to
      if (!user && createAccount && formData.password) {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );

        if (error) {
          toast({
            title: 'Account Creation Failed',
            description: error.message,
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        // Get the newly created user ID
        const { data: { user: newUser } } = await supabase.auth.getUser();
        customerId = newUser?.id;
      }

      // Create address
      let addressId = null;
      if (customerId) {
        const { data: addressData, error: addressError } = await supabase
          .schema('visitation')
          .from('customer_addresses')
          .insert({
            customer_id: customerId,
            address_line1: formData.address,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode,
            is_default: true,
          })
          .select()
          .single();

        if (addressError) throw addressError;
        addressId = addressData.id;
      }

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .schema('visitation')
        .from('orders')
        .insert({
          customer_id: customerId,
          guest_email: !customerId ? formData.email : null,
          total_amount: totalPrice,
          status: 'pending',
          shipping_address_id: addressId,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .schema('visitation')
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
      });

      clearCart();
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Order Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-slate-800 mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!user && (
                  <>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="createAccount"
                        checked={createAccount}
                        onCheckedChange={(checked) => setCreateAccount(checked as boolean)}
                      />
                      <label htmlFor="createAccount" className="text-sm text-slate-700">
                        Create an account for faster checkout next time
                      </label>
                    </div>
                    
                    {createAccount && (
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          required={createAccount}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                    )}
                    
                    <div className="text-sm text-slate-600">
                      Already have an account?{' '}
                      <Link to="/login" className="text-amber-700 hover:underline">
                        Sign in
                      </Link>
                    </div>
                  </>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : `Place Order - $${totalPrice.toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-4 font-semibold text-lg">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}