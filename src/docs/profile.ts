export const getMyProfile = `
/**
 * @swagger
 * /users/profile/me:
 *   get:
 *     summary: Retrieve My Profile
 *     description: Retrieves the profile of a signed-in user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved user profile"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *       404:
 *         description: User with the given ID doesn't exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User of given ID doesn't exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
`;

export const getUserProfile = `
/**
 * @swagger
 * /users/{userId}/profile:
 *   get:
 *     summary: Retrieve User Profile
 *     description: Retrieves the profile of a user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user whose profile is to be retrieved.
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved user profile"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *       404:
 *         description: User with the given ID doesn't exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User of given ID doesn't exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
`;

export const updateMyProfile = `
/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               street_address:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               country:
 *                 type: string
 *               gender:
 *                 type: string
 *             example:
 *               avatar_url: "https://example.com/avatar.jpg"
 *               street_address: "123 Main St"
 *               phone: "123-456-7890"
 *               city: "Anytown"
 *               state: "CA"
 *               zip_code: "90210"
 *               country: "USA"
 *               gender: "female"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   $ref: '#/components/schemas/Profile'
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
`;

export const updateProfilePicture = `
/**
 * @swagger
 * /users/profile/picture:
 *   put:
 *     summary: Update user profile picture
 *     description: Uploads and updates the profile picture for the specified user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: The profile picture file to upload.
 *     responses:
 *       200:
 *         description: Profile picture updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile updated successfully
 *                 profile:
 *                   $ref: '#/components/schemas/Profile'
 *       400:
 *         description: No uploaded file or invalid request.
 *       404:
 *         description: User or profile not found.
 *     examples:
 *       application/json:
 *         message: No uploaded file
 */
`;

export const updatePassword = `
/**
 * @swagger
 * /users/password:
 *   put:
 *     summary: Update user password
 *     description: Allows a user to update their password by providing the old password and confirming the new one.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The user's current password.
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 description: The new password the user wants to set.
 *                 example: "newSecurePassword123"
 *               confirmNewPassword:
 *                 type: string
 *                 description: Confirmation of the new password (must match newPassword).
 *                 example: "newSecurePassword123"
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmNewPassword
 *     responses:
 *       200:
 *         description: Password successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully updated password"
 *       400:
 *         description: Bad request due to incorrect input (e.g., passwords don't match).
 *       404:
 *         description: User not found.
 *       409:
 *         description: Conflict error (e.g., new password matches old password).
 */
`;

export const ProfileSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         avatar_url:
 *           type: string
 *           description: URL of the user's profile picture.
 *           example: "https://example.com/uploads/avatar.jpg"
 *         street_address:
 *           type: string
 *           description: User's street address.
 *           example: "123 Main St"
 *         phone:
 *           type: string
 *           description: User's phone number.
 *           example: "+1234567890"
 *         city:
 *           type: string
 *           description: City of the user.
 *           example: "Lagos"
 *         state:
 *           type: string
 *           description: State or province of the user.
 *           example: "Lagos"
 *         zip_code:
 *           type: string
 *           description: Postal or ZIP code.
 *           example: "100001"
 *         country:
 *           type: string
 *           description: Country of the user.
 *           example: "Nigeria"
 *         gender:
 *           type: string
 *           description: Gender of the user.
 *           enum: [Male, Female, Other]
 *           example: "Male"
 *       required:
 *         - avatar_url
 *         - street_address
 *         - phone
 *         - city
 *         - state
 *         - zip_code
 *         - country
 *         - gender
 */
`;
