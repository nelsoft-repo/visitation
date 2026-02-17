import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '../ui/use-toast';
import { ShoppingCart, ArrowLeft, Check, AlertCircle, Package } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import ProductReviews from '../ProductReviews';

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
  low_stock_threshold: number;
  sku: string;
  average_rating: number;
  review_count: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .schema('visitation')
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: 'Database Error',
          description: error.message,
          variant: 'destructive'
        });
        return;
      }
      
      setProduct(data);

      if (data) {
        const { data: related } = await supabase
          .schema('visitation')
          .from('products')
          .select('*')
          .eq('material', data.material)
          .neq('id', data.id)
          .limit(4);
        
        if (related) setRelatedProducts(related);
      }
    } catch (error: any) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Connection Error',
        description: 'Could not connect to database.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock_quantity === 0) {
      toast({
        title: 'Out of Stock',
        description: 'This item is currently unavailable',
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

  const getStockStatus = () => {
    if (!product) return null;
    
    if (product.stock_quantity === 0) {
      return { label: 'Out of Stock', color: 'text-red-600', bgColor: 'bg-red-100' };
    } else if (product.stock_quantity <= product.low_stock_threshold) {
      return { label: `Only ${product.stock_quantity} left`, color: 'text-orange-600', bgColor: 'bg-orange-100' };
    } else {
      return { label: 'In Stock', color: 'text-green-600', bgColor: 'bg-green-100' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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

  const stockStatus = getStockStatus();

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
              {stockStatus && (
                <Badge className={`${stockStatus.bgColor} ${stockStatus.color} hover:${stockStatus.bgColor}`}>
                  {product.stock_quantity > 0 ? (
                    <Check className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {stockStatus.label}
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

            {product.stock_quantity <= product.low_stock_threshold && product.stock_quantity > 0 && (
              <Alert className="mb-6 border-orange-200 bg-orange-50">
                <Package className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-900">
                  Low stock! Only {product.stock_quantity} items remaining. Order soon!
                </AlertDescription>
              </Alert>
            )}

            {product.stock_quantity === 0 && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-900">
                  This item is currently out of stock. Please check back later.
                </AlertDescription>
              </Alert>
            )}

            <Card className="p-6 mb-6 bg-secondary/30">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
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
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={`font-medium ${stockStatus?.color}`}>
                    {product.stock_quantity} available
                  </span>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
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
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">
              You May Also Like
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
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
        )}

        {/* Reviews Section */}
        <ProductReviews 
          productId={product.id} 
          averageRating={product.average_rating || 0}
          reviewCount={product.review_count || 0}
        />
      </main>
    </div>
  );
}