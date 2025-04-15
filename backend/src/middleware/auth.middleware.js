/*
 * TODO: Implement authentication middleware logic in this file (auth.middleware.js).
 *
 * Steps:
 * 1. Import necessary modules:
 * - jsonwebtoken (for verifying tokens)
 * - User model (to fetch user details)
 * - Configuration (to get JWT secret)
 * - Error handling utility
 *
 * 2. Define the middleware function (e.g., `authenticateToken` or simply `protect`):
 * - It should accept `req`, `res`, `next` as arguments.
 * - Get the token from the request headers (usually `Authorization: Bearer <token>`).
 * - Check if the header exists and is correctly formatted. If not, return 401 Unauthorized error.
 * - Extract the token string.
 * - Use a try/catch block for JWT verification.
 * - Inside try:
 * - Verify the token using `jwt.verify(token, JWT_SECRET)`.
 * - The `verify` function will return the decoded payload (which should contain user ID).
 * - Find the user in the database using the ID from the decoded payload.
 * - If user not found, return 401 Unauthorized error.
 * - Attach the user object (or just user ID) to the request object (e.g., `req.user = user;`).
 * - Call `next()` to pass control to the next middleware or route handler.
 * - Inside catch (handles JWT errors like expired token, invalid signature):
 * - Return 401 Unauthorized or 403 Forbidden error.
 *
 * 3. Export the middleware function (e.g., `module.exports = authenticateToken;`).
 */
