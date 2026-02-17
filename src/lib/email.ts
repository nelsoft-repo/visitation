import { supabase } from './supabase';

interface SendEmailParams {
  to: string;
  subject: string;
  type: 'order_confirmation' | 'shipping_update' | 'prayer_request' | 'contact_form' | 'newsletter' | 'password_reset';
  customerId?: string;
  data?: any;
}

export const sendEmail = async (params: SendEmailParams) => {
  try {
    const { data, error } = await supabase.functions.invoke('supabase-functions-send-email-notification', {
      body: params
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error invoking email function:', error);
    return { success: false, error };
  }
};

// Convenience functions for specific email types
export const sendOrderConfirmation = async (
  email: string,
  orderData: {
    orderId: string;
    customerName: string;
    orderDate: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
  },
  customerId?: string
) => {
  return sendEmail({
    to: email,
    subject: `Order Confirmation - #${orderData.orderId}`,
    type: 'order_confirmation',
    customerId,
    data: orderData
  });
};

export const sendShippingUpdate = async (
  email: string,
  shippingData: {
    orderId: string;
    customerName: string;
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: string;
    trackingUrl?: string;
  },
  customerId?: string
) => {
  return sendEmail({
    to: email,
    subject: `Your Order Has Shipped - #${shippingData.orderId}`,
    type: 'shipping_update',
    customerId,
    data: shippingData
  });
};

export const sendPrayerRequestConfirmation = async (
  email: string,
  name: string,
  customerId?: string
) => {
  return sendEmail({
    to: email,
    subject: 'Your Prayer Request Has Been Received',
    type: 'prayer_request',
    customerId,
    data: { name }
  });
};

export const sendContactFormConfirmation = async (
  email: string,
  contactData: {
    name: string;
    message: string;
  }
) => {
  return sendEmail({
    to: email,
    subject: 'We Received Your Message',
    type: 'contact_form',
    data: contactData
  });
};
