import crypto from "crypto";

export function generateApiKey() {
    // Generate 32 cryptographically secure random bytes
    const randomBytes = crypto.randomBytes(32);
    // Convert bytes to a base64 encoded string (human-readable)
    const apiKey = randomBytes.toString("base64");
    return apiKey;
}