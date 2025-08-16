"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Layout } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PageMapItem } from "nextra";
import { useRouter } from "next/navigation";

function deepMapRoutes(items: any[], prefix: string = "/docs"): any[] {
  return items.map((item) => {
    const newItem = { ...item, route: `${prefix}${item.route || ""}` };
    if (item.children) {
      newItem.children = deepMapRoutes(item.children, `${prefix}`);
    }
    return newItem;
  });
}

export default function Wrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [pageMap, setPageMap] = useState<PageMapItem[] | null>(null);
  useEffect(() => {
    async function init() {
      const localVersion =
        typeof window !== "undefined" &&
        window.localStorage.getItem("docVersion");
      if (localVersion) {
        const map = await getPageMap(`/${localVersion}`);
        const flatMappedMap = deepMapRoutes(map, "/docs");
        setPageMap(flatMappedMap);
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
        document.location.replace("/");
      }
    }
    init();
  }, []);
  if (!pageMap) return <div>Loading docs...</div>;
  return (
    <Layout
      navbar={<Header />}
      footer={<Footer />}
      sidebar={{
        toggleButton: false,
        defaultMenuCollapseLevel: 1,
      }}
      navigation={true}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/base-language/docs/blob/main"
    >
      {children}
    </Layout>
  );
}
