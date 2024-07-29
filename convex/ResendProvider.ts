import { EmailProvider } from "convex/auth";
import { Resend } from "resend";

export const ResendProvider = (options: {
  fromAddress: string;
  // Add any other options you need
}): EmailProvider => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  return {
    sendEmail: async (to, subject, body) => {
      await resend.emails.send({
        from: options.fromAddress,
        to,
        subject,
        html: body,
      });
    },
  };
};
