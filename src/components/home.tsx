import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Navigation from './Navigation';
import { Cross, ShoppingBag, Sparkles } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Cross className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">
            Visitation Rosaries
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A peaceful sanctuary for prayer and devotion. Experience guided rosary meditation 
            and discover beautiful handcrafted rosaries.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/prayer">
              <Button size="lg" className="text-lg px-8">
                Begin Prayer
              </Button>
            </Link>
            <Link to="/shop">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Cross className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Prayer Guide</h3>
            <p className="text-muted-foreground">
              Follow along with clickable beads and meditations for each mystery of the rosary.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Sparkles className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Daily Mystery</h3>
            <p className="text-muted-foreground">
              Automatically displays the appropriate mystery based on the traditional schedule.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Handcrafted Rosaries</h3>
            <p className="text-muted-foreground">
              Discover beautiful rosaries and prayer bracelets made from wood, crystal, and precious metals.
            </p>
          </Card>
        </div>

        {/* Quote Section */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl font-serif italic text-primary/80 border-l-4 border-accent pl-6">
            "The Rosary is the most beautiful and the most rich in graces of all prayers."
            <footer className="text-base font-sans not-italic text-muted-foreground mt-4">
              — Pope Pius IX
            </footer>
          </blockquote>
        </div>
      </main>

      <footer className="border-t border-border mt-20 py-8 bg-white/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Visitation Rosaries. A place of peace and devotion.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;