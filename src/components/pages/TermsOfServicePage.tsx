import Navigation from '../Navigation';
import Footer from '../Footer';
import { Card } from '../ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8">Terms of Service</h1>
        
        <Card className="p-8 bg-white">
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Visitation Rosaries, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Products and Services</h2>
              <p className="mb-4">We offer:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Handcrafted rosaries and prayer bracelets</li>
                <li>Custom rosary design services</li>
                <li>Interactive prayer guides</li>
                <li>Prayer request submissions</li>
              </ul>
              <p className="mb-4">
                All products are handmade with care. Slight variations in appearance are natural and part of the artisan quality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Orders and Payment</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All prices are in USD and subject to change without notice</li>
                <li>Payment is required at the time of order</li>
                <li>We accept major credit cards and secure payment methods</li>
                <li>Orders are subject to product availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
              <p className="mb-4">
                We ship to addresses within the United States. Shipping times vary by location. Free shipping is offered on orders over $75. We are not responsible for delays caused by shipping carriers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Returns accepted within 30 days of delivery</li>
                <li>Items must be unused and in original condition</li>
                <li>Custom rosaries are non-refundable</li>
                <li>Refunds processed within 5-7 business days</li>
                <li>Return shipping costs are the customer's responsibility</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Custom Orders</h2>
              <p className="mb-4">
                Custom rosary orders require a 50% non-refundable deposit. Completion time is typically 2-4 weeks. Final approval is required before shipping.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="mb-4">
                All content on this site, including images, text, and designs, is the property of Visitation Rosaries and protected by copyright law. Unauthorized use is prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. User Conduct</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use the site for any unlawful purpose</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with site operations</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Post offensive or inappropriate content in reviews</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                Visitation Rosaries is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Disclaimer</h2>
              <p className="mb-4">
                Products are provided "as is" without warranties of any kind. While we strive for quality, we do not guarantee that products will meet your specific expectations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="mb-4">
                These terms are governed by the laws of the United States. Any disputes will be resolved in the courts of [Your State].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
              <p className="mb-4">
                For questions about these terms, contact us at:
              </p>
              <p className="mb-2"><strong>Email:</strong> support@visitationrosaries.com</p>
              <p className="mb-2"><strong>Phone:</strong> (555) 123-4567</p>
            </section>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
