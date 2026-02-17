DROP TABLE IF EXISTS public.products;

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT,
  material TEXT CHECK (material IN ('wood', 'crystal', 'metal')),
  color TEXT,
  category TEXT CHECK (category IN ('rosary', 'bracelet')),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  sku TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_material ON public.products(material);
CREATE INDEX idx_products_stock ON public.products(stock_quantity);

ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

INSERT INTO public.products (name, description, price, image, material, color, category, stock_quantity, sku) VALUES
('Olive Wood Rosary', 'Handcrafted from authentic olive wood from the Holy Land. Each bead carries the natural grain and warmth of sacred wood.', 45.00, 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80', 'wood', 'brown', 'rosary', 15, 'ROS-OW-001'),
('Crystal Rosary', 'Elegant crystal beads that catch the light beautifully. Perfect for meditation and prayer.', 65.00, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', 'crystal', 'clear', 'rosary', 8, 'ROS-CR-001'),
('Sterling Silver Rosary', 'Premium sterling silver rosary with intricate detailing. A timeless piece for devotion.', 120.00, 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', 'metal', 'silver', 'rosary', 5, 'ROS-SS-001'),
('Rose Quartz Rosary', 'Soft pink rose quartz beads symbolizing love and compassion. Gentle on the hands during prayer.', 55.00, 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80', 'crystal', 'pink', 'rosary', 12, 'ROS-RQ-001'),
('Wooden Prayer Bracelet', 'Simple wooden bracelet with decade beads. Perfect for prayers on the go.', 25.00, 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80', 'wood', 'brown', 'bracelet', 20, 'BRC-WD-001'),
('Amethyst Rosary', 'Deep purple amethyst beads known for spiritual protection and clarity.', 70.00, 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80', 'crystal', 'purple', 'rosary', 10, 'ROS-AM-001'),
('Gold-Plated Rosary', 'Luxurious gold-plated rosary with ornate crucifix. A beautiful heirloom piece.', 95.00, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', 'metal', 'gold', 'rosary', 7, 'ROS-GP-001'),
('Turquoise Bracelet', 'Vibrant turquoise stone bracelet with silver accents. Carries protective energy.', 35.00, 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80', 'crystal', 'blue', 'bracelet', 18, 'BRC-TQ-001');