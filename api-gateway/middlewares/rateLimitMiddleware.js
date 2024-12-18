import rateLimit from "express-rate-limit";

const createRateLimiter = (options) => {
  const limiter = rateLimit({
    ...options,
    message: "Too many requests from this IP. Try again in 10 seconds.",
  });

  return (req, res, next) => {
    limiter(req, res, next);
  };
};

export const rateLimitMiddleware = createRateLimiter({
  windowMs: 1000 * 10,
  max: 5,
});
