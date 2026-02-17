import { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Sparkles, Loader2, Wrench } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface CustomRosary {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  material: string | null;
  color: string | null;
  beads_count: number | null;
  centerpiece_description: string | null;
  crucifix_description: string | null;
  customer_name: string | null;
  created_for: string | null;
  price: number | null;
  created_at: string | null;
}

export default function CustomRosariesPage() {
  const [rosaries, setRosaries] = useState<CustomRosary[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomRosaries();
  }, []);

  const fetchCustomRosaries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('custom_rosaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: 'Database Error',
          description: error.message,
          variant: 'destructive'
        });
        setRosaries([]);
        return;
      }
      
      setRosaries(data || []);
    } catch (error: any) {
      console.error('Error fetching custom rosaries:', error);
      toast({
        title: 'Connection Error',
        description: 'Could not connect to database.',
        variant: 'destructive'
      });
      setRosaries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Custom Rosaries</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Explore our collection of beautifully handcrafted custom rosaries, each uniquely designed 
              with love and devotion for special occasions and personal intentions.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/rosary-builder')}
              className="gap-2"
            >
              <Wrench className="w-5 h-5" />
              Build Your Own Rosary
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : rosaries.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm text-center py-12">
              <CardContent>
                <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Custom Rosaries Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon to see our beautiful custom creations.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rosaries.map((rosary) => (
                <Card key={rosary.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow overflow-hidden">
                  {rosary.image && (
                    <div className="aspect-square overflow-hidden bg-secondary/20">
                      <img 
                        src={rosary.image} 
                        alt={rosary.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl font-serif">{rosary.name}</CardTitle>
                      {rosary.price && (
                        <Badge variant="secondary" className="shrink-0">
                          ${rosary.price.toFixed(2)}
                        </Badge>
                      )}
                    </div>
                    {rosary.created_for && (
                      <CardDescription className="italic">
                        Created for: {rosary.created_for}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rosary.description && (
                      <p className="text-sm text-muted-foreground">{rosary.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {rosary.material && (
                        <Badge variant="outline">{rosary.material}</Badge>
                      )}
                      {rosary.color && (
                        <Badge variant="outline">{rosary.color}</Badge>
                      )}
                      {rosary.beads_count && (
                        <Badge variant="outline">{rosary.beads_count} beads</Badge>
                      )}
                    </div>

                    {(rosary.centerpiece_description || rosary.crucifix_description) && (
                      <div className="pt-3 border-t space-y-2 text-sm">
                        {rosary.centerpiece_description && (
                          <div>
                            <span className="font-medium text-primary">Centerpiece: </span>
                            <span className="text-muted-foreground">{rosary.centerpiece_description}</span>
                          </div>
                        )}
                        {rosary.crucifix_description && (
                          <div>
                            <span className="font-medium text-primary">Crucifix: </span>
                            <span className="text-muted-foreground">{rosary.crucifix_description}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {rosary.customer_name && (
                      <p className="text-xs text-muted-foreground pt-2 border-t">
                        Commissioned by: {rosary.customer_name}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card className="mt-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-center">Interested in a Custom Rosary?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Each custom rosary is a unique work of art, crafted with prayer and intention. 
                Contact us to discuss your vision for a personalized rosary.
              </p>
              <a href="/contact" className="text-primary hover:underline font-medium">
                Get in Touch →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}