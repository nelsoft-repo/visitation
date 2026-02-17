CREATE TABLE IF NOT EXISTS visitation.email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES visitation.customers(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('order_confirmation', 'shipping_update', 'prayer_request', 'contact_form', 'newsletter', 'password_reset')),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_notifications_customer ON visitation.email_notifications(customer_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_status ON visitation.email_notifications(status);
CREATE INDEX IF NOT EXISTS idx_email_notifications_type ON visitation.email_notifications(type);

alter publication supabase_realtime add table visitation.email_notifications;
