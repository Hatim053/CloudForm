// in memory sliding windows : fine for one server instance. With several instances (or serverless) the counters
// are per instance , so move them to Redis or the database before relying on them
class SlidingWindowLimiter {
  constructor(limit , windowMs , now = () => Date.now()) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.now = now;
    this.hits = new Map();
  }

  recent(key) {
    const cutoff = this.now() - this.windowMs;
    const list = (this.hits.get(key) ?? []).filter((time) => time > cutoff);
    if(list.length > 0) this.hits.set(key , list);
    else this.hits.delete(key); // idle keys do not pile up
    return list;
  }

  // would one more request fit ? (nothing is counted yet)
  peek(key = "global") {
    const list = this.recent(key);
    if(list.length >= this.limit) return { allowed : false , retryAfterMs : Math.max(0 , list[0] + this.windowMs - this.now()) };
    return { allowed : true , retryAfterMs : 0 };
  }

  record(key = "global") {
    const list = this.recent(key);
    list.push(this.now());
    this.hits.set(key , list);
  }
}

// a request is only counted when EVERY limit lets it through , so being refused by the global limit never costs a user a slot
const createAcquire = (limiters) => (userId) => {
  const checks = limiters.map(({ limiter , perUser }) => [limiter , perUser ? String(userId) : "global"]);
  for(const [limiter , key] of checks) {
    const result = limiter.peek(key);
    if(!result.allowed) return result;
  }
  checks.forEach(([limiter , key]) => limiter.record(key));
  return { allowed : true , retryAfterMs : 0 };
};

const numberFrom = (value , fallback) => (Number(value) > 0 ? Number(value) : fallback);

const createDefaultAcquire = (env = process.env) => createAcquire([
  { limiter : new SlidingWindowLimiter(numberFrom(env.AI_USER_MAX_PER_HOUR , 20) , 60 * 60 * 1000) , perUser : true },
  { limiter : new SlidingWindowLimiter(numberFrom(env.AI_MAX_PER_MINUTE , 6) , 60 * 1000) , perUser : false },
  { limiter : new SlidingWindowLimiter(numberFrom(env.AI_MAX_PER_DAY , 500) , 24 * 60 * 60 * 1000) , perUser : false }
]);

export { SlidingWindowLimiter , createAcquire , createDefaultAcquire };