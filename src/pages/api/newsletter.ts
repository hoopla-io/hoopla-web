import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // process.env, not import.meta.env: Vite inlines the latter at build time,
  // which would bake secrets (or undefined) into the bundle.
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { error: "Newsletter is not configured" },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("newsletters").insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        return Response.json(
          { error: "Email already subscribed" },
          { status: 400 }
        );
      }
      throw error;
    }

    return Response.json({ message: "Successfully subscribed!" }, { status: 201 });
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
