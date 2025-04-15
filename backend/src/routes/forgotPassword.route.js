/*
 * TODO: Implement the forgot password route logic in this file
 *
 * Steps:
 * 1. Import the `express` library.
 * 2. Import the relevant controller function (e.g., `passwordController.forgotPassword`) from the controllers directory.
 * - Ensure the path to the controller is correct.
 * 3. Create an instance of the `express.Router()`.
 * 4. Define the `POST /` route:
 * - This route should handle the initiation of the password reset process (generate token, send email).
 * - It should call the appropriate controller function (e.g., `passwordController.forgotPassword`).
 * - Add comments explaining the route, access level (Public), expected input ({ email: string }),
 * and potential responses (generic success message).
 * 5. Export the router instance using `module.exports`.
 *
 * Note: Mount this router under /api/auth/forgot-password in your main app.
 */
