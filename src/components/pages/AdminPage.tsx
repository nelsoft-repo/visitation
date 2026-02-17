import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, Plus, Upload, X, Package } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  material: string;
  color: string;
  category: string;
  stock_quantity: number;
  sku: string;
}

interface CustomRosary {
  id: string;
  name: string;
  description: string;
  image: string;
  material: string;
  color: string;
  beads_count: number;
  centerpiece_description: string;
  crucifix_description: string;
  customer_name: string;
  created_for: string;
  price: number;
}

interface RosaryPart {
  id: string;
  name: string;
  type?: string;
  material?: string;
  color?: string;
  size?: string;
  shape?: string;
  finish?: string;
  image?: string;
  price?: number;
  price_per_bead?: number;
  price_per_unit?: number;
  price_per_link?: number;
  stock_quantity: number;
  description?: string;
  thickness?: string;
  length_per_unit?: string;
  gauge?: string;
  saint_or_symbol?: string;
}

type PartCategory = 'crosses' | 'centerpieces' | 'hail_mary_beads' | 'our_father_beads' | 'medals' | 'ropes' | 'links' | 'wires';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [customRosaries, setCustomRosaries] = useState<CustomRosary[]>([]);
  const [rosaryParts, setRosaryParts] = useState<Record<PartCategory, RosaryPart[]>>({
    crosses: [],
    centerpieces: [],
    hail_mary_beads: [],
    our_father_beads: [],
    medals: [],
    ropes: [],
    links: [],
    wires: []
  });
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingRosary, setEditingRosary] = useState<CustomRosary | null>(null);
  const [editingPart, setEditingPart] = useState<RosaryPart | null>(null);
  const [selectedPartCategory, setSelectedPartCategory] = useState<PartCategory>('crosses');
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showRosaryDialog, setShowRosaryDialog] = useState(false);
  const [showPartDialog, setShowPartDialog] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast({ 
          title: 'Authentication Required', 
          description: 'Please log in to access the admin panel.',
          variant: 'destructive' 
        });
        navigate('/login');
      } else if (!isAdmin) {
        toast({ 
          title: 'Access Denied', 
          description: 'You do not have admin privileges.',
          variant: 'destructive' 
        });
        navigate('/');
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchProducts(), fetchCustomRosaries(), fetchRosaryParts()]);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .schema('visitation')
      .from('products')
      .select('*')
      .order('name');
    
    if (error) {
      toast({ title: 'Error fetching products', description: error.message, variant: 'destructive' });
    } else {
      setProducts(data || []);
    }
  };

  const fetchCustomRosaries = async () => {
    const { data, error } = await supabase
      .from('custom_rosaries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: 'Error fetching custom rosaries', description: error.message, variant: 'destructive' });
    } else {
      setCustomRosaries(data || []);
    }
  };

  const fetchRosaryParts = async () => {
    const categories: PartCategory[] = ['crosses', 'centerpieces', 'hail_mary_beads', 'our_father_beads', 'medals', 'ropes', 'links', 'wires'];
    const newParts: Record<PartCategory, RosaryPart[]> = {
      crosses: [],
      centerpieces: [],
      hail_mary_beads: [],
      our_father_beads: [],
      medals: [],
      ropes: [],
      links: [],
      wires: []
    };

    for (const category of categories) {
      const { data, error } = await supabase
        .from(`inventory_${category}`)
        .select('*')
        .order('name');
      
      if (error) {
        toast({ title: `Error fetching ${category}`, description: error.message, variant: 'destructive' });
      } else {
        newParts[category] = data || [];
      }
    }

    setRosaryParts(newParts);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      toast({ title: 'Image upload failed', description: error.message, variant: 'destructive' });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'rosary' | 'part') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      if (type === 'product' && editingProduct) {
        setEditingProduct({ ...editingProduct, image: imageUrl });
      } else if (type === 'rosary' && editingRosary) {
        setEditingRosary({ ...editingRosary, image: imageUrl });
      } else if (type === 'part' && editingPart) {
        setEditingPart({ ...editingPart, image: imageUrl });
      }
    }
  };

  const saveProduct = async () => {
    if (!editingProduct) return;

    const productData = {
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price,
      image: editingProduct.image,
      material: editingProduct.material,
      color: editingProduct.color,
      category: editingProduct.category,
      stock_quantity: editingProduct.stock_quantity,
      sku: editingProduct.sku,
    };

    if (editingProduct.id) {
      const { error } = await supabase
        .schema('visitation')
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);

      if (error) {
        toast({ title: 'Error updating product', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Product updated successfully' });
        fetchProducts();
        setShowProductDialog(false);
        setEditingProduct(null);
      }
    } else {
      const { error } = await supabase
        .schema('visitation')
        .from('products')
        .insert([productData]);

      if (error) {
        toast({ title: 'Error creating product', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Product created successfully' });
        fetchProducts();
        setShowProductDialog(false);
        setEditingProduct(null);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .schema('visitation')
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Product deleted successfully' });
      fetchProducts();
    }
  };

  const saveCustomRosary = async () => {
    if (!editingRosary) return;

    const rosaryData = {
      name: editingRosary.name,
      description: editingRosary.description,
      image: editingRosary.image,
      material: editingRosary.material,
      color: editingRosary.color,
      beads_count: editingRosary.beads_count,
      centerpiece_description: editingRosary.centerpiece_description,
      crucifix_description: editingRosary.crucifix_description,
      customer_name: editingRosary.customer_name,
      created_for: editingRosary.created_for,
      price: editingRosary.price,
    };

    if (editingRosary.id) {
      const { error } = await supabase
        .from('custom_rosaries')
        .update(rosaryData)
        .eq('id', editingRosary.id);

      if (error) {
        toast({ title: 'Error updating rosary', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Custom rosary updated successfully' });
        fetchCustomRosaries();
        setShowRosaryDialog(false);
        setEditingRosary(null);
      }
    } else {
      const { error } = await supabase
        .from('custom_rosaries')
        .insert([rosaryData]);

      if (error) {
        toast({ title: 'Error creating rosary', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Custom rosary created successfully' });
        fetchCustomRosaries();
        setShowRosaryDialog(false);
        setEditingRosary(null);
      }
    }
  };

  const deleteCustomRosary = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom rosary?')) return;

    const { error } = await supabase
      .from('custom_rosaries')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting rosary', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Custom rosary deleted successfully' });
      fetchCustomRosaries();
    }
  };

  const savePart = async () => {
    if (!editingPart) return;

    const partData: any = {
      name: editingPart.name,
      type: editingPart.type,
      material: editingPart.material,
      color: editingPart.color,
      size: editingPart.size,
      finish: editingPart.finish,
      image: editingPart.image,
      stock_quantity: editingPart.stock_quantity,
      description: editingPart.description,
    };

    // Add category-specific fields
    if (selectedPartCategory === 'hail_mary_beads' || selectedPartCategory === 'our_father_beads') {
      partData.shape = editingPart.shape;
      partData.price_per_bead = editingPart.price_per_bead;
    } else if (selectedPartCategory === 'ropes') {
      partData.thickness = editingPart.thickness;
      partData.length_per_unit = editingPart.length_per_unit;
      partData.price_per_unit = editingPart.price_per_unit;
    } else if (selectedPartCategory === 'wires') {
      partData.gauge = editingPart.gauge;
      partData.length_per_unit = editingPart.length_per_unit;
      partData.price_per_unit = editingPart.price_per_unit;
    } else if (selectedPartCategory === 'links') {
      partData.price_per_link = editingPart.price_per_link;
    } else if (selectedPartCategory === 'medals') {
      partData.saint_or_symbol = editingPart.saint_or_symbol;
      partData.price = editingPart.price;
    } else {
      partData.price = editingPart.price;
    }

    if (editingPart.id) {
      const { error } = await supabase
        .from(`inventory_${selectedPartCategory}`)
        .update(partData)
        .eq('id', editingPart.id);

      if (error) {
        toast({ title: 'Error updating part', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Part updated successfully' });
        fetchRosaryParts();
        setShowPartDialog(false);
        setEditingPart(null);
      }
    } else {
      const { error } = await supabase
        .from(`inventory_${selectedPartCategory}`)
        .insert([partData]);

      if (error) {
        toast({ title: 'Error creating part', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Part created successfully' });
        fetchRosaryParts();
        setShowPartDialog(false);
        setEditingPart(null);
      }
    }
  };

  const deletePart = async (id: string, category: PartCategory) => {
    if (!confirm('Are you sure you want to delete this part?')) return;

    const { error } = await supabase
      .from(`inventory_${category}`)
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting part', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Part deleted successfully' });
      fetchRosaryParts();
    }
  };

  const openNewProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      material: 'wood',
      color: '',
      category: 'rosary',
      stock_quantity: 0,
      sku: '',
    });
    setShowProductDialog(true);
  };

  const openNewRosary = () => {
    setEditingRosary({
      id: '',
      name: '',
      description: '',
      image: '',
      material: '',
      color: '',
      beads_count: 59,
      centerpiece_description: '',
      crucifix_description: '',
      customer_name: '',
      created_for: '',
      price: 0,
    });
    setShowRosaryDialog(true);
  };

  const openNewPart = (category: PartCategory) => {
    setSelectedPartCategory(category);
    setEditingPart({
      id: '',
      name: '',
      type: '',
      material: '',
      color: '',
      size: '',
      shape: '',
      finish: '',
      image: '',
      price: 0,
      price_per_bead: 0,
      price_per_unit: 0,
      price_per_link: 0,
      stock_quantity: 0,
      description: '',
      thickness: '',
      length_per_unit: '',
      gauge: '',
      saint_or_symbol: ''
    });
    setShowPartDialog(true);
  };

  const getCategoryLabel = (category: PartCategory): string => {
    return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getPriceLabel = (category: PartCategory): string => {
    if (category === 'hail_mary_beads' || category === 'our_father_beads') return 'Price per Bead';
    if (category === 'ropes' || category === 'wires') return 'Price per Unit';
    if (category === 'links') return 'Price per Link';
    return 'Price';
  };

  const getPriceValue = (part: RosaryPart, category: PartCategory): number => {
    if (category === 'hail_mary_beads' || category === 'our_father_beads') return part.price_per_bead || 0;
    if (category === 'ropes' || category === 'wires') return part.price_per_unit || 0;
    if (category === 'links') return part.price_per_link || 0;
    return part.price || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-slate-800 mb-8">Store Management</h1>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="custom">Custom Rosaries</TabsTrigger>
            <TabsTrigger value="parts">
              <Package className="w-4 h-4 mr-2" />
              Rosary Parts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Products ({products.length})</h2>
              <Button onClick={openNewProduct}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex gap-4">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Price: ${product.price}</span>
                        <span>Stock: {product.stock_quantity}</span>
                        <span>SKU: {product.sku}</span>
                        <span className="capitalize">{product.material} - {product.color}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingProduct(product);
                          setShowProductDialog(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Custom Rosaries ({customRosaries.length})</h2>
              <Button onClick={openNewRosary}>
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Rosary
              </Button>
            </div>

            <div className="grid gap-4">
              {customRosaries.map((rosary) => (
                <Card key={rosary.id} className="p-4">
                  <div className="flex gap-4">
                    {rosary.image && (
                      <img src={rosary.image} alt={rosary.name} className="w-24 h-24 object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{rosary.name}</h3>
                      <p className="text-sm text-muted-foreground">{rosary.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Price: ${rosary.price}</span>
                        <span>Beads: {rosary.beads_count}</span>
                        <span>Customer: {rosary.customer_name}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingRosary(rosary);
                          setShowRosaryDialog(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteCustomRosary(rosary.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="parts" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Rosary Parts Inventory</h2>
              <p className="text-muted-foreground mb-4">Manage individual components for building custom rosaries</p>
              
              <Tabs value={selectedPartCategory} onValueChange={(v) => setSelectedPartCategory(v as PartCategory)}>
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                  <TabsTrigger value="crosses">Crosses</TabsTrigger>
                  <TabsTrigger value="centerpieces">Centers</TabsTrigger>
                  <TabsTrigger value="hail_mary_beads">HM Beads</TabsTrigger>
                  <TabsTrigger value="our_father_beads">OF Beads</TabsTrigger>
                  <TabsTrigger value="medals">Medals</TabsTrigger>
                  <TabsTrigger value="ropes">Ropes</TabsTrigger>
                  <TabsTrigger value="links">Links</TabsTrigger>
                  <TabsTrigger value="wires">Wires</TabsTrigger>
                </TabsList>

                {(['crosses', 'centerpieces', 'hail_mary_beads', 'our_father_beads', 'medals', 'ropes', 'links', 'wires'] as PartCategory[]).map((category) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">{getCategoryLabel(category)} ({rosaryParts[category].length})</h3>
                      <Button onClick={() => openNewPart(category)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add {getCategoryLabel(category).slice(0, -1)}
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      {rosaryParts[category].map((part) => (
                        <Card key={part.id} className="p-4">
                          <div className="flex gap-4">
                            {part.image && (
                              <img src={part.image} alt={part.name} className="w-20 h-20 object-cover rounded" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{part.name}</h4>
                              {part.description && (
                                <p className="text-sm text-muted-foreground">{part.description}</p>
                              )}
                              <div className="flex gap-4 mt-2 text-sm flex-wrap">
                                <span className="font-medium">${getPriceValue(part, category).toFixed(2)}</span>
                                <span>Stock: {part.stock_quantity}</span>
                                {part.material && <span className="capitalize">{part.material}</span>}
                                {part.color && <span className="capitalize">{part.color}</span>}
                                {part.size && <span>Size: {part.size}</span>}
                                {part.type && <span className="capitalize">{part.type}</span>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedPartCategory(category);
                                  setEditingPart(part);
                                  setShowPartDialog(true);
                                }}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => deletePart(part.id, category)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      {rosaryParts[category].length === 0 && (
                        <Card className="p-8 text-center text-muted-foreground">
                          No {getCategoryLabel(category).toLowerCase()} in inventory yet.
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Product Image</Label>
                {editingProduct.image && (
                  <div className="relative w-32 h-32">
                    <img src={editingProduct.image} alt="Product" className="w-full h-full object-cover rounded" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setEditingProduct({ ...editingProduct, image: '' })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'product')}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <span className="text-sm">Uploading...</span>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Stock Quantity</Label>
                  <Input
                    type="number"
                    value={editingProduct.stock_quantity}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Material</Label>
                  <Select
                    value={editingProduct.material}
                    onValueChange={(value) => setEditingProduct({ ...editingProduct, material: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wood">Wood</SelectItem>
                      <SelectItem value="crystal">Crystal</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rosary">Rosary</SelectItem>
                      <SelectItem value="bracelet">Bracelet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Color</Label>
                  <Input
                    value={editingProduct.color}
                    onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>SKU</Label>
                  <Input
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowProductDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveProduct}>
                  Save Product
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Custom Rosary Dialog */}
      <Dialog open={showRosaryDialog} onOpenChange={setShowRosaryDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRosary?.id ? 'Edit Custom Rosary' : 'Add New Custom Rosary'}</DialogTitle>
          </DialogHeader>
          {editingRosary && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Rosary Image</Label>
                {editingRosary.image && (
                  <div className="relative w-32 h-32">
                    <img src={editingRosary.image} alt="Rosary" className="w-full h-full object-cover rounded" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setEditingRosary({ ...editingRosary, image: '' })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'rosary')}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <span className="text-sm">Uploading...</span>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={editingRosary.name}
                  onChange={(e) => setEditingRosary({ ...editingRosary, name: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={editingRosary.description}
                  onChange={(e) => setEditingRosary({ ...editingRosary, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingRosary.price}
                    onChange={(e) => setEditingRosary({ ...editingRosary, price: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Beads Count</Label>
                  <Input
                    type="number"
                    value={editingRosary.beads_count}
                    onChange={(e) => setEditingRosary({ ...editingRosary, beads_count: parseInt(e.target.value) })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Material</Label>
                  <Input
                    value={editingRosary.material}
                    onChange={(e) => setEditingRosary({ ...editingRosary, material: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Color</Label>
                  <Input
                    value={editingRosary.color}
                    onChange={(e) => setEditingRosary({ ...editingRosary, color: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Customer Name</Label>
                  <Input
                    value={editingRosary.customer_name}
                    onChange={(e) => setEditingRosary({ ...editingRosary, customer_name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Created For</Label>
                <Input
                  value={editingRosary.created_for}
                  onChange={(e) => setEditingRosary({ ...editingRosary, created_for: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Centerpiece Description</Label>
                <Textarea
                  value={editingRosary.centerpiece_description}
                  onChange={(e) => setEditingRosary({ ...editingRosary, centerpiece_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label>Crucifix Description</Label>
                <Textarea
                  value={editingRosary.crucifix_description}
                  onChange={(e) => setEditingRosary({ ...editingRosary, crucifix_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowRosaryDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveCustomRosary}>
                  Save Custom Rosary
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rosary Part Dialog */}
      <Dialog open={showPartDialog} onOpenChange={setShowPartDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPart?.id ? 'Edit' : 'Add New'} {getCategoryLabel(selectedPartCategory).slice(0, -1)}
            </DialogTitle>
          </DialogHeader>
          {editingPart && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Image</Label>
                {editingPart.image && (
                  <div className="relative w-32 h-32">
                    <img src={editingPart.image} alt="Part" className="w-full h-full object-cover rounded" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setEditingPart({ ...editingPart, image: '' })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <Input
                  placeholder="Image URL"
                  value={editingPart.image || ''}
                  onChange={(e) => setEditingPart({ ...editingPart, image: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Name *</Label>
                <Input
                  value={editingPart.name}
                  onChange={(e) => setEditingPart({ ...editingPart, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={editingPart.description || ''}
                  onChange={(e) => setEditingPart({ ...editingPart, description: e.target.value })}
                  rows={2}
                  placeholder="Optional description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>{getPriceLabel(selectedPartCategory)} *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={
                      selectedPartCategory === 'hail_mary_beads' || selectedPartCategory === 'our_father_beads'
                        ? editingPart.price_per_bead
                        : selectedPartCategory === 'ropes' || selectedPartCategory === 'wires'
                        ? editingPart.price_per_unit
                        : selectedPartCategory === 'links'
                        ? editingPart.price_per_link
                        : editingPart.price
                    }
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (selectedPartCategory === 'hail_mary_beads' || selectedPartCategory === 'our_father_beads') {
                        setEditingPart({ ...editingPart, price_per_bead: value });
                      } else if (selectedPartCategory === 'ropes' || selectedPartCategory === 'wires') {
                        setEditingPart({ ...editingPart, price_per_unit: value });
                      } else if (selectedPartCategory === 'links') {
                        setEditingPart({ ...editingPart, price_per_link: value });
                      } else {
                        setEditingPart({ ...editingPart, price: value });
                      }
                    }}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Stock Quantity *</Label>
                  <Input
                    type="number"
                    value={editingPart.stock_quantity}
                    onChange={(e) => setEditingPart({ ...editingPart, stock_quantity: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Material</Label>
                  <Input
                    value={editingPart.material || ''}
                    onChange={(e) => setEditingPart({ ...editingPart, material: e.target.value })}
                    placeholder="e.g., Wood, Metal, Crystal"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Color</Label>
                  <Input
                    value={editingPart.color || ''}
                    onChange={(e) => setEditingPart({ ...editingPart, color: e.target.value })}
                    placeholder="e.g., Brown, Silver, Blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Input
                    value={editingPart.type || ''}
                    onChange={(e) => setEditingPart({ ...editingPart, type: e.target.value })}
                    placeholder="e.g., Traditional, Modern"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Size</Label>
                  <Input
                    value={editingPart.size || ''}
                    onChange={(e) => setEditingPart({ ...editingPart, size: e.target.value })}
                    placeholder="e.g., 8mm, Small, Large"
                  />
                </div>
              </div>

              {(selectedPartCategory === 'hail_mary_beads' || selectedPartCategory === 'our_father_beads') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Shape</Label>
                    <Input
                      value={editingPart.shape || ''}
                      onChange={(e) => setEditingPart({ ...editingPart, shape: e.target.value })}
                      placeholder="e.g., Round, Oval"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Finish</Label>
                    <Input
                      value={editingPart.finish || ''}
                      onChange={(e) => setEditingPart({ ...editingPart, finish: e.target.value })}
                      placeholder="e.g., Polished, Matte"
                    />
                  </div>
                </div>
              )}

              {selectedPartCategory === 'medals' && (
                <div className="grid gap-2">
                  <Label>Saint or Symbol</Label>
                  <Input
                    value={editingPart.saint_or_symbol || ''}
                    onChange={(e) => setEditingPart({ ...editingPart, saint_or_symbol: e.target.value })}
                    placeholder="e.g., St. Benedict, Miraculous Medal"
                  />
                </div>
              )}

              {(selectedPartCategory === 'ropes' || selectedPartCategory === 'wires') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>{selectedPartCategory === 'ropes' ? 'Thickness' : 'Gauge'}</Label>
                    <Input
                      value={selectedPartCategory === 'ropes' ? editingPart.thickness || '' : editingPart.gauge || ''}
                      onChange={(e) => setEditingPart({ 
                        ...editingPart, 
                        ...(selectedPartCategory === 'ropes' ? { thickness: e.target.value } : { gauge: e.target.value })
                      })}
                      placeholder={selectedPartCategory === 'ropes' ? 'e.g., 1mm, 2mm' : 'e.g., 20 gauge'}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Length per Unit</Label>
                    <Input
                      value={editingPart.length_per_unit || ''}
                      onChange={(e) => setEditingPart({ ...editingPart, length_per_unit: e.target.value })}
                      placeholder="e.g., 1 meter, 5 feet"
                    />
                  </div>
                </div>
              )}

              {(selectedPartCategory === 'crosses' || selectedPartCategory === 'centerpieces' || selectedPartCategory === 'links') && (
                <div className="grid gap-2">
                  <Label>Finish</Label>
                  <Input
                    value={editingPart.finish || ''}
                    onChange={(e) => setEditingPart({ ...editingPart, finish: e.target.value })}
                    placeholder="e.g., Polished, Antique, Brushed"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowPartDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={savePart} disabled={!editingPart.name || editingPart.stock_quantity < 0}>
                  Save {getCategoryLabel(selectedPartCategory).slice(0, -1)}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}