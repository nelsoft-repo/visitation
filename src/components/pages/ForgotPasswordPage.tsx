import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/use-toast';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setSent(true);
      toast({
        title: 'Email Sent',
        description: 'Check your email for password reset instructions.',
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Reset Password</CardTitle>
              <CardDescription>
                {sent 
                  ? 'Check your email for reset instructions'
                  : 'Enter your email to receive reset instructions'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                  
                  <div className="text-center text-sm text-slate-600">
                    Remember your password?{' '}
                    <Link to="/login" className="text-amber-700 hover:underline font-semibold">
                      Sign in
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-600">
                    We've sent password reset instructions to <strong>{email}</strong>
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/login">Back to Sign In</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
