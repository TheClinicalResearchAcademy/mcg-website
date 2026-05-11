import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const resend = apiKey ? new Resend(apiKey) : null;

export async function sendAuthorizationCode(toEmail: string, code: string, name?: string): Promise<boolean> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — code not emailed:", { toEmail, code });
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: `Monache Consulting Group <${fromEmail}>`,
      to: toEmail,
      subject: "Your Authorization Code — Monache Consulting Group",
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111827;">
          <h2 style="color: #0F766E; margin-bottom: 16px;">Monache Consulting Group</h2>
          <p>Hello${name ? " " + name : ""},</p>
          <p>Your request to download the Monache Consulting Group one-pager has been approved. Use the authorization code below on the website:</p>
          <div style="background: #F3F4F6; border: 2px dashed #0F766E; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
            <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6B7280;">Authorization Code</p>
            <p style="margin: 8px 0 0; font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #0F766E;">${code}</p>
          </div>
          <p style="font-size: 14px; color: #6B7280;">This code is single-use and tied to this email address. Visit our About page and click "Download Our One-Pager" to use it.</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
          <p style="font-size: 12px; color: #9CA3AF;">Monache Consulting Group · Sites@monacheconsultinggroup.com</p>
        </div>
      `,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Send failed:", err);
    return false;
  }
}

export async function sendAccessRequestNotification(adminEmail: string, request: { name: string; email: string; company: string; role: string; reason?: string | null }): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: `MCG Website <${fromEmail}>`,
      to: adminEmail,
      subject: `New Access Request: ${request.name} (${request.company})`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #0F766E;">New One-Pager Access Request</h2>
          <p><strong>Name:</strong> ${request.name}</p>
          <p><strong>Email:</strong> ${request.email}</p>
          <p><strong>Company:</strong> ${request.company}</p>
          <p><strong>Role:</strong> ${request.role}</p>
          ${request.reason ? `<p><strong>Reason:</strong> ${request.reason}</p>` : ""}
          <p style="margin-top: 24px;">Visit the admin dashboard to approve and issue an authorization code.</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("[email] Admin notification failed:", err);
    return false;
  }
}
