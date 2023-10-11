'use client';
import { useCallback, useEffect } from 'react';
import { redirect } from 'next/navigation';

import { sessionStatus } from '@/utils/session';

interface WithAuthProps {}

// const protectedRoutes = ['/client-hoc'];

export default function withAuth<T>(Component: React.ComponentType<T>) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const token = sessionStatus;

    const checkAuth = useCallback(() => {
      if (!token) {
        // return;
        redirect('/admin');
      }
    }, [token]);

    useEffect(() => {
      checkAuth();
      // run checkAuth every focus changes
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    // if (!session) null;
    return <Component {...props} />;
  };

  return ComponentWithAuth;
}
