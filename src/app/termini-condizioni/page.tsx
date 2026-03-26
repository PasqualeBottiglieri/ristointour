import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termini e Condizioni",
  description:
    "Termini e condizioni d'uso del portale Ristointour.it — Condizioni generali del servizio.",
openGraph: {
  title: "Termini e Condizioni — ristointour.it",
},
};

export default function TerminiCondizioniPage() {
  return (
    <main className="bg-stone-50 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-2 font-serif text-4xl font-bold text-emerald-950">
          Termini e Condizioni
        </h1>
        <p className="mb-10 text-sm text-stone-500">
          Ultimo aggiornamento: 26 marzo 2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-stone-700">
          {/* 1 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              1. Descrizione del servizio
            </h2>
            <p>
              Il sito web{" "}
              <strong>ristointour.it</strong> (di seguito &ldquo;il Portale&rdquo;) è un
              portale dedicato alla scoperta e alla valorizzazione di ristoranti, pizzerie,
              agriturismi, caseifici, pasticcerie ed esperienze enogastronomiche nella Piana
              del Sele e nell&apos;area di Paestum, in Campania.
            </p>
            <p className="mt-2">
              Il Portale offre agli utenti la possibilità di consultare schede informative
              delle attività elencate, visualizzare dettagli quali indirizzo, contatti e
              descrizione, e accedere a contenuti editoriali sul territorio.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              2. Titolare del servizio
            </h2>
            <ul className="list-none space-y-1 rounded-lg bg-white p-4 border border-stone-200">
              <li>
                <strong>Associazione Culturale COMUNICARE</strong>
              </li>
              <li>Sede legale: Via Sant&apos;Antonio n. 5, 84025 Eboli (SA)</li>
              <li>P.IVA: 05584260656 — C.F.: 91052300653</li>
              <li>
                PEC:{" "}
                <a href="mailto:asscomunicare@pec.it" className="text-[#F86D16] underline">
                  asscomunicare@pec.it
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:asscomunicare2013@libero.it"
                  className="text-[#F86D16] underline"
                >
                  asscomunicare2013@libero.it
                </a>
              </li>
              <li>Tel: 338 5940445</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              3. Accettazione delle condizioni
            </h2>
            <p>
              L&apos;accesso e l&apos;utilizzo del Portale comportano l&apos;accettazione
              integrale dei presenti Termini e Condizioni. Se l&apos;utente non intende
              accettare le presenti condizioni, è invitato a non utilizzare il Portale.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              4. Condizioni per le attività listate
            </h2>
            <p>
              Le attività commerciali presenti sul Portale (ristoranti, agriturismi,
              caseifici, ecc.) sono inserite sulla base di un rapporto contrattuale con il
              Titolare del servizio. Le attività possono essere listate tramite:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Abbonamento:</strong> pagamento periodico per la presenza continuativa
                sul Portale con scheda informativa dedicata.
              </li>
              <li>
                <strong>Pagamento a contatto/prenotazione:</strong> compenso corrisposto al
                Titolare per ogni contatto o prenotazione generata attraverso il Portale.
              </li>
            </ul>
            <p className="mt-3">
              Il Portale non è responsabile della qualità dei prodotti o servizi offerti dalle
              attività listate. Ogni rapporto commerciale tra l&apos;utente e le attività
              presenti sul Portale è regolato dalle condizioni stabilite direttamente tra le
              parti.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              5. Responsabilità e limitazioni
            </h2>
            <p>
              Il Titolare si impegna a mantenere aggiornate le informazioni presenti sul
              Portale, ma non garantisce la completezza, l&apos;accuratezza o
              l&apos;aggiornamento costante dei contenuti.
            </p>
            <p className="mt-2">
              Il Titolare non è responsabile per:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Eventuali inesattezze o omissioni nelle informazioni fornite dalle attività
                listate.
              </li>
              <li>
                Danni diretti o indiretti derivanti dall&apos;utilizzo del Portale o
                dall&apos;impossibilità di accedervi.
              </li>
              <li>
                Contenuti di siti web esterni a cui il Portale potrebbe rimandare tramite
                link.
              </li>
              <li>
                Interruzioni o malfunzionamenti del servizio dovuti a cause tecniche o di
                forza maggiore.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              6. Proprietà intellettuale
            </h2>
            <p>
              Tutti i contenuti del Portale — inclusi testi, immagini, grafica, loghi, icone,
              software e layout — sono di proprietà del Titolare o dei rispettivi aventi
              diritto e sono protetti dalle leggi italiane e internazionali sul diritto
              d&apos;autore e sulla proprietà intellettuale.
            </p>
            <p className="mt-2">
              È vietata qualsiasi riproduzione, distribuzione, modifica o utilizzo commerciale
              dei contenuti del Portale senza autorizzazione scritta del Titolare.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              7. Modifiche alle condizioni
            </h2>
            <p>
              Il Titolare si riserva il diritto di modificare i presenti Termini e Condizioni
              in qualsiasi momento. Le modifiche saranno efficaci dalla data di pubblicazione
              su questa pagina. L&apos;utilizzo continuato del Portale dopo la pubblicazione
              delle modifiche costituisce accettazione delle nuove condizioni.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              8. Legge applicabile e foro competente
            </h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla legge italiana. Per
              qualsiasi controversia derivante dall&apos;interpretazione o
              dall&apos;esecuzione dei presenti Termini, sarà competente in via esclusiva il{" "}
              <strong>Tribunale di Salerno</strong>.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6 text-center text-xs text-stone-400">
          <Link href="/privacy-policy" className="underline hover:text-[#F86D16]">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/cookie-policy" className="underline hover:text-[#F86D16]">
            Cookie Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
