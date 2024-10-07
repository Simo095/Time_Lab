import { list} from "@vercel/blob";

export const runtime = "edge";

export async function getList(request) {
  const { blobs } = await list();
  return Response.json(blobs);
}
