import { google } from "googleapis";

import { NextApiRequest } from 'next';

export async function POST(req: NextApiRequest) {
  try {
    const { text, accessToken } = req.body;

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = { name: "user_text.txt" };
    const media = { mimeType: "text/plain", body: text };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });

    return Response.json({ success: true, fileId: file.data.id });
  } catch (error) {
    console.error("Google Drive API Error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
