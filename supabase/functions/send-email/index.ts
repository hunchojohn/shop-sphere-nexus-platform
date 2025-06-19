
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'login_reminder' | 'password_reset';
  email: string;
  name?: string;
  resetLink?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, name, resetLink }: EmailRequest = await req.json();
    console.log(`Sending ${type} email to ${email}`);

    let emailResponse;

    if (type === 'login_reminder') {
      emailResponse = await resend.emails.send({
        from: "BeiPoaHub <onboarding@resend.dev>",
        to: [email],
        subject: "We miss you! Come back to BeiPoaHub",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #ea580c; text-align: center;">We Miss You!</h1>
            <p>Hi ${name || 'there'},</p>
            <p>We noticed you haven't logged into your BeiPoaHub account in a while. We have some exciting new products and deals waiting for you!</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}/auth" 
                 style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Sign In Now
              </a>
            </div>
            <p>Don't miss out on:</p>
            <ul>
              <li>New shoe collections</li>
              <li>Exclusive member discounts</li>
              <li>Early access to sales</li>
            </ul>
            <p>Best regards,<br>The BeiPoaHub Team</p>
          </div>
        `,
      });
    } else if (type === 'password_reset') {
      emailResponse = await resend.emails.send({
        from: "BeiPoaHub <onboarding@resend.dev>",
        to: [email],
        subject: "Reset your BeiPoaHub password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #ea580c; text-align: center;">Reset Your Password</h1>
            <p>Hi ${name || 'there'},</p>
            <p>You requested to reset your password for your BeiPoaHub account. Click the button below to create a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this password reset, you can safely ignore this email.</p>
            <p>Best regards,<br>The BeiPoaHub Team</p>
          </div>
        `,
      });
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
