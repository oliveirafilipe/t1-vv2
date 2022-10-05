import crypto from "crypto";

export function generateRandomId(): string {
  return crypto.randomUUID();
}
