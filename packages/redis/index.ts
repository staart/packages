import { config } from "dotenv";
import { createHandyClient } from "handy-redis";
import { URL } from "url";
import RedisSMQ from "rsmq";

config();

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const parsedUrl = new URL(REDIS_URL);

const host = parsedUrl.hostname || "127.0.0.1";
const port = Number(parsedUrl.port || 6379);
const password = parsedUrl.password
  ? decodeURIComponent(parsedUrl.password)
  : undefined;

/**
 * Redis queue for messages
 */
export const redisQueue: RedisSMQ = new (RedisSMQ as any)({
  host,
  port,
  password
});

/**
 * Redis client
 */
const redis = createHandyClient({
  url: REDIS_URL,
  retry_strategy: options => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      console.error("Redis connection failed", "Server refused the connection");
    }

    if (options.total_retry_time > 1000 * 60 * 60) {
      console.error("Redis connection failed", "Total retry time exhausted");
    }

    if (options.attempt > 10) {
      console.error(
        "Redis connection failed",
        "Max number of attempts exceeded"
      );
      return 43200;
    }

    // Reconnect after this time
    return Math.min(options.attempt * 100, 3000);
  }
});

export default redis;
