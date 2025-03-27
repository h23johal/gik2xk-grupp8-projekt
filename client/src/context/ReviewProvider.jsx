import React, { useState, useEffect } from 'react';
import { getProductReviews } from '../services/RatingService';
import { useRefetchTrigger } from '../utils/refetch';
import ReviewContext from './ReviewContext';

export function ReviewProvider({ children, productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, triggerRefetch] = useRefetchTrigger();

  // Fetch reviews when component mounts or dependencies change
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await getProductReviews(productId);
        setReviews(response.reviews || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, refreshKey]);

  return (
    <ReviewContext.Provider value={{ 
      reviews, 
      loading, 
      triggerRefetch,
      setReviews 
    }}>
      {children}
    </ReviewContext.Provider>
  );
}