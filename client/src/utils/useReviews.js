// Custom hook för att använda ReviewContext med valfri fallback om ingen kontext finns
import { useContext } from 'react';
import ReviewContext from '../context/ReviewContext';

export function useReviews(fallbackValue = null) {
  const context = useContext(ReviewContext);
  
  // Om inget sammanhang hittas och en reserv tillhandahålls, returnera reservdelen
  if (context === undefined) {
    if (fallbackValue !== null) {
      return fallbackValue;
    }
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  
  return context;
}