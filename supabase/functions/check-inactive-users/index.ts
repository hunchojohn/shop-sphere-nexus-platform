
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Checking for inactive users...");

    // Get users who haven't logged in for 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const { data: inactiveUsers, error } = await supabase
      .from('user_activity')
      .select(`
        user_id,
        last_login,
        profiles!inner(first_name)
      `)
      .lt('last_login', threeDaysAgo.toISOString());

    if (error) {
      console.error("Error fetching inactive users:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Found ${inactiveUsers?.length || 0} inactive users`);

    // Send email reminders
    for (const user of inactiveUsers || []) {
      // Get user email from auth.users
      const { data: authUser } = await supabase.auth.admin.getUserById(user.user_id);
      
      if (authUser.user?.email) {
        // Call send-email function
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify({
            type: 'login_reminder',
            email: authUser.user.email,
            name: user.profiles?.first_name || 'there',
          }),
        });

        console.log(`Sent login reminder to ${authUser.user.email}`);
      }
    }

    return new Response(JSON.stringify({ 
      message: `Processed ${inactiveUsers?.length || 0} inactive users` 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in check-inactive-users function:", error);
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
