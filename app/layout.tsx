import type {Metadata} from "next";
import Script from "next/script";
import {Manrope, Space_Grotesk} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PM Pro | Appuntamenti qualificati per property manager",
  description:
    "PM Pro aiuta property manager già operativi a costruire un processo di acquisizione proprietari: dal primo contatto fino all’appuntamento qualificato.",
  openGraph: {
    title: "PM Pro | Appuntamenti qualificati per property manager",
    description: "Dal primo contatto fino all’appuntamento qualificato.",
    type: "website",
  },
  twitter: {card: "summary_large_image"},
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="it">
      <body className={`${manrope.variable} ${space.variable}`}>
        {children}

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','2483298032196925');
            fbq('track','PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{display: "none"}}
            src="https://www.facebook.com/tr?id=2483298032196925&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
