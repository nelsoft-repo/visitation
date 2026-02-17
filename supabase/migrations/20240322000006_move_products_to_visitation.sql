CREATE TABLE IF NOT EXISTS visitation.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  material TEXT,
  color TEXT,
  category TEXT,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') 
     AND NOT EXISTS (SELECT 1 FROM visitation.products LIMIT 1) THEN
    INSERT INTO visitation.products (id, name, description, price, image, material, color, category, stock_quantity, created_at)
    SELECT id, name, description, price, image, material, color, category, stock_quantity, created_at 
    FROM public.products
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'visitation' 
    AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE visitation.products;
  END IF;
END $$;
