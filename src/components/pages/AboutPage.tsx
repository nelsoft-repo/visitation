import Navigation from '../Navigation';
import Footer from '../Footer';
import { Card, CardContent } from '../ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-slate-800 mb-8 text-center">About Us</h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif text-slate-700 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                We are dedicated to providing beautiful, handcrafted rosaries and prayer tools 
                to help deepen your spiritual journey. Each piece is created with care and devotion, 
                designed to be both a sacred tool for prayer and a cherished keepsake.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif text-slate-700 mb-4">Our Story</h2>
              <p className="text-slate-600 leading-relaxed">
                Founded with a passion for traditional Catholic devotion, our mission is to make 
                quality rosaries accessible to all who seek to grow in their prayer life. We believe 
                that the rosary is a powerful tool for meditation and connection with the divine.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif text-slate-700 mb-4">Quality & Craftsmanship</h2>
              <p className="text-slate-600 leading-relaxed">
                Every rosary in our collection is carefully selected or handcrafted using premium 
                materials including natural wood, semi-precious stones, and durable metals. We stand 
                behind the quality of our products and the sacred purpose they serve.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
