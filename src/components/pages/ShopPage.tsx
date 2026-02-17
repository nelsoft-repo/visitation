import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { supabase } from '@/lib/supabase';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '../ui/use-toast';
import { ShoppingCart } from 'lucide-react';
import { Input } from '../ui/input';
import { Search, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  material: string;
  color: string;
  category: string;
  stock_quantity: number;
  sku: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .schema('visitation')
        .from('products')
        .select('*')
        .order('name');

      if (error) {
        setError(error.message);
        setProducts([]);
        return;
      }
      
      setProducts(data || []);
    } catch (error: any) {
      setError('Unable to connect to the database. Please check your connection.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.color.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesMaterial = materialFilter === 'all' || p.material === materialFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      
      return matchesSearch && matchesPrice && matchesMaterial && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.average_rating || 0) - (a.average_rating || 0);
      return a.name.localeCompare(b.name);
    });

  const handleAddToCart = (product: Product) => {
    if (product.stock_quantity === 0) {
      toast({
        title: 'Out of Stock',
        description: `${product.name} is currently unavailable`,
        variant: 'destructive'
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      material: product.material,
      color: product.color
    });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="p-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Connection Error</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchProducts}>Try Again</Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            Our Collection
          </h1>
          <p className="text-muted-foreground">
            Handcrafted rosaries and prayer bracelets made with devotion
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products by name, material, color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 bg-white">
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="rosary">Rosaries</SelectItem>
                  <SelectItem value="bracelet">Bracelets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Material</label>
              <Select value={materialFilter} onValueChange={setMaterialFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  <SelectItem value="wood">Wood</SelectItem>
                  <SelectItem value="crystal">Crystal</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <Select 
                value={`${priceRange[0]}-${priceRange[1]}`}
                onValueChange={(value) => {
                  const [min, max] = value.split('-').map(Number);
                  setPriceRange([min, max]);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-200">All Prices</SelectItem>
                  <SelectItem value="0-30">Under $30</SelectItem>
                  <SelectItem value="30-60">$30 - $60</SelectItem>
                  <SelectItem value="60-100">$60 - $100</SelectItem>
                  <SelectItem value="100-200">$100+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchQuery('');
                  setMaterialFilter('all');
                  setCategoryFilter('all');
                  setPriceRange([0, 200]);
                  setSortBy('name');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Results count */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-muted-foreground">
              Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white group">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden bg-secondary/20 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-red-600 text-white">Out of Stock</Badge>
                    </div>
                  )}
                  {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                      Only {product.stock_quantity} left
                    </Badge>
                  )}
                </div>
              </Link>
              
              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {product.material}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {product.category}
                  </Badge>
                </div>
                
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button 
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="gap-2"
                    disabled={product.stock_quantity === 0}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock_quantity === 0 ? 'Sold Out' : 'Add'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No products found matching "${searchQuery}". Try different search terms.`
                : 'No products found matching your filters.'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}