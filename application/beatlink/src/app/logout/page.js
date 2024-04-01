"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();

    // useEffect(() => {
    //     localStorage.removeItem('authToken');
    //     router.push('/');
    // }, [router]);

    return null;
}