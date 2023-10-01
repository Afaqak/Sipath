'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useEffect } from 'react';

export function withPrivateRoute(Component, allowedRoles = []) {
  return function WithPrivate(props) {
    useEffect(() => {
      console.log('run');
    }, []);

    const router = useRouter();
    const user = useSelector((state) => state.userAuth.user);

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.push('/forbidden');
      return null;
    }

    return <Component {...props} />;
  };
}
