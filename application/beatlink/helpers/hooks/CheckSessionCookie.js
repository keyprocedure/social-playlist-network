// hooks/CheckSessionCookie.js

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CheckSessionCookie() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/login" && router.pathname !== "/register") {
      const sessionCookie = Cookies.get("userid");
      if (!sessionCookie) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }
  }, [router]);

  return isLoading;
}
