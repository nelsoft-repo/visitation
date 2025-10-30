import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { products, Product } from '@/data/products';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '../ui/use-toast';
import { ShoppingCart } from 'lucide-react';

export default function ShopPage() {
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const { addItem } = useCart();
  const { toast } = useToast();

  const filteredProducts = products
    .filter(p => materialFilter === 'all' || p.material === materialFilter)
    .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  const handleAddToCart = (product: Product) => {
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

        {/* Filters */}
        <Card className="p-6 mb-8 bg-white">
          <div className="grid md:grid-cols-4 gap-4">
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
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setMaterialFilter('all');
                  setCategoryFilter('all');
                  setSortBy('name');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white group">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden bg-secondary/20">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}