import Image from "next/image";
import {site} from "@/config/site";

const iubendaLinkClass =
  "iubenda-white iubenda-noiframe iubenda-embed hover:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020b18] py-12">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-pm-pro.jpg"
              alt="PM Pro"
              width={64}
              height={64}
              className="h-16 rounded-full"
            />
            <div>
              <p className="font-bold">PM Pro</p>
              <a
                href="https://evolutionmediagroups.com/evolution-media"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted hover:text-white"
              >
                by Evolution Media Group
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm text-muted sm:items-end">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href="tel:+393315075528" className="hover:text-white">
                331 507 5528
              </a>
              <a
                href="mailto:info@pmproitalia.com"
                className="hover:text-white"
              >
                info@pmproitalia.com
              </a>
            </div>
            <div className="flex flex-wrap gap-5">
              <a
                href="https://www.iubenda.com/privacy-policy/39457603"
                className={iubendaLinkClass}
                title="Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.iubenda.com/privacy-policy/39457603/cookie-policy"
                className={iubendaLinkClass}
                title="Cookie Policy"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-4xl text-xs leading-5 text-muted">
          I risultati possono variare in base al territorio, alla struttura, al
          budget, all’offerta commerciale, alla velocità di gestione e alle
          condizioni del mercato. PM Pro non garantisce un numero prestabilito
          di immobili, proprietari o appuntamenti.
        </p>
        <p className="mt-5 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
