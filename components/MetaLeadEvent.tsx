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
    const eventId = new URLSearchParams(window.location.search).get("eid");
    if (!eventId || sessionStorage.getItem(`${SESSION_KEY}:${eventId}`)) return;

    let attempts = 0;
    const sendLead = () => {
      attempts += 1;

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {}, {eventID: eventId});
        sessionStorage.setItem(`${SESSION_KEY}:${eventId}`, "true");
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
