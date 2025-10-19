import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const supabaseServer = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // In Server Components, cookies are read-only; set/remove must be no-ops
        set(_name: string, _value: string, _options: any) {},
        remove(_name: string, _options: any) {},
      },
    }
  );
};


