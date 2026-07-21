import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
const manrope=Manrope({subsets:["latin"],variable:"--font-manrope",display:"swap"});
const space=Space_Grotesk({subsets:["latin"],variable:"--font-space",display:"swap"});
export const metadata:Metadata={title:"PM Pro | Appuntamenti qualificati per property manager",description:"PM Pro aiuta property manager già operativi a costruire un processo di acquisizione proprietari: dal primo contatto fino all’appuntamento qualificato.",openGraph:{title:"PM Pro | Appuntamenti qualificati per property manager",description:"Dal primo contatto fino all’appuntamento qualificato.",type:"website"},twitter:{card:"summary_large_image"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="it"><body className={`${manrope.variable} ${space.variable}`}>{children}</body></html>}
