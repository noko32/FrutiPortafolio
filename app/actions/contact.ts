"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Rate limiter (in-memory, per IP) ──

const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const hits = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count++;
  return false;
}

// ── Action ──

export type ContactState = {
  success: boolean;
  error: string | null;
};

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Rate limit by IP
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  // Honeypot — bots fill this hidden field, real users don't
  const honeypot = (formData.get("website") as string) ?? "";
  if (honeypot) {
    return { success: true, error: null };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  // Length caps
  if (name.length > 100) {
    return { success: false, error: "Name must be 100 characters or less." };
  }
  if (email.length > 320) {
    return { success: false, error: "Email address is too long." };
  }
  if (message.length > 5000) {
    return { success: false, error: "Message must be 5,000 characters or less." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { success: false, error: "Message must be at least 10 characters." };
  }

  // Sanitize name to prevent header injection
  const safeName = name.replace(/[\r\n]/g, "");

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "pablocesararmenta@gmail.com",
      replyTo: email,
      subject: `Portfolio contact from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send message. Please try emailing me directly." };
    }

    return { success: true, error: null };
  } catch (e) {
    console.error("Contact form error:", e);
    return { success: false, error: "Something went wrong. Please try emailing me directly." };
  }
}
