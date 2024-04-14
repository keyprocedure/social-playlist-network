"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Logout() {
	const router = useRouter();

    useEffect(() => {
        Cookies.remove('userid');
        //console.log('Logged out');
        router.push('/');
    }, [router]);

	return null;
}
