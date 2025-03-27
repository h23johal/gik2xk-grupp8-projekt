import { useContext } from 'react';
import ReviewContext from '../context/ReviewContext';

export function useReviews(fallbackValue = null) {
  const context = useContext(ReviewContext);
  
  // If no context is found and a fallback is provided, return the fallback
  if (context === undefined) {
    if (fallbackValue !== null) {
      return fallbackValue;
    }
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  
  return context;
}