CREATE TABLE IF NOT EXISTS visitation.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES visitation.customers(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES visitation.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES visitation.products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES visitation.products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES visitation.customers(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title TEXT,
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES visitation.customers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  type TEXT CHECK (type IN ('order_confirmation', 'shipping_update', 'prayer_request', 'newsletter')) NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('pending', 'sent', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_customer ON visitation.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON visitation.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON visitation.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON visitation.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON visitation.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer ON visitation.product_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON visitation.product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_email_status ON visitation.email_notifications(status);

DO $$
BEGIN
  ALTER TABLE visitation.orders REPLICA IDENTITY FULL;
  ALTER TABLE visitation.order_items REPLICA IDENTITY FULL;
  ALTER TABLE visitation.product_reviews REPLICA IDENTITY FULL;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE visitation.orders;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE visitation.order_items;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE visitation.product_reviews;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE OR REPLACE FUNCTION visitation.update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE visitation.products
    SET 
      average_rating = COALESCE((
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM visitation.product_reviews
        WHERE product_id = OLD.product_id
      ), 0),
      review_count = (
        SELECT COUNT(*)
        FROM visitation.product_reviews
        WHERE product_id = OLD.product_id
      )
    WHERE id = OLD.product_id;
    RETURN OLD;
  ELSE
    UPDATE visitation.products
    SET 
      average_rating = COALESCE((
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM visitation.product_reviews
        WHERE product_id = NEW.product_id
      ), 0),
      review_count = (
        SELECT COUNT(*)
        FROM visitation.product_reviews
        WHERE product_id = NEW.product_id
      )
    WHERE id = NEW.product_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_product_rating_trigger ON visitation.product_reviews;
CREATE TRIGGER update_product_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON visitation.product_reviews
FOR EACH ROW
EXECUTE FUNCTION visitation.update_product_rating();

ALTER TABLE visitation.products 
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;