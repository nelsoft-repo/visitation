import Navigation from '../Navigation';
import Footer from '../Footer';
import { Card } from '../ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8">Privacy Policy</h1>
        
        <Card className="p-8 bg-white">
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through our payment provider)</li>
                <li>Order history and preferences</li>
                <li>Prayer requests and custom rosary specifications</li>
                <li>Product reviews and ratings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to prayer requests with care and confidentiality</li>
                <li>Improve our products and services</li>
                <li>Send promotional emails (with your consent)</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Shipping carriers to deliver your orders</li>
                <li>Payment processors to complete transactions</li>
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Prayer Request Confidentiality</h2>
              <p className="mb-4">
                Prayer requests are treated with the utmost respect and confidentiality. They are only shared with our prayer team and are never sold or used for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
              <p className="mb-4">
                We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this privacy policy, please contact us at:
              </p>
              <p className="mb-2"><strong>Email:</strong> privacy@visitationrosaries.com</p>
              <p className="mb-2"><strong>Phone:</strong> (555) 123-4567</p>
            </section>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
