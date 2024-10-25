export const userSignup = `
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User Signup
 *     description: Register a new user. An OTP will be sent for email verification.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user (e.g., "John Doe").
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: Email address of the user.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Password for the user.
 *                 example: "mypassword123"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user created successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                 access_token:
 *                   type: string
 *                   description: JWT access token for authentication.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       409:
 *         description: Conflict - User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */`;

export const verifyEmail = `
/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify Email
 *     description: Verify a user's email using a token and OTP. Marks the user as verified if successful.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The token provided for email verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: integer
 *                 description: One-time password sent to the user's email.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email successfully verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful email verification"
 *       400:
 *         description: Invalid OTP or OTP has expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid OTP" 
 *       401:
 *         description: Unauthorized - Invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid token"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */`;

export const requestOTP = `
 /**
 * @swagger
 * /auth/request-otp:
 *   post:
 *     summary: Request OTP
 *     description: Generates and sends a new OTP to the user's email. The OTP is valid for 10 minutes.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The token provided for email verification
 *     responses:
 *       200:
 *         description: OTP successfully sent to user email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP successfully sent to user email"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Unauthorized - Invalid or expired access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid access token"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
 `;

export const verifyOTP = `
 **
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the user's OTP. If valid, the OTP is cleared from the user's record.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: integer
 *                 description: One-time password sent to the user's email.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP successfully verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully verified OTP"
 *       400:
 *         description: Invalid or expired OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid OTP"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
 `;

export const signin = `
 /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Sign-in
 *     description: Authenticates a user with email and password. Returns an access token if credentials are valid.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User successfully signed in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User signed in successfully"
 *                 user:
 *                   type: object
 *                   description: User details.
 *                 access_token:
 *                   type: string
 *                   description: JWT access token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: User email not verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User email is not verified"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not a signed up user"
 *       409:
 *         description: Incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incorrect password"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
`;

export const forgotPassword = `
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request Password Reset
 *     description: Sends a one-time password (OTP) to the user's email for password reset. Returns a token for further operations.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Email successfully sent with OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email successfully sent"
 *                 token:
 *                   type: string
 *                   description: JWT token for password reset operations.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
`;

export const resetPassword = `
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     description: Resets the user's password using a valid token. Both new password and confirm password must match.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token for verifying the password reset request.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               newPassword:
 *                 type: string
 *                 description: The new password to set for the user.
 *                 example: "newPassword123"
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password.
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Successful password reset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful password reset"
 *                 user:
 *                   type: object
 *                   description: User details after password reset.
 *       400:
 *         description: Invalid token or mismatched passwords.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid token"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       409:
 *         description: New password cannot be the same as the old password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Same password entry as old password"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
`;

export const enable2FA = `
/**
 * @swagger
 * /auth/enable-2fa:
 *   post:
 *     summary: Enable Two-Factor Authentication (2FA)
 *     description: Enables 2FA for the user after verifying their password. Returns a secret and auth URL for setting up 2FA.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user enabling 2FA.
 *                 example: "60d21b4667d0d8992e610c85"
 *               password:
 *                 type: string
 *                 description: User's password for authentication.
 *                 example: "userPassword123"
 *     responses:
 *       200:
 *         description: 2FA successfully enabled.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "2FA successfully enabled"
 *                 secret:
 *                   type: string
 *                   description: Base32-encoded 2FA secret.
 *                   example: "JBSWY3DPEHPK3PXP"
 *                 auth_url:
 *                   type: string
 *                   description: Auth URL for setting up 2FA.
 *                   example: "otpauth://totp/Example:username?secret=JBSWY3DPEHPK3PXP&issuer=Example"
 *       400:
 *         description: Bad request, e.g., if the user is already enabled for 2FA or 2FA secret generation fails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is 2fa enabled"
 *       401:
 *         description: Unauthorized, e.g., if the password is invalid or user email is not verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid password"
 *       404:
 *         description: User does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
`;

export const verify2FA = `
/**
 * @swagger
 * /auth/verify-2fa:
 *   post:
 *     summary: Verify Two-Factor Authentication (2FA) Token
 *     description: Verifies the 2FA token provided by the user to authenticate their action.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user for whom the 2FA token is being verified.
 *                 example: "60d21b4667d0d8992e610c85"
 *               token:
 *                 type: string
 *                 description: 2FA token generated by the user's authenticator app.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: 2FA token successfully verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is verified"
 *       400:
 *         description: Bad request, e.g., if the user is not 2FA enabled or if the token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is not 2FA enabled"
 *       404:
 *         description: User does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Could not verify 2FA Token"
 */
`;

export const disable2FA = `
/**
 * @swagger
 * /auth/disable-2fa:
 *   post:
 *     summary: Disable Two-Factor Authentication (2FA)
 *     description: Disables the 2FA for a user after verifying the provided token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user for whom 2FA is being disabled.
 *                 example: "60d21b4667d0d8992e610c85"
 *               token:
 *                 type: string
 *                 description: 2FA token generated by the user's authenticator app.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: 2FA successfully disabled.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully disabled 2fa"
 *       400:
 *         description: Bad request, e.g., if the user is already 2FA disabled or the token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is already 2FA disabled"
 *       404:
 *         description: User does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Could not disable 2FA, try again."
 */
`;
