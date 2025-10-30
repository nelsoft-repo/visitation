import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Cross } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function Navigation() {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Cross className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            <span className="text-xl font-serif font-semibold text-primary">Visitation Rosaries</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/prayer">
              <Button 
                variant={isActive('/prayer') ? 'default' : 'ghost'}
                className="font-medium"
              >
                Prayer
              </Button>
            </Link>
            <Link to="/shop">
              <Button 
                variant={isActive('/shop') ? 'default' : 'ghost'}
                className="font-medium"
              >
                Shop
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button 
                variant={isActive('/cart') ? 'default' : 'ghost'}
                size="icon"
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}