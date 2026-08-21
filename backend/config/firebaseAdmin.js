import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
  path.join(__dirname, "../firebase-service-account.json");

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
const app = initializeApp({ credential: cert(serviceAccount) });

export const db = getFirestore(app);
export const auth = getAuth(app);
