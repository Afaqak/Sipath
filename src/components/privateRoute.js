'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useAxios from '@/hooks/useAxios';
import { useEffect } from 'react';

export function withPrivateRoute(Component, allowedRoles = []) {
  return function WithPrivate(props) {
    const router = useRouter();
    const user = useSelector((state) => state.userAuth.user);

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.push('/forbidden');
      return null;
    }

    return <Component {...props} />;
  };
}
