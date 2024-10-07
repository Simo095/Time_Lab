import { list} from "@vercel/blob";

export const runtime = "edge";

export async function GET(request) {
  const { blobs } = await list();
  return Response.json(blobs.filter(el=>el.pathname==="Agnese/agnese.json"));
}
