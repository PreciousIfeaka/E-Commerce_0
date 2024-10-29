export const createProductCategory = `
/**
 * @swagger
 * /products/categories:
 *   post:
 *     summary: Create a new product category
 *     description: Adds a new category to the system with details like name, description, and image URL.
 *     tags:
 *       - Product Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image_url
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: Brief description of the category
 *                 example: Gadgets and devices
 *               image_url:
 *                 type: string
 *                 description: URL of the category image
 *                 example: https://example.com/images/electronics.jpg
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Electronics category created successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Electronics
 *                     description:
 *                       type: string
 *                       example: Gadgets and devices
 *                     image_url:
 *                       type: string
 *                       example: https://example.com/images/electronics.jpg
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Could not create category, try again
 */`;

export const updateProductCategory = `
 /**
 * @swagger
 * /products/categories/{id}:
 *   put:
 *     summary: Update an existing product category
 *     description: Updates the details of an existing category by ID.
 *     tags:
 *       - Product Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image_url
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category.
 *               description:
 *                 type: string
 *                 description: Description of the category.
 *               image_url:
 *                 type: string
 *                 description: Image URL for the category.
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category - Electronics successfully updated."
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     image_url:
 *                       type: string
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const getCategory = `
/**
 * @swagger
 * /products/categories/{id}:
 *   get:
 *     summary: Get a category by its ID
 *     description: Retrieve a specific category using its unique ID.
 *     tags:
 *       - Product Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve.
 *     responses:
 *       200:
 *         description: Category retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category Electronics retrieved successfully."
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     image_url:
 *                       type: string
 *       404:
 *         description: Category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category with id: 123 does not exist."
 *       500:
 *         description: Internal server error.
 */
`;

export const getAllCategories = `
/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Retrieve a list of all categories with optional filtering
 *     description: Get a paginated list of categories. You can filter by name using a query parameter.
 *     tags:
 *       - Product Categories
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter categories by name (partial matching).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of categories to return per page.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved categories."
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image_url:
 *                         type: string
 *                 total:
 *                   type: integer
 *                   example: 25
 *       500:
 *         description: Internal server error.
 */
`;
