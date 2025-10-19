export function GET() {
  const body = {
    name: "Cardster",
    short_name: "Cardster",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [],
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/manifest+json" } });
}


