/*
 * TODO: Implement the email verification route logic in this file
 *
 * Steps:
 * 1. Import the `express` library.
 * 2. Import the relevant controller function (e.g., `authController.verifyEmail`) from the controllers directory.
 * - Ensure the path to the controller is correct.
 * 3. Create an instance of the `express.Router()`.
 * 4. Define the `GET /:token` route:
 * - This route handles the link clicked by the user in the verification email.
 * - It should call the appropriate controller function (e.g., `authController.verifyEmail`), passing the token.
 * - Add comments explaining the route, access level (Public, token validates), expected params (token),
 * and potential responses (success message or redirect).
 * 5. Export the router instance using `module.exports`.
 *
 * Note: Mount this router under /api/auth/verify-email in your main app.
 */
