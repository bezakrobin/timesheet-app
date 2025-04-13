/*
 * TODO: Implement the change password route logic in this file
 *
 * Steps:
 * 1. Import the `express` library.
 * 2. Import the relevant controller function (e.g., `passwordController.changePassword`) from the controllers directory.
 * - Ensure the path to the controller is correct.
 * 3. Import the authentication middleware (e.g., `authMiddleware`) as this requires login.
 * - Ensure the path to the middleware is correct.
 * 4. Create an instance of the `express.Router()`.
 * 5. Define the `POST /` route:
 * - This route allows an authenticated user to change their password.
 * - Apply the authentication middleware.
 * - It should call the appropriate controller function (e.g., `passwordController.changePassword`).
 * - Add comments explaining the route, access level (Private),
 * expected input ({ currentPassword, newPassword }), and potential responses (success message).
 * 6. Export the router instance using `module.exports`.
 *
 * Note: Mount this router under /api/auth/change-password in your main app.
 */
