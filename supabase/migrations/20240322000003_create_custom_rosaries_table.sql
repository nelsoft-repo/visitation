CREATE TABLE IF NOT EXISTS public.custom_rosaries (
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

alter publication supabase_realtime add table custom_rosaries;
