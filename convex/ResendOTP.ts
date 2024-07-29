import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";

export const ResendOTP = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "Al-Karkari Institute <access@karkari.org>",
      to: [email],
      subject: `Sign in to Al-Karkari Institute`,
      text: "Your code is " + token,
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(`Could not send: ${error.message}`);
    }
  },
});
