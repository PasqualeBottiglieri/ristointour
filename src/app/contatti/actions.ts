"use server";

import { Resend } from "resend";

interface ContactFormState {
  success: boolean;
  error: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot check
  if (formData.get("website")) {
    // Bot filled the hidden field — pretend success
    return { success: true, error: null };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || "";
  const subject = (formData.get("subject") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  // Validation
  if (!name) {
    return { success: false, error: "Il nome è obbligatorio." };
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return { success: false, error: "Inserisci un indirizzo email valido." };
  }
  if (!message) {
    return { success: false, error: "Il messaggio non può essere vuoto." };
  }

  const toEmailRaw = process.env.CONTACT_FORM_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!toEmailRaw || !apiKey) {
    console.error("Missing env: CONTACT_FORM_TO_EMAIL or RESEND_API_KEY");
    return {
      success: false,
      error: "Configurazione email mancante. Riprova più tardi.",
    };
  }

  // Support multiple recipients separated by comma
  const toEmails = toEmailRaw.split(",").map((e) => e.trim()).filter(Boolean);

  const resend = new Resend(apiKey);
  const now = new Date().toLocaleString("it-IT", {
    timeZone: "Europe/Rome",
    dateStyle: "full",
    timeStyle: "short",
  });

  const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
  <div style="background: #f86d16; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">Nuovo messaggio da Ristointour</h1>
  </div>
  <div style="background: #fafaf9; padding: 32px; border: 1px solid #e7e5e4; border-top: none; border-radius: 0 0 12px 12px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; width: 120px; vertical-align: top;">Nome</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; font-size: 15px;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #f86d16;">${escapeHtml(email)}</a></td>
      </tr>
      ${phone ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Telefono</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; font-size: 15px;"><a href="tel:${escapeHtml(phone)}" style="color: #f86d16;">${escapeHtml(phone)}</a></td>
      </tr>
      ` : ""}
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Oggetto</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; font-size: 15px;">${escapeHtml(subject || "Informazioni generali")}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; color: #78716c; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Messaggio</td>
        <td style="padding: 12px 0; font-size: 15px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</td>
      </tr>
    </table>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e7e5e4; color: #a8a29e; font-size: 12px;">
      Pagina origine: /contatti &middot; Inviato il ${escapeHtml(now)}
    </div>
  </div>
</div>`;

  try {
    // Send a separate email to each recipient so they don't see each other
    const results = await Promise.all(
      toEmails.map((recipient) =>
        resend.emails.send({
          from: "Ristointour <contatti@ristointour.it>",
          to: recipient,
          replyTo: email,
          subject: `Ristointour Contatti: ${subject || "Informazioni generali"}`,
          html: htmlBody,
        })
      )
    );

    const failed = results.find((r) => r.error);
    if (failed?.error) {
      console.error("Resend error:", JSON.stringify(failed.error, null, 2));
      return {
        success: false,
        error: "Errore nell'invio dell'email. Riprova più tardi.",
      };
    }

    // Confirmation email to sender
    await resend.emails.send({
      from: "Ristointour <contatti@ristointour.it>",
      to: email,
      subject: "Abbiamo ricevuto il tuo messaggio — Ristointour",
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
  <div style="background: #f86d16; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">Grazie per averci contattato!</h1>
  </div>
  <div style="background: #fafaf9; padding: 32px; border: 1px solid #e7e5e4; border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">Ciao <strong>${escapeHtml(name)}</strong>,</p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.</p>
    <div style="background: #f5f5f4; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="font-size: 13px; color: #78716c; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Riepilogo del tuo messaggio</p>
      <p style="font-size: 14px; margin: 0 0 4px;"><strong>Oggetto:</strong> ${escapeHtml(subject || "Informazioni generali")}</p>
      <p style="font-size: 14px; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
    <p style="font-size: 14px; color: #78716c; margin: 0;">A presto,<br><strong style="color: #1c1917;">Il team Ristointour</strong></p>
  </div>
</div>`,
    }).catch((err) => {
      // Don't fail the whole submission if confirmation email fails
      console.error("Confirmation email error:", err);
    });

    return { success: true, error: null };
  } catch (err) {
    console.error("Email send error:", err);
    return {
      success: false,
      error: "Errore nell'invio dell'email. Riprova più tardi.",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
