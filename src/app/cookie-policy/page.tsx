import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy di Ristointour.it — Informazioni sui cookie utilizzati, come gestirli e come revocare il consenso.",
openGraph: {
  title: "Cookie Policy — ristointour.it",
},
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-stone-50 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-2 font-serif text-4xl font-bold text-emerald-950">
          Cookie Policy
        </h1>
        <p className="mb-10 text-sm text-stone-500">
          Ultimo aggiornamento: 26 marzo 2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-stone-700">
          {/* Cosa sono i cookie */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              Cosa sono i cookie
            </h2>
            <p>
              I cookie sono piccoli file di testo che i siti web visitati inviano al browser
              dell&apos;utente, dove vengono memorizzati per essere poi ritrasmessi agli
              stessi siti alla visita successiva. I cookie sono utilizzati per diverse
              finalità, hanno caratteristiche diverse e possono essere utilizzati sia dal
              titolare del sito che da terze parti.
            </p>
          </section>

          {/* Cookie utilizzati */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              Cookie utilizzati su questo sito
            </h2>
            <p className="mb-4">
              Di seguito la tabella riepilogativa dei cookie utilizzati su ristointour.it:
            </p>

            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-950 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nome</th>
                    <th className="px-4 py-3 font-semibold">Fornitore</th>
                    <th className="px-4 py-3 font-semibold">Finalità</th>
                    <th className="px-4 py-3 font-semibold">Durata</th>
                    <th className="px-4 py-3 font-semibold">Tipo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-mono">cookie_consent</td>
                    <td className="px-4 py-3">ristointour.it</td>
                    <td className="px-4 py-3">
                      Memorizza le preferenze di consenso cookie dell&apos;utente
                    </td>
                    <td className="px-4 py-3">365 giorni</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-800">
                        Tecnico
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono">_ga</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">
                      Distingue gli utenti per analisi statistiche aggregate
                    </td>
                    <td className="px-4 py-3">2 anni</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-800">
                        Analitico
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono">_ga_*</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">
                      Mantiene lo stato della sessione di analisi
                    </td>
                    <td className="px-4 py-3">2 anni</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-800">
                        Analitico
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cookie tecnici */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              Cookie tecnici (necessari)
            </h2>
            <p>
              I cookie tecnici sono essenziali per il corretto funzionamento del sito. Essi
              consentono la navigazione e l&apos;utilizzo delle funzionalità di base.
              L&apos;installazione di questi cookie non richiede il consenso dell&apos;utente
              ai sensi dell&apos;Art. 122 del D.Lgs. 196/2003. Il cookie{" "}
              <code className="rounded bg-stone-100 px-1.5 py-0.5">cookie_consent</code>{" "}
              rientra in questa categoria in quanto necessario a memorizzare le scelte di
              consenso dell&apos;utente.
            </p>
          </section>

          {/* Cookie analitici */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              Cookie analitici di terze parti
            </h2>
            <p>
              Il sito utilizza Google Analytics, un servizio di analisi web fornito da Google
              LLC. Google Analytics utilizza cookie per raccogliere informazioni in forma
              aggregata sull&apos;utilizzo del sito (numero di visitatori, pagine visitate,
              tempo di permanenza). Questi dati vengono utilizzati esclusivamente per
              migliorare il servizio offerto dal portale.
            </p>
            <p className="mt-2">
              I cookie analitici sono installati solo previo consenso esplicito dell&apos;utente
              tramite il banner cookie. Per maggiori informazioni sulle politiche di privacy di
              Google:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F86D16] underline"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          {/* Come disabilitare */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              Come disabilitare i cookie dal browser
            </h2>
            <p className="mb-4">
              È possibile gestire le preferenze sui cookie direttamente dal proprio browser.
              Di seguito le istruzioni per i principali browser:
            </p>
            <ul className="space-y-3 pl-5 list-disc">
              <li>
                <strong>Google Chrome:</strong> Menu → Impostazioni → Privacy e sicurezza →
                Cookie e altri dati dei siti
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Menu → Impostazioni → Privacy e sicurezza
                → Cookie e dati dei siti web
              </li>
              <li>
                <strong>Safari:</strong> Preferenze → Privacy → Gestisci dati siti web
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Menu → Impostazioni → Cookie e autorizzazioni
                sito → Cookie e dati archiviati
              </li>
            </ul>
            <p className="mt-3">
              La disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento di
              alcune funzionalità del sito.
            </p>
          </section>

          {/* Revoca consenso */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              Come revocare il consenso
            </h2>
            <p>
              L&apos;utente può revocare il consenso ai cookie in qualsiasi momento
              eliminando il cookie{" "}
              <code className="rounded bg-stone-100 px-1.5 py-0.5">cookie_consent</code>{" "}
              dal proprio browser. Al successivo accesso al sito, il banner cookie verrà
              nuovamente visualizzato, permettendo di esprimere nuove preferenze.
            </p>
            <p className="mt-2">
              In alternativa, è possibile cancellare tutti i cookie del sito dalle impostazioni
              del browser seguendo le istruzioni nella sezione precedente.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6 text-center text-xs text-stone-400">
          <Link href="/privacy-policy" className="underline hover:text-[#F86D16]">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/termini-condizioni" className="underline hover:text-[#F86D16]">
            Termini e Condizioni
          </Link>
        </div>
      </div>
    </main>
  );
}
