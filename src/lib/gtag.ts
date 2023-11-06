"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (typeof window.gtag === "undefined") return;

  window.gtag("config", GA_TRACKING_ID as string, {
    page_path: url,
  });
};

interface GTagEventProps {
  action: string;
  category: string;
  label: string;
  value: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEventProps) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

// route가 변경될 때 gtag에서
export const useGtag = () => {
  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const handleRouteChange = (url: URL) => {
      pageview(url);
    };

    if (savedPathNameRef.current !== pathname) {
      handleRouteChange(new URL(pathname, window.location.origin));
      // Update REF
      savedPathNameRef.current = pathname;
    }
  }, [pathname]);
};
