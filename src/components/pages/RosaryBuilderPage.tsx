import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useToast } from '../ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Loader2, ShoppingCart, Sparkles, Check } from 'lucide-react';

interface InventoryPart {
  id: string;
  name: string;
  type: string | null;
  material: string | null;
  color: string | null;
  image: string | null;
  price?: number;
  price_per_bead?: number;
  price_per_unit?: number;
  price_per_link?: number;
  description: string | null;
}

interface CustomRosarySelection {
  cross: InventoryPart | null;
  centerpiece: InventoryPart | null;
  hailMaryBead: InventoryPart | null;
  ourFatherBead: InventoryPart | null;
  medal: InventoryPart | null;
  rope: InventoryPart | null;
  link: InventoryPart | null;
  wire: InventoryPart | null;
}

export default function RosaryBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState<{
    crosses: InventoryPart[];
    centerpieces: InventoryPart[];
    hailMaryBeads: InventoryPart[];
    ourFatherBeads: InventoryPart[];
    medals: InventoryPart[];
    ropes: InventoryPart[];
    links: InventoryPart[];
    wires: InventoryPart[];
  }>({
    crosses: [],
    centerpieces: [],
    hailMaryBeads: [],
    ourFatherBeads: [],
    medals: [],
    ropes: [],
    links: [],
    wires: []
  });
  
  const [selection, setSelection] = useState<CustomRosarySelection>({
    cross: null,
    centerpiece: null,
    hailMaryBead: null,
    ourFatherBead: null,
    medal: null,
    rope: null,
    link: null,
    wire: null
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const [crosses, centerpieces, hailMaryBeads, ourFatherBeads, medals, ropes, links, wires] = await Promise.all([
        supabase.from('inventory_crosses').select('*'),
        supabase.from('inventory_centerpieces').select('*'),
        supabase.from('inventory_hail_mary_beads').select('*'),
        supabase.from('inventory_our_father_beads').select('*'),
        supabase.from('inventory_medals').select('*'),
        supabase.from('inventory_ropes').select('*'),
        supabase.from('inventory_links').select('*'),
        supabase.from('inventory_wires').select('*')
      ]);

      setInventory({
        crosses: crosses.data || [],
        centerpieces: centerpieces.data || [],
        hailMaryBeads: hailMaryBeads.data || [],
        ourFatherBeads: ourFatherBeads.data || [],
        medals: medals.data || [],
        ropes: ropes.data || [],
        links: links.data || [],
        wires: wires.data || []
      });
    } catch (error: any) {
      console.error('Error fetching inventory:', error);
      toast({
        title: 'Error',
        description: 'Failed to load inventory',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (selection.cross?.price) total += selection.cross.price;
    if (selection.centerpiece?.price) total += selection.centerpiece.price;
    if (selection.hailMaryBead?.price_per_bead) total += selection.hailMaryBead.price_per_bead * 53;
    if (selection.ourFatherBead?.price_per_bead) total += selection.ourFatherBead.price_per_bead * 6;
    if (selection.medal?.price) total += selection.medal.price;
    if (selection.rope?.price_per_unit) total += selection.rope.price_per_unit;
    if (selection.link?.price_per_link) total += selection.link.price_per_link * 59;
    if (selection.wire?.price_per_unit) total += selection.wire.price_per_unit;
    return total;
  };

  const addToCart = () => {
    const total = calculateTotal();
    const parts = Object.entries(selection)
      .filter(([_, part]) => part !== null)
      .map(([key, part]) => `${key}: ${part?.name}`)
      .join(', ');

    toast({
      title: 'Added to Cart!',
      description: `Custom rosary with ${Object.values(selection).filter(p => p).length} parts selected`,
    });

    // In a real implementation, you'd add this to the cart context
    // For now, we'll just show a success message
  };

  const renderPartCard = (part: InventoryPart, category: keyof CustomRosarySelection, isSelected: boolean) => {
    const getPrice = () => {
      if (part.price) return `$${part.price.toFixed(2)}`;
      if (part.price_per_bead) return `$${part.price_per_bead.toFixed(2)}/bead`;
      if (part.price_per_unit) return `$${part.price_per_unit.toFixed(2)}/unit`;
      if (part.price_per_link) return `$${part.price_per_link.toFixed(2)}/link`;
      return 'N/A';
    };

    return (
      <Card 
        key={part.id} 
        className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}
        onClick={() => setSelection({ ...selection, [category]: part })}
      >
        {part.image && (
          <div className="aspect-square overflow-hidden bg-secondary/20 relative">
            <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
            {isSelected && (
              <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        )}
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{part.name}</CardTitle>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{getPrice()}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {part.material && <Badge variant="outline" className="text-xs">{part.material}</Badge>}
            {part.color && <Badge variant="outline" className="text-xs">{part.color}</Badge>}
            {part.type && <Badge variant="outline" className="text-xs">{part.type}</Badge>}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Build Your Custom Rosary</h1>
            <p className="text-lg text-muted-foreground">
              Select each component to create your perfect rosary
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm sticky top-4 h-fit">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Your Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(selection).map(([key, part]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                    <span className="text-muted-foreground">{part?.name || 'Not selected'}</span>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={addToCart}
                    disabled={Object.values(selection).every(p => p === null)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-3">
              <Tabs defaultValue="cross" className="w-full">
                <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
                  <TabsTrigger value="cross">Cross</TabsTrigger>
                  <TabsTrigger value="centerpiece">Center</TabsTrigger>
                  <TabsTrigger value="hailMary">Hail Mary</TabsTrigger>
                  <TabsTrigger value="ourFather">Our Father</TabsTrigger>
                  <TabsTrigger value="medal">Medal</TabsTrigger>
                  <TabsTrigger value="rope">Rope</TabsTrigger>
                  <TabsTrigger value="link">Link</TabsTrigger>
                  <TabsTrigger value="wire">Wire</TabsTrigger>
                </TabsList>

                <TabsContent value="cross">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.crosses.map(part => renderPartCard(part, 'cross', selection.cross?.id === part.id))}
                  </div>
                </TabsContent>

                <TabsContent value="centerpiece">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.centerpieces.map(part => renderPartCard(part, 'centerpiece', selection.centerpiece?.id === part.id))}
                  </div>
                </TabsContent>

                <TabsContent value="hailMary">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.hailMaryBeads.map(part => renderPartCard(part, 'hailMaryBead', selection.hailMaryBead?.id === part.id))}
                  </div>
                </TabsContent>

                <TabsContent value="ourFather">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.ourFatherBeads.map(part => renderPartCard(part, 'ourFatherBead', selection.ourFatherBead?.id === part.id))}
                  </div>
                </TabsContent>

                <TabsContent value="medal">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.medals.map(part => renderPartCard(part, 'medal', selection.medal?.id === part.id))}
                  </div>
                </TabsContent>

                <TabsContent value="rope">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.ropes.map(part => renderPartCard(part, 'rope', selection.rope?.id === part.id))}
                  </div>
                </TabsContent>

                <TabsContent value="link">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.links.map(part => renderPartCard(part, 'link', selection.link?.id === part.id))}
                  </div>
                </TabsContent>

                <TabsContent value="wire">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.wires.map(part => renderPartCard(part, 'wire', selection.wire?.id === part.id))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}