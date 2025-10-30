import { useParams, Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { products } from '@/data/products';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '../ui/use-toast';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
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
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/shop">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden bg-white">
              <div className="aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary" className="capitalize">
                {product.material}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {product.category}
              </Badge>
              {product.inStock && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Check className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-serif font-bold text-primary mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <Card className="p-6 mb-6 bg-secondary/30">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="font-medium capitalize">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-medium capitalize">{product.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="font-medium text-green-600">In Stock</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Link to="/cart" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Free Shipping</strong> on orders over $75. Each piece is carefully packaged 
                and blessed before shipping.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">
            You May Also Like
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.material === product.material)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white group">
                    <div className="aspect-square overflow-hidden bg-secondary/20">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                      <p className="text-lg font-bold text-primary">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}