CREATE TABLE IF NOT EXISTS public.inventory_crosses (
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

CREATE TABLE IF NOT EXISTS public.inventory_centerpieces (
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

CREATE TABLE IF NOT EXISTS public.inventory_hail_mary_beads (
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

CREATE TABLE IF NOT EXISTS public.inventory_our_father_beads (
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

CREATE TABLE IF NOT EXISTS public.inventory_medals (
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

CREATE TABLE IF NOT EXISTS public.inventory_ropes (
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

CREATE TABLE IF NOT EXISTS public.inventory_links (
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

CREATE TABLE IF NOT EXISTS public.inventory_wires (
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

CREATE TABLE IF NOT EXISTS public.master_rosaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cross_id UUID REFERENCES public.inventory_crosses(id),
  centerpiece_id UUID REFERENCES public.inventory_centerpieces(id),
  hail_mary_bead_id UUID REFERENCES public.inventory_hail_mary_beads(id),
  our_father_bead_id UUID REFERENCES public.inventory_our_father_beads(id),
  medal_id UUID REFERENCES public.inventory_medals(id),
  rope_id UUID REFERENCES public.inventory_ropes(id),
  link_id UUID REFERENCES public.inventory_links(id),
  wire_id UUID REFERENCES public.inventory_wires(id),
  hail_mary_bead_count INTEGER DEFAULT 53,
  our_father_bead_count INTEGER DEFAULT 6,
  total_price DECIMAL(10,2),
  image TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

alter publication supabase_realtime add table inventory_crosses;
alter publication supabase_realtime add table inventory_centerpieces;
alter publication supabase_realtime add table inventory_hail_mary_beads;
alter publication supabase_realtime add table inventory_our_father_beads;
alter publication supabase_realtime add table inventory_medals;
alter publication supabase_realtime add table inventory_ropes;
alter publication supabase_realtime add table inventory_links;
alter publication supabase_realtime add table inventory_wires;
alter publication supabase_realtime add table master_rosaries;
