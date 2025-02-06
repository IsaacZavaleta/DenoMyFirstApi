import { Dinosaur } from "../Interfaces/dinosaurs.ts";


export async function dinosaurRoute(
  request: Request,
  url: URL,
  kv: Deno.Kv,
  body: ReadableStream<Uint8Array> | null
): Promise<Response> {
  

  if (url.pathname === "/dinosaur" && request.method === "GET") {
    const result = await kv.get(["dinosaur"]);
    return new Response(JSON.stringify({ data: result.value }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.pathname === "/dinosaur" && request.method === "POST" && body != null) {
    const myDinosaur = body;
    const result = await kv.set(["dinosaur"], myDinosaur);
    return new Response(JSON.stringify({ data: result }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.pathname === "/dinosaur" && request.method === "PUT" && body != null) {
    const result = await kv.get(["dinosaur", 1]);
    const updatedDinosaur = {
      name: "Jane Doe",
    };
    await kv.set(["dinosaur", 1], updatedDinosaur);
    if (result.value) {
    return new Response(JSON.stringify({ message: "PUT" }), {
      headers: { "Content-Type": "application/json" },
    });
  }else{
    return new Response('404: No found')
  }
  }

  return new Response("Not Found", { status: 404 });
}
