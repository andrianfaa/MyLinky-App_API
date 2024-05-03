import { generateKeyPairSync } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

(() => {
  const env = process.env.NODE_ENV || "development";
  const keyFolder =
    env === "development"
      ? path.resolve(process.cwd(), "src", "keys")
      : path.resolve(process.cwd(), "build", "src", "keys");

  if (!existsSync(keyFolder)) {
    mkdirSync(keyFolder, { recursive: true });
  }

  if (!existsSync(path.resolve(keyFolder, "password.key"))) {
    const { privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      }
    });

    writeFileSync(path.resolve(keyFolder, "password.key"), privateKey);
  }

  console.log(`Setup ${env} environment successfully`);
})();
