"use client";
import React, { useState, useEffect } from "react";
import { getPageMap } from "nextra/page-map";
import { usePathname, useRouter } from "next/navigation";

export default function VersionSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [versions, setVersions] = useState<string[] | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string>("0.0.2-alpha");
  useEffect(() => {
    async function init() {
      const localVersion =
        typeof window !== "undefined" &&
        window.localStorage.getItem("docVersion");
      if (localVersion) {
        setCurrentVersion(localVersion);
      } else {
        const map = await getPageMap("/");
        const latestVersion = map
          .filter((item: any) => item.route !== "/")
          .map((item: any, i: number) => {
            return item.route;
          })
          .find((route: string) => route?.toString()?.includes("@latest"))
          .replace("/", "");
        typeof window !== "undefined" &&
          window.localStorage.setItem("docVersion", latestVersion);
        setCurrentVersion(latestVersion);
      }
      const map = await getPageMap("/");
      const vers = map
        .filter((item: any) => item.route !== "/")
        .map((item: any, i: number) => {
          return item.route?.replace("/", "");
        });
      setVersions(vers);
    }
    init();
  }, []);
  const handleSelect = (v: string) => {
    setCurrentVersion(v);
    window.localStorage.setItem("docVersion", v);
    setOpen(false);
    console.log("currentPathname: ", pathname);
    if (pathname.includes("docs")) {
      const newRoute = `/docs/${v}${
        pathname.split("/")[3] ? `/${pathname.split("/")[3]}` : ""
      }${pathname.split("/")[4] ? `/${pathname.split("/")[4]}` : ""}${
        pathname.split("/")[5] ? `/${pathname.split("/")[5]}` : ""
      }`;
      console.log("newRoute", newRoute);
      document.location.replace(newRoute);
    } else {
      document.location.reload();
    }
  };
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition"
      >
        {currentVersion}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </button>
      {open && (
        <div className="absolute mt-1 h-full w-full bg-neutral-900 border border-neutral-800 rounded shadow-md">
          {versions?.map((v: string, i: number) => (
            <div
              key={i}
              onClick={() => handleSelect(v)}
              className="px-3 py-1 cursor-pointer hover:bg-neutral-800"
            >
              {v}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
