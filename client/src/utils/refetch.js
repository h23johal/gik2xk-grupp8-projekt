import { useState, useCallback } from 'react';

export function useRefetchTrigger() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const triggerRefetch = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return [refreshKey, triggerRefetch];
}

