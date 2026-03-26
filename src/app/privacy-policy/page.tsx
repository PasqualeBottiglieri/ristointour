import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sulla privacy di Ristointour.it — Trattamento dei dati personali ai sensi del GDPR e del D.Lgs. 196/2003.",
openGraph: {
  title: "Privacy Policy — ristointour.it",
},
};

const sections = [
  { id: "titolare", label: "Titolare del trattamento" },
  { id: "tipologie-dati", label: "Tipologie di dati raccolti" },
  { id: "finalita", label: "Finalità del trattamento" },
  { id: "base-giuridica", label: "Base giuridica" },
  { id: "modalita", label: "Modalità di trattamento" },
  { id: "conservazione", label: "Periodo di conservazione" },
  { id: "terze-parti", label: "Condivisione con terze parti" },
  { id: "trasferimento", label: "Trasferimento dati extra-UE" },
  { id: "diritti", label: "Diritti dell'interessato" },
  { id: "modifiche", label: "Modifiche alla presente informativa" },
  { id: "contatti", label: "Contatti" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-stone-50 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-2 font-serif text-4xl font-bold text-emerald-950">
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-stone-500">
          Ultimo aggiornamento: 26 marzo 2026
        </p>

        {/* Indice */}
        <nav
          aria-label="Indice sezioni privacy policy"
          className="mb-12 rounded-xl border border-stone-200 bg-white p-6"
        >
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F86D16]">
            Indice
          </h2>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-emerald-900">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="underline decoration-stone-300 hover:decoration-[#F86D16]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-10 text-sm leading-relaxed text-stone-700">
          {/* 1 */}
          <section id="titolare">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              1. Titolare del trattamento
            </h2>
            <p>
              Il Titolare del trattamento dei dati personali è:
            </p>
            <ul className="mt-3 list-none space-y-1 rounded-lg bg-white p-4 border border-stone-200">
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
              <li className="pt-2">
                <strong>Referente privacy:</strong> Nigro Giovanni (Presidente)
                —{" "}
                <a
                  href="mailto:giovanninigro21@libero.it"
                  className="text-[#F86D16] underline"
                >
                  giovanninigro21@libero.it
                </a>
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section id="tipologie-dati">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              2. Tipologie di dati raccolti
            </h2>
            <p>Il sito può raccogliere le seguenti categorie di dati personali:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema
                operativo, pagine visitate, orario di accesso. Questi dati vengono raccolti
                automaticamente dai sistemi informatici del sito.
              </li>
              <li>
                <strong>Cookie:</strong> cookie tecnici necessari al funzionamento del sito
                ed eventuali cookie analitici di terze parti. Per maggiori dettagli,
                consultare la{" "}
                <Link href="/cookie-policy" className="text-[#F86D16] underline">
                  Cookie Policy
                </Link>
                .
              </li>
              <li>
                <strong>Dati forniti volontariamente:</strong> nome, cognome, indirizzo
                e-mail, numero di telefono e qualsiasi altra informazione comunicata
                dall&apos;utente tramite il modulo di contatto o attraverso canali diretti
                (email, WhatsApp, telefono).
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section id="finalita">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              3. Finalità del trattamento
            </h2>
            <p>I dati personali sono trattati per le seguenti finalità:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Gestione delle richieste di contatto:</strong> rispondere alle
                comunicazioni ricevute tramite il modulo di contatto, email, WhatsApp o
                telefono.
              </li>
              <li>
                <strong>Erogazione del servizio:</strong> funzionamento del portale
                ristointour.it, che consente agli utenti di scoprire ristoranti, agriturismi,
                caseifici ed esperienze nella Piana del Sele.
              </li>
              <li>
                <strong>Comunicazioni informative:</strong> invio di eventuali comunicazioni
                relative al servizio o a novità del portale, previo consenso dell&apos;utente.
              </li>
              <li>
                <strong>Analisi statistiche:</strong> monitoraggio anonimo e aggregato
                dell&apos;utilizzo del sito per migliorarne le funzionalità.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section id="base-giuridica">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              4. Base giuridica del trattamento
            </h2>
            <p>Il trattamento dei dati si basa su:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Consenso (Art. 6, par. 1, lett. a GDPR):</strong> per l&apos;invio
                di comunicazioni informative e per l&apos;utilizzo di cookie analitici.
              </li>
              <li>
                <strong>Esecuzione di un contratto o misure precontrattuali (Art. 6, par. 1,
                lett. b GDPR):</strong>{" "}
                per la gestione delle richieste di contatto e l&apos;erogazione del servizio.
              </li>
              <li>
                <strong>Legittimo interesse (Art. 6, par. 1, lett. f GDPR):</strong> per
                garantire la sicurezza e il corretto funzionamento del sito, nonché per
                analisi statistiche aggregate.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section id="modalita">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              5. Modalità di trattamento
            </h2>
            <p>
              I dati personali sono trattati con strumenti informatici e/o telematici, con
              logiche strettamente correlate alle finalità sopra indicate e, comunque, in modo
              da garantire la sicurezza e la riservatezza dei dati stessi, nel rispetto delle
              misure organizzative, fisiche e logiche previste dalle disposizioni vigenti.
            </p>
          </section>

          {/* 6 */}
          <section id="conservazione">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              6. Periodo di conservazione
            </h2>
            <p>
              I dati personali forniti tramite il modulo di contatto o altri canali di
              comunicazione saranno conservati per il tempo strettamente necessario a
              rispondere alla richiesta dell&apos;utente e successivamente cancellati.
            </p>
            <p className="mt-2">
              I dati di navigazione vengono conservati per il tempo necessario alle finalità
              statistiche e successivamente anonimizzati.
            </p>
          </section>

          {/* 7 */}
          <section id="terze-parti">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              7. Condivisione con terze parti
            </h2>
            <p>
              I dati personali potranno essere comunicati a:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Google LLC</strong> — tramite Google Analytics, per finalità di
                analisi statistica del traffico web (previo consenso dell&apos;utente).
              </li>
              <li>
                <strong>Fornitori di servizi tecnici</strong> — hosting, manutenzione del
                sito, che agiscono in qualità di responsabili del trattamento ai sensi
                dell&apos;Art. 28 GDPR.
              </li>
            </ul>
            <p className="mt-3">
              I dati non saranno in alcun caso venduti, ceduti o diffusi a terzi per finalità
              di marketing senza il consenso esplicito dell&apos;utente.
            </p>
          </section>

          {/* 8 */}
          <section id="trasferimento">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              8. Trasferimento dati extra-UE
            </h2>
            <p>
              Qualora il sito utilizzi servizi di Google Analytics, i dati potranno essere
              trasferiti verso i server di Google situati negli Stati Uniti. Google aderisce al
              EU-US Data Privacy Framework, garantendo un livello adeguato di protezione dei
              dati ai sensi dell&apos;Art. 45 GDPR.
            </p>
          </section>

          {/* 9 */}
          <section id="diritti">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              9. Diritti dell&apos;interessato
            </h2>
            <p>
              Ai sensi degli Artt. 15-22 del GDPR, l&apos;utente ha il diritto di:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Accesso:</strong> ottenere conferma dell&apos;esistenza di un
                trattamento e accedere ai propri dati personali.
              </li>
              <li>
                <strong>Rettifica:</strong> richiedere la correzione di dati inesatti o
                l&apos;integrazione di dati incompleti.
              </li>
              <li>
                <strong>Cancellazione:</strong> richiedere la cancellazione dei propri dati
                personali nei casi previsti dalla legge.
              </li>
              <li>
                <strong>Limitazione:</strong> richiedere la limitazione del trattamento in
                determinate circostanze.
              </li>
              <li>
                <strong>Portabilità:</strong> ricevere i propri dati in formato strutturato,
                di uso comune e leggibile da dispositivo automatico.
              </li>
              <li>
                <strong>Opposizione:</strong> opporsi al trattamento dei dati per motivi
                legittimi.
              </li>
              <li>
                <strong>Reclamo:</strong> proporre reclamo all&apos;Autorità Garante per la
                Protezione dei Dati Personali (
                <a
                  href="https://www.garanteprivacy.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F86D16] underline"
                >
                  www.garanteprivacy.it
                </a>
                ).
              </li>
            </ul>
          </section>

          {/* 10 */}
          <section id="modifiche">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              10. Modifiche alla presente informativa
            </h2>
            <p>
              Il Titolare si riserva il diritto di apportare modifiche alla presente
              informativa in qualsiasi momento. Si consiglia di consultare regolarmente questa
              pagina per essere aggiornati sulle eventuali modifiche.
            </p>
          </section>

          {/* 11 */}
          <section id="contatti">
            <h2 className="mb-3 font-serif text-xl font-bold text-emerald-950">
              11. Contatti
            </h2>
            <p>
              Per esercitare i propri diritti o per qualsiasi domanda relativa al trattamento
              dei dati personali, è possibile contattare il Titolare ai seguenti recapiti:
            </p>
            <ul className="mt-3 list-none space-y-1 rounded-lg bg-white p-4 border border-stone-200">
              <li>
                <strong>Email privacy:</strong>{" "}
                <a
                  href="mailto:giovanninigro21@libero.it"
                  className="text-[#F86D16] underline"
                >
                  giovanninigro21@libero.it
                </a>
              </li>
              <li>
                <strong>PEC:</strong>{" "}
                <a href="mailto:asscomunicare@pec.it" className="text-[#F86D16] underline">
                  asscomunicare@pec.it
                </a>
              </li>
              <li>
                <strong>Telefono:</strong> 338 5940445
              </li>
              <li>
                <strong>Sede:</strong> Via Sant&apos;Antonio n. 5, 84025 Eboli (SA)
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6 text-center text-xs text-stone-400">
          <Link href="/cookie-policy" className="underline hover:text-[#F86D16]">
            Cookie Policy
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
