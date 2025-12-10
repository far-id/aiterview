import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
].filter(Boolean);

const KEY_COUNT = GEMINI_KEYS.length;

if (KEY_COUNT === 0) {
  throw new Error("No Gemini API keys configured.")
}

export async function getCurrentKey() {
  const index = await redis.get<number>("gemini_key_index");
  return GEMINI_KEYS[index ?? 0];
}

export async function rotateKey() {
  const oldIndex = (await redis.get<number>("gemini_key_index")) ?? 0;
  const newIndex = (oldIndex + 1) % KEY_COUNT;
  await redis.set("gemini_key_index", newIndex);

  console.log(`Rotating Gemini Key : ${newIndex}`);

  return GEMINI_KEYS[newIndex];
}
