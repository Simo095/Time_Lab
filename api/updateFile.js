import { del, list, put } from "@vercel/blob";

export default async function updateFileHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const data = req.body;

  try {
    const filename = "Agnese/agnese.json";
    
    // Ottieni la lista dei file
    const { blobs } = await list();

    // Trova il file da eliminare
    const toDelete = blobs.find(el => el.pathname === filename);
    
    if (toDelete) {
      // Elimina il file se esiste
      await del(toDelete.url);
    }

    // Carica il nuovo file
    const blob = await put(filename, JSON.stringify(data), {
      access: "public",
    });

    return res
      .status(200)
      .json({ message: "File Added", data: blob });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del file:", error);
    return res.status(500).json({ error: error.message });
  }
}
