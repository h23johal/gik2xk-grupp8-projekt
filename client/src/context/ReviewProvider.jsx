import React, { useState, useEffect } from 'react';
import { getProductReviews } from '../services/RatingService';
import { useRefetchTrigger } from '../utils/refetch';
import ReviewContext from './ReviewContext';

export function ReviewProvider({ children, productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, triggerRefetch] = useRefetchTrigger();

  // Fetch reviews vid mount eller när productId ändras
  useEffect(() => {
    const fetchReviews = async () => {
      // Set loading true innan vi hämtar data
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