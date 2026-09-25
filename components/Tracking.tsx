"use client";
export function track(event:string,params:Record<string,unknown>={}){if(typeof window==="undefined")return;window.dispatchEvent(new CustomEvent("pmpro:track",{detail:{event,...params}}));const w=window as unknown as {dataLayer?:unknown[]};w.dataLayer?.push({event,...params})}
