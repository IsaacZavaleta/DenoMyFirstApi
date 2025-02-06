import { dinosaurRoute } from "./Routes/route.ts";

async function handler(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const kv = await Deno.openKv();
    const body = request.body;

    return await dinosaurRoute(request, url, kv, body);
  } 
  
Deno.serve({ port: 4242 }, handler);