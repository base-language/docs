"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [localVersion, setLocalVersion] = useState<string | null>(null);
  useEffect(() => {
    const locVer =
      typeof window !== "undefined" && localStorage.getItem("docVersion");
    setLocalVersion(locVer || null);
  }, []);
  return (
    <div>
      <button
        onClick={() => router.push(`/docs/${localVersion}`)}
        className="text-white bg-blue-500 hover:bg-blue-600 active:scale-[0.989] hover:cursor-pointer transition-[background-color,color,scale] ease-in-out duration-200 rounded-xl px-3.5 py-2.5 text-base font-[450]"
      >
        Documentation
      </button>
    </div>
  );
}
