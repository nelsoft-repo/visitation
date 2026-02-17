import { useState } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Heart, Send } from 'lucide-react';

export default function PrayerRequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayerRequest: '',
    isAnonymous: false
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: dbError } = await supabase
        .from('prayer_requests')
        .insert([{
          name: formData.isAnonymous ? 'Anonymous' : formData.name,
          email: formData.isAnonymous ? null : formData.email,
          prayer_request: formData.prayerRequest,
          is_anonymous: formData.isAnonymous
        }]);

      if (dbError) throw dbError;

      await supabase.functions.invoke('supabase-functions-send-notification-email', {
        body: {
          type: 'prayer',
          name: formData.name,
          email: formData.email,
          prayerRequest: formData.prayerRequest,
          isAnonymous: formData.isAnonymous
        }
      });

      toast({
        title: 'Prayer request submitted',
        description: 'Your prayer intention has been received. We will pray for you.',
      });

      setFormData({ name: '', email: '', prayerRequest: '', isAnonymous: false });
    } catch (error: any) {
      console.error('Error submitting prayer request:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit prayer request. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Prayer Request</h1>
            <p className="text-lg text-muted-foreground">
              Share your prayer intentions with us. Our community will lift your needs in prayer.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Submit Your Prayer Intention</CardTitle>
              <CardDescription>
                All prayer requests are treated with respect and confidentiality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-2 p-4 bg-secondary/30 rounded-lg">
                  <Checkbox
                    id="anonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, isAnonymous: checked as boolean })
                    }
                  />
                  <Label htmlFor="anonymous" className="cursor-pointer">
                    Submit anonymously (your name and email will not be shared)
                  </Label>
                </div>

                {!formData.isAnonymous && (
                  <>
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required={!formData.isAnonymous}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll only use this to follow up if needed
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="prayerRequest">Prayer Request *</Label>
                  <Textarea
                    id="prayerRequest"
                    value={formData.prayerRequest}
                    onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
                    required
                    placeholder="Share your prayer intention..."
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground italic">
                    "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you." - Matthew 7:7
                  </p>
                </div>

                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? 'Submitting...' : 'Submit Prayer Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}