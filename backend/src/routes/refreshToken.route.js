/*
 * TODO: Implement the refresh token route logic in this file
 *
 * Steps:
 * 1. Import the `express` library.
 * 2. Import the relevant controller function (e.g., `authController.refreshToken`) from the controllers directory.
 * - Ensure the path to the controller is correct.
 * 3. Create an instance of the `express.Router()`.
 * 4. Define the `POST /` route:
 * - This route should handle issuing a new access token using a valid refresh token.
 * - It should call the appropriate controller function (e.g., `authController.refreshToken`).
 * - Add comments explaining the route, access level (Public, but requires valid refresh token),
 * expected input (refresh token, often via cookie or body), and potential responses (new access token).
 * - Note: Typically does *not* use standard auth middleware. Validation is based on the refresh token itself.
 * 5. Export the router instance using `module.exports`.
 *
 * Note: Mount this router under /api/auth/refresh-token in your main app.
 */
