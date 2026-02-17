import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  type: 'contact' | 'prayer';
  name: string;
  email?: string;
  subject?: string;
  message?: string;
  prayerRequest?: string;
  isAnonymous?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 });
  }

  try {
    const { type, name, email, subject, message, prayerRequest, isAnonymous }: EmailRequest = await req.json();

    // Log the submission (in production, you'd send an actual email here)
    console.log('New submission received:', {
      type,
      name,
      email,
      subject,
      message,
      prayerRequest,
      isAnonymous
    });

    // In a production environment, you would integrate with an email service like:
    // - Resend
    // - SendGrid
    // - AWS SES
    // For now, we'll just log and return success

    const emailContent = type === 'contact' 
      ? `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
      : `New Prayer Request\n\nName: ${isAnonymous ? 'Anonymous' : name}\nEmail: ${email || 'Not provided'}\n\nPrayer Request:\n${prayerRequest}`;

    console.log('Email content:', emailContent);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification logged successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing notification:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
