CREATE SCHEMA IF NOT EXISTS visitation;

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

CREATE TABLE IF NOT EXISTS visitation.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  prayer_request TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.custom_rosaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  material TEXT,
  color TEXT,
  beads_count INTEGER DEFAULT 59,
  centerpiece_description TEXT,
  crucifix_description TEXT,
  customer_name TEXT,
  created_for TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_crosses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  size TEXT,
  finish TEXT,
  image TEXT,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_centerpieces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  size TEXT,
  finish TEXT,
  image TEXT,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_hail_mary_beads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  size TEXT,
  shape TEXT,
  finish TEXT,
  image TEXT,
  price_per_bead DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_our_father_beads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  size TEXT,
  shape TEXT,
  finish TEXT,
  image TEXT,
  price_per_bead DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_medals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  size TEXT,
  finish TEXT,
  image TEXT,
  saint_or_symbol TEXT,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_ropes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  thickness TEXT,
  length_per_unit TEXT,
  image TEXT,
  price_per_unit DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  size TEXT,
  finish TEXT,
  image TEXT,
  price_per_link DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.inventory_wires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  material TEXT,
  color TEXT,
  gauge TEXT,
  length_per_unit TEXT,
  image TEXT,
  price_per_unit DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitation.master_rosaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cross_id UUID REFERENCES visitation.inventory_crosses(id),
  centerpiece_id UUID REFERENCES visitation.inventory_centerpieces(id),
  hail_mary_bead_id UUID REFERENCES visitation.inventory_hail_mary_beads(id),
  our_father_bead_id UUID REFERENCES visitation.inventory_our_father_beads(id),
  medal_id UUID REFERENCES visitation.inventory_medals(id),
  rope_id UUID REFERENCES visitation.inventory_ropes(id),
  link_id UUID REFERENCES visitation.inventory_links(id),
  wire_id UUID REFERENCES visitation.inventory_wires(id),
  hail_mary_bead_count INTEGER DEFAULT 53,
  our_father_bead_count INTEGER DEFAULT 6,
  total_price DECIMAL(10,2),
  image TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') 
     AND NOT EXISTS (SELECT 1 FROM visitation.products LIMIT 1) THEN
    INSERT INTO visitation.products (id, name, description, price, image, material, color, category, stock_quantity, created_at)
    SELECT id, name, description, price, image, material, color, category, stock_quantity, created_at 
    FROM public.products;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contact_submissions') 
     AND NOT EXISTS (SELECT 1 FROM visitation.contact_submissions LIMIT 1) THEN
    INSERT INTO visitation.contact_submissions SELECT * FROM public.contact_submissions;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'prayer_requests') 
     AND NOT EXISTS (SELECT 1 FROM visitation.prayer_requests LIMIT 1) THEN
    INSERT INTO visitation.prayer_requests SELECT * FROM public.prayer_requests;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'custom_rosaries') 
     AND NOT EXISTS (SELECT 1 FROM visitation.custom_rosaries LIMIT 1) THEN
    INSERT INTO visitation.custom_rosaries SELECT * FROM public.custom_rosaries;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_crosses') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_crosses LIMIT 1) THEN
    INSERT INTO visitation.inventory_crosses SELECT * FROM public.inventory_crosses;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_centerpieces') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_centerpieces LIMIT 1) THEN
    INSERT INTO visitation.inventory_centerpieces SELECT * FROM public.inventory_centerpieces;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_hail_mary_beads') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_hail_mary_beads LIMIT 1) THEN
    INSERT INTO visitation.inventory_hail_mary_beads SELECT * FROM public.inventory_hail_mary_beads;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_our_father_beads') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_our_father_beads LIMIT 1) THEN
    INSERT INTO visitation.inventory_our_father_beads SELECT * FROM public.inventory_our_father_beads;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_medals') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_medals LIMIT 1) THEN
    INSERT INTO visitation.inventory_medals SELECT * FROM public.inventory_medals;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_ropes') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_ropes LIMIT 1) THEN
    INSERT INTO visitation.inventory_ropes SELECT * FROM public.inventory_ropes;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_links') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_links LIMIT 1) THEN
    INSERT INTO visitation.inventory_links SELECT * FROM public.inventory_links;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'inventory_wires') 
     AND NOT EXISTS (SELECT 1 FROM visitation.inventory_wires LIMIT 1) THEN
    INSERT INTO visitation.inventory_wires SELECT * FROM public.inventory_wires;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'master_rosaries') 
     AND NOT EXISTS (SELECT 1 FROM visitation.master_rosaries LIMIT 1) THEN
    INSERT INTO visitation.master_rosaries SELECT * FROM public.master_rosaries;
  END IF;
END $$;

alter publication supabase_realtime add table visitation.products;
alter publication supabase_realtime add table visitation.contact_submissions;
alter publication supabase_realtime add table visitation.prayer_requests;
alter publication supabase_realtime add table visitation.custom_rosaries;
alter publication supabase_realtime add table visitation.inventory_crosses;
alter publication supabase_realtime add table visitation.inventory_centerpieces;
alter publication supabase_realtime add table visitation.inventory_hail_mary_beads;
alter publication supabase_realtime add table visitation.inventory_our_father_beads;
alter publication supabase_realtime add table visitation.inventory_medals;
alter publication supabase_realtime add table visitation.inventory_ropes;
alter publication supabase_realtime add table visitation.inventory_links;
alter publication supabase_realtime add table visitation.inventory_wires;
alter publication supabase_realtime add table visitation.master_rosaries;