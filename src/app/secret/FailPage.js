"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FailPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Jika akses langsung, redirect ke halaman utama
      router.replace("/");
    }
  }, [router]);
  return null;
}
