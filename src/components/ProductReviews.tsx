import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Star } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  customer: {
    name: string;
  };
}

interface ProductReviewsProps {
  productId: string;
  averageRating?: number;
  reviewCount?: number;
}

export default function ProductReviews({ productId, averageRating = 0, reviewCount = 0 }: ProductReviewsProps) {
  const { customer } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .schema('visitation')
      .from('product_reviews')
      .select(`
        *,
        customer:customer_id (name)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReviews(data as any);
    }
    setLoading(false);
  };

  const submitReview = async () => {
    if (!customer) {
      toast({ title: 'Please log in to leave a review', variant: 'destructive' });
      return;
    }

    if (!comment.trim()) {
      toast({ title: 'Please write a review', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .schema('visitation')
      .from('product_reviews')
      .insert([{
        product_id: productId,
        customer_id: customer.id,
        rating,
        title: title.trim(),
        comment: comment.trim(),
      }]);

    if (error) {
      toast({ title: 'Error submitting review', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Review submitted successfully!' });
      setTitle('');
      setComment('');
      setRating(5);
      setShowForm(false);
      fetchReviews();
    }
    setSubmitting(false);
  };

  const StarRating = ({ value, interactive = false, onChange }: any) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange?.(star)}
            disabled={!interactive}
            className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
          >
            <Star
              className={`w-5 h-5 ${
                star <= value
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <StarRating value={Math.round(averageRating)} />
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
          </div>
        </div>
        {customer && !showForm && (
          <Button onClick={() => setShowForm(true)}>Write a Review</Button>
        )}
      </div>

      {showForm && (
        <Card className="p-6 mb-6 bg-white">
          <h3 className="font-semibold text-lg mb-4">Write Your Review</h3>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <StarRating value={rating} interactive onChange={setRating} />
            </div>
            <div>
              <Label>Title (optional)</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum up your experience"
                maxLength={100}
              />
            </div>
            <div>
              <Label>Review</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground mt-1">{comment.length}/1000</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={submitReview} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <p className="text-center py-8 text-muted-foreground">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <Card className="p-12 text-center bg-white">
          <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this product!</p>
          {customer && !showForm && (
            <Button onClick={() => setShowForm(true)}>Write the First Review</Button>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 bg-white">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>
                    {review.customer?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{review.customer?.name || 'Anonymous'}</span>
                    {review.verified_purchase && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <StarRating value={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {review.title && (
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                  )}
                  <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}