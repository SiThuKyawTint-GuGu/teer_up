'use client';
import { useCallback, useEffect } from 'react';
import { redirect } from 'next/navigation';

import { sessionStatus } from '@/utils/session';

interface WithAuthProps {}

// const protectedRoutes = ['/client-hoc'];

export default function withAuth<T>(Component: React.ComponentType<T>) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    // TODO: Need to modify the token retrieval logic
    const token = sessionStatus; // Get the user's session token

    const checkAuth = useCallback(() => {
      if (!token) {
        // Define a function to check user authentication
        redirect('/admin');
        // return;
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
