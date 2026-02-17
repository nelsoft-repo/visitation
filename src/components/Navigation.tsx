import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase';

export default function Navigation() {
  const { user, customer } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-serif text-slate-800">
            Visitation Rosaries
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/prayer" className="text-slate-600 hover:text-slate-900 transition-colors">
              Prayer
            </Link>
            <Link to="/shop" className="text-slate-600 hover:text-slate-900 transition-colors">
              Shop
            </Link>
            <Link to="/custom-rosaries" className="text-slate-600 hover:text-slate-900 transition-colors">
              Custom
            </Link>
            <Link to="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
              Contact
            </Link>
            {user && (
              <Link to="/orders" className="text-slate-600 hover:text-slate-900 transition-colors">
                Orders
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-slate-600 hover:text-slate-900 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-6 h-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {customer?.name || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {customer?.is_admin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}