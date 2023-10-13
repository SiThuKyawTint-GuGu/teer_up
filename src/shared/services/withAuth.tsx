'use client';
import { useCallback, useEffect } from 'react';
import { redirect } from 'next/navigation';

import { getToken } from '@/utils/auth';

interface WithAuthProps {}

export default function withAuth<T>(Component: React.ComponentType<T>) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const token = getToken();

    const checkAuth = useCallback(() => {
      if (!token) {
        // Define a function to check user authentication
        redirect('/admin');
      }
    }, [token]);

    // Use useEffect to run the checkAuth function and set up event listeners
    useEffect(() => {
      checkAuth();
      // Run checkAuth every time the focus changes
      window.addEventListener('focus', checkAuth);
      // Remove the event listener when the component is unmounted
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    // If the user is not authenticated, the checkAuth function will redirect to '/admin'
    // Otherwise, render the wrapped component with the provided props
    return <Component {...props} />;
  };

  // Return the component with authentication logic
  return ComponentWithAuth;
}
