import { generateKeyPairSync } from "crypto";
import fs from "fs";
import path from "path";


export async function POST(req) {
  const data = await req.json();

  try {
    // Genera un par de claves
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096, // Tamaño de la clave
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    const userFolder = path.join(process.cwd(), "keys", data["username"]);

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    console.log(publicKey)
    let send = await fetch("http://localhost:8080/public", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: data["username"], key: publicKey}),
    });

    if (send.ok) {
      fs.writeFileSync(path.join(userFolder, 'privateKey.pem'), privateKey);
      return new Response("Keys generated and saved!", {
        status: 200,
      })
    }
    throw new Error("Server cant store public key");
  } catch (error) {
    console.error(error);
    return new Response("Error generating keys", {
      status: 500,
    })
  }
}
