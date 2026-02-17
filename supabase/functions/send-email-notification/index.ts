import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  subject: string;
  type: 'order_confirmation' | 'shipping_update' | 'prayer_request' | 'contact_form' | 'newsletter' | 'password_reset';
  customerId?: string;
  data?: any;
}

const getEmailTemplate = (type: string, data: any): string => {
  const baseStyle = `
    <style>
      body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #8B1538 0%, #A91D42 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
      .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
      .button { display: inline-block; background: #8B1538; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      .order-details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
      .cross-icon { font-size: 40px; margin-bottom: 10px; }
    </style>
  `;

  switch (type) {
    case 'order_confirmation':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="cross-icon">✝</div>
              <h1>Order Confirmation</h1>
              <p>Thank you for your purchase!</p>
            </div>
            <div class="content">
              <p>Dear ${data.customerName || 'Valued Customer'},</p>
              <p>We've received your order and are preparing it with care and devotion.</p>
              
              <div class="order-details">
                <h3>Order #${data.orderId}</h3>
                <p><strong>Order Date:</strong> ${new Date(data.orderDate).toLocaleDateString()}</p>
                <p><strong>Total:</strong> $${data.total?.toFixed(2)}</p>
                ${data.items ? `
                  <h4>Items:</h4>
                  <ul>
                    ${data.items.map((item: any) => `<li>${item.name} - Quantity: ${item.quantity} - $${item.price?.toFixed(2)}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>

              <p>We'll send you another email when your order ships.</p>
              <p style="margin-top: 30px;">May God bless you,<br><strong>Visitation Rosaries Team</strong></p>
            </div>
            <div class="footer">
              <p>Visitation Rosaries | Handcrafted with Faith & Devotion</p>
              <p>If you have any questions, please contact us at support@visitationrosaries.com</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'shipping_update':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="cross-icon">✝</div>
              <h1>Your Order Has Shipped!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.customerName || 'Valued Customer'},</p>
              <p>Great news! Your order #${data.orderId} has been shipped and is on its way to you.</p>
              
              <div class="order-details">
                <p><strong>Tracking Number:</strong> ${data.trackingNumber || 'Will be updated soon'}</p>
                <p><strong>Carrier:</strong> ${data.carrier || 'USPS'}</p>
                <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery || '3-5 business days'}</p>
              </div>

              ${data.trackingUrl ? `<a href="${data.trackingUrl}" class="button">Track Your Package</a>` : ''}

              <p style="margin-top: 30px;">May your rosary bring you peace and comfort,<br><strong>Visitation Rosaries Team</strong></p>
            </div>
            <div class="footer">
              <p>Visitation Rosaries | Handcrafted with Faith & Devotion</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'prayer_request':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="cross-icon">🙏</div>
              <h1>Prayer Request Received</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name || 'Friend in Christ'},</p>
              <p>We have received your prayer request and will lift your intentions up in prayer.</p>
              
              <div class="order-details">
                <p><em>"The prayer of a righteous person is powerful and effective." - James 5:16</em></p>
              </div>

              <p>Your request will be included in our community's daily rosary prayers. Know that you are not alone, and that we are praying for you.</p>
              
              <p style="margin-top: 30px;">In Christ's love,<br><strong>Visitation Rosaries Prayer Team</strong></p>
            </div>
            <div class="footer">
              <p>Visitation Rosaries | United in Prayer</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'contact_form':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="cross-icon">✝</div>
              <h1>Message Received</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              <p>Thank you for contacting Visitation Rosaries. We have received your message and will respond within 24-48 hours.</p>
              
              <div class="order-details">
                <p><strong>Your Message:</strong></p>
                <p>${data.message}</p>
              </div>

              <p style="margin-top: 30px;">God bless you,<br><strong>Visitation Rosaries Team</strong></p>
            </div>
            <div class="footer">
              <p>Visitation Rosaries | Here to Serve</p>
            </div>
          </div>
        </body>
        </html>
      `;

    default:
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="cross-icon">✝</div>
              <h1>Visitation Rosaries</h1>
            </div>
            <div class="content">
              <p>${data.message || 'Thank you for being part of our community.'}</p>
            </div>
            <div class="footer">
              <p>Visitation Rosaries | Handcrafted with Faith & Devotion</p>
            </div>
          </div>
        </body>
        </html>
      `;
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_KEY') ?? ''
    );

    const { to, subject, type, customerId, data }: EmailRequest = await req.json();

    if (!to || !subject || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, type' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const htmlBody = getEmailTemplate(type, data || {});
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    let emailStatus = 'pending';
    let errorMessage = null;

    // Send email via Resend if API key is configured
    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Visitation Rosaries <noreply@visitationrosaries.com>',
            to: [to],
            subject: subject,
            html: htmlBody,
          }),
        });

        if (resendResponse.ok) {
          emailStatus = 'sent';
          console.log(`Email sent successfully to ${to}`);
        } else {
          const errorData = await resendResponse.json();
          emailStatus = 'failed';
          errorMessage = JSON.stringify(errorData);
          console.error('Resend API error:', errorData);
        }
      } catch (error: any) {
        emailStatus = 'failed';
        errorMessage = error.message;
        console.error('Error sending email:', error);
      }
    } else {
      console.log('RESEND_API_KEY not configured. Email logged but not sent.');
      console.log(`Would send to: ${to}, Subject: ${subject}`);
    }

    // Log to database
    const { error: dbError } = await supabaseClient
      .schema('visitation')
      .from('email_notifications')
      .insert([{
        customer_id: customerId || null,
        email: to,
        type,
        subject,
        body: htmlBody,
        status: emailStatus,
        error_message: errorMessage,
        sent_at: emailStatus === 'sent' ? new Date().toISOString() : null
      }]);

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(
      JSON.stringify({ 
        success: emailStatus === 'sent',
        status: emailStatus,
        message: emailStatus === 'sent' 
          ? 'Email sent successfully' 
          : resendApiKey 
            ? 'Email failed to send' 
            : 'Email logged (RESEND_API_KEY not configured)',
        to,
        subject
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});