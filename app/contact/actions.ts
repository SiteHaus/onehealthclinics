"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!firstName || !email || !message) {
    return { status: "error", message: "Please fill out all required fields." };
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    return { status: "error", message: "Contact form is not configured." };
  }

  try {
    await resend.emails.send({
      from: "OneHealth Clinics <contact@notify.sitehaus.dev>",
      to,
      replyTo: email,
      subject: `New message from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}\n${message}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
        <hr />
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    return { status: "success" };
  } catch {
    return { status: "error", message: "Failed to send message. Please try again." };
  }
}
