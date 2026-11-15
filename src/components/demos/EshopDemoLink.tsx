"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function EshopDemoLink() {
  const configured = process.env.NEXT_PUBLIC_ESHOP_DEMO_URL;
  const [url, setUrl] = useState(configured || "");
  useEffect(() => {
    if (configured || !["localhost", "127.0.0.1"].includes(location.hostname)) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const local = `http://${location.hostname}:1337`;
    fetch(`${local}/__demo_health`, { signal: controller.signal }).then(response => response.ok ? response.json() : null).then(data => {
      if (data?.originalEshop) setUrl(`${local}/eShop/product`);
    }).catch(() => {}).finally(() => clearTimeout(timeout));
    return () => { controller.abort(); clearTimeout(timeout); };
  }, [configured]);
  if (!url) return null;
  return <a href={url} target="_blank" rel="noopener noreferrer" className="button-secondary mb-3 w-full justify-between" aria-label="Open the original Eshop application">Open Eshop<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>;
}
