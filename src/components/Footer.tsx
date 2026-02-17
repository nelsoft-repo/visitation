import { Link } from 'react-router-dom';
import { Cross, Mail, Heart, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Visitation Rosaries</h3>
            <p className="text-slate-300 text-sm">
              Handcrafted with prayer and devotion. Each rosary is blessed before shipping.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-slate-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/custom-rosaries" className="text-slate-300 hover:text-white transition-colors">Custom Rosaries</Link></li>
              <li><Link to="/rosary-builder" className="text-slate-300 hover:text-white transition-colors">Rosary Builder</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Prayer</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/prayer" className="text-slate-300 hover:text-white transition-colors">Pray the Rosary</Link></li>
              <li><Link to="/prayer-request" className="text-slate-300 hover:text-white transition-colors">Prayer Requests</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/orders" className="text-slate-300 hover:text-white transition-colors">My Orders</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-slate-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Visitation Rosaries. All rights reserved.</p>
          <p className="mt-2">Made with prayer and devotion</p>
        </div>
      </div>
    </footer>
  );
}