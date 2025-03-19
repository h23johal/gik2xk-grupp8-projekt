import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getOne } from '../services/ProductService';
import ProductCardLarge from '../components/ProductCardLarge';
import ReviewCarousel from '../components/ReviewCarousel';
import ReviewAccordion from '../components/ReviewAccordion';
import AddToCart from '../components/AddToCart';
import Grid from '@mui/material/Grid2';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const reviewsAccordionRef = useRef(null);

  useEffect(() => {
    getOne(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleReviewClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    if (reviewsAccordionRef.current) {
      reviewsAccordionRef.current.expandAccordion();
      setTimeout(() => {
        reviewsAccordionRef.current.scrollToReview(reviewId);
      }, 300);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Grid item xs={12}>
        <ReviewCarousel 
          productId={id} 
          onReviewClick={handleReviewClick} 
        />
      </Grid>
      
      <Grid item xs={12} md={8}>
        <ProductCardLarge product={product} />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <AddToCart product={product} />
      </Grid>
      
      <Grid item xs={12}>
        <ReviewAccordion 
          productId={id} 
          ref={reviewsAccordionRef}
          selectedReviewId={selectedReviewId} 
        />
      </Grid>
    </Grid>
  );
}

export default ProductDetailPage;