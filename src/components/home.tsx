import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Navigation from './Navigation';
import Footer from './Footer';
import { Cross, ShoppingBag, Sparkles, Heart, Star } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFF8F0]">
      <Navigation />
      
      <main className="container mx-auto px-4">
        {/* Hero Section with Background */}
        <div className="relative py-24 mb-20 overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full animate-float"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-accent rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-secondary rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="text-center relative z-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-8 animate-float">
              <Cross className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
              Visitation Rosaries
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              A peaceful sanctuary for prayer and devotion. Experience guided rosary meditation 
              and discover beautiful handcrafted rosaries.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/prayer">
                <Button size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                  Begin Prayer
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                  Browse Collection
                </Button>
              </Link>
              <Link to="/custom-rosaries">
                <Button size="lg" className="text-lg px-10 py-6 bg-accent hover:bg-accent/90 text-gray-800 shadow-lg hover:shadow-xl transition-all">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Custom Rosaries
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 animate-fade-in">
          <Card className="p-10 text-center hover:shadow-2xl transition-all duration-300 bg-white border-0 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mb-6">
              <Cross className="w-10 h-10 text-blue-700" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-primary">Interactive Prayer Guide</h3>
            <p className="text-gray-600 leading-relaxed">
              Follow along with clickable beads and meditations for each mystery of the rosary.
            </p>
          </Card>

          <Card className="p-10 text-center hover:shadow-2xl transition-all duration-300 bg-white border-0 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 mb-6">
              <Sparkles className="w-10 h-10 text-amber-700" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-primary">Daily Mystery</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatically displays the appropriate mystery based on the traditional schedule.
            </p>
          </Card>

          <Card className="p-10 text-center hover:shadow-2xl transition-all duration-300 bg-white border-0 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 mb-6">
              <ShoppingBag className="w-10 h-10 text-emerald-700" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-primary">Handcrafted Rosaries</h3>
            <p className="text-gray-600 leading-relaxed">
              Discover beautiful rosaries and prayer bracelets made from wood, crystal, and precious metals.
            </p>
          </Card>
        </div>

        {/* Featured Products Preview */}
        <div className="max-w-6xl mx-auto mb-20 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600">Handcrafted with devotion and care</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Crystal Rosary', price: '$45', image: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400&q=80' },
              { name: 'Wooden Rosary', price: '$35', image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&q=80' },
              { name: 'Gold Rosary', price: '$85', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' }
            ].map((product, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 group">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-accent mb-4">{product.price}</p>
                  <Link to="/shop">
                    <Button className="w-full bg-primary hover:bg-primary/90">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto mb-20 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Blessed by faith, trusted by many</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Maria S.', text: 'The prayer guide has deepened my spiritual practice immensely.', rating: 5 },
              { name: 'John D.', text: 'Beautiful craftsmanship and fast shipping. Highly recommend!', rating: 5 },
              { name: 'Sarah L.', text: 'The custom rosary option allowed me to create something truly special.', rating: 5 }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-8 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 text-center leading-relaxed">"{testimonial.text}"</p>
                <p className="text-primary font-semibold text-center">— {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-serif italic text-primary text-center leading-relaxed">
              "The Rosary is the most beautiful and the most rich in graces of all prayers."
              <footer className="text-lg font-sans not-italic text-gray-600 mt-6">
                — Pope Pius IX
              </footer>
            </blockquote>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;