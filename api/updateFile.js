import { list ,put} from "@vercel/blob";

export default async function updateFileHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const data = req.body;
  console.log(data)

  try {
    const filename = "agnese.json";
    // const blob = await put(filename, JSON.stringify(data), {
    //   access: "public",
    // });

    return res
      .status(200)
      .json({ message: "File updated successfully", url: blob.url });
  } catch (error) {
    return res.status(500).json({ error: req });
  }
}