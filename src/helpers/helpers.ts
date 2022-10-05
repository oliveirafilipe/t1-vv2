import { v4 } from "uuid";

export function generateRandomId(): string {
  return v4();
}
