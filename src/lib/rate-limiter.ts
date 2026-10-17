/**
 * In-Memory IP Rate Limiter
 * Limits abusive or spam submissions per IP address.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): { allowed: boolean; remaining: number; resetInMinutes: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // If no record or window expired, reset
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInMinutes: Math.round(windowMs / 60000),
    };
  }

  // If over limit
  if (record.count >= maxRequests) {
    const minutesLeft = Math.ceil((record.resetTime - now) / 60000);
    return {
      allowed: false,
      remaining: 0,
      resetInMinutes: minutesLeft,
    };
  }

  // Increment within window
  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInMinutes: Math.ceil((record.resetTime - now) / 60000),
  };
}
