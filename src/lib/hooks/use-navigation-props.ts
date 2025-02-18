import { useContext } from 'react';

import { NavigationContext } from '@/context';

export function useNavigationProps() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationProps must be used within a NavigationProvider');
  }
  return context;
}
