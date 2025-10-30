export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  material: 'wood' | 'crystal' | 'metal';
  color: string;
  category: 'rosary' | 'bracelet';
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Olive Wood Rosary',
    description: 'Handcrafted from authentic olive wood from the Holy Land. Each bead carries the natural grain and warmth of sacred wood.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80',
    material: 'wood',
    color: 'brown',
    category: 'rosary',
    inStock: true
  },
  {
    id: '2',
    name: 'Crystal Rosary',
    description: 'Elegant crystal beads that catch the light beautifully. Perfect for meditation and prayer.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    material: 'crystal',
    color: 'clear',
    category: 'rosary',
    inStock: true
  },
  {
    id: '3',
    name: 'Sterling Silver Rosary',
    description: 'Premium sterling silver rosary with intricate detailing. A timeless piece for devotion.',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    material: 'metal',
    color: 'silver',
    category: 'rosary',
    inStock: true
  },
  {
    id: '4',
    name: 'Rose Quartz Rosary',
    description: 'Soft pink rose quartz beads symbolizing love and compassion. Gentle on the hands during prayer.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80',
    material: 'crystal',
    color: 'pink',
    category: 'rosary',
    inStock: true
  },
  {
    id: '5',
    name: 'Wooden Prayer Bracelet',
    description: 'Simple wooden bracelet with decade beads. Perfect for prayers on the go.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80',
    material: 'wood',
    color: 'brown',
    category: 'bracelet',
    inStock: true
  },
  {
    id: '6',
    name: 'Amethyst Rosary',
    description: 'Deep purple amethyst beads known for spiritual protection and clarity.',
    price: 70.00,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
    material: 'crystal',
    color: 'purple',
    category: 'rosary',
    inStock: true
  },
  {
    id: '7',
    name: 'Gold-Plated Rosary',
    description: 'Luxurious gold-plated rosary with ornate crucifix. A beautiful heirloom piece.',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    material: 'metal',
    color: 'gold',
    category: 'rosary',
    inStock: true
  },
  {
    id: '8',
    name: 'Turquoise Bracelet',
    description: 'Vibrant turquoise stone bracelet with silver accents. Carries protective energy.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&q=80',
    material: 'crystal',
    color: 'blue',
    category: 'bracelet',
    inStock: true
  }
];