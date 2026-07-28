"use client";

import {useEffect} from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const SESSION_KEY = "pm-pro-meta-lead-sent";

export function MetaLeadEvent() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let attempts = 0;
    const sendLead = () => {
      attempts += 1;

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
        sessionStorage.setItem(SESSION_KEY, "true");
        window.clearInterval(interval);
      } else if (attempts >= 30) {
        window.clearInterval(interval);
      }
    };

    const interval = window.setInterval(sendLead, 100);
    sendLead();

    return () => window.clearInterval(interval);
  }, []);

  return null;
}
