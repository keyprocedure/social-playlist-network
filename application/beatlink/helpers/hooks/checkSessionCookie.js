// hooks/checkSessionCookie.js

"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function checkSessionCookie() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sessionCookie = Cookies.get('session');
    
    if (!sessionCookie) {
      // If the session cookie is not set, redirect
      router.push('/login');
    } else {
      // Allow rendering the component if the cookie is set
      setIsLoading(false);
    }
  });

  return isLoading;
}