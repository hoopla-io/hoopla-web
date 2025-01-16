import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

interface NewsletterRequest {
  email: string;
}

export async function POST(req: Request) {
  try {
    const { email }: NewsletterRequest = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("newsletters").insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return NextResponse.json(
          { error: "Email already subscribed" },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Something went wrong", details: errorMessage },
      { status: 500 }
    );
  }
}
