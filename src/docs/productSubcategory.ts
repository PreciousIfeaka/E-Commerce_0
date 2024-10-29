export const createProductSubcategory = `
/**
 * @swagger
 * /products/categories/subcategories:
 *   post:
 *     summary: Create a new product subcategory
 *     description: Create a new subcategory under a specific category.
 *     tags:
 *       - Product Subcategories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               categoryId:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *               - image_url
 *               - categoryId
 *     responses:
 *       201:
 *         description: Successfully created a new subcategory.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New Subcategory created successfully"
 *                 subcategory:
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
 *         description: The specified category was not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const updateProductSubcategory = `
/**
 * @swagger
 * /products/categories/subcategories/{id}:
 *   put:
 *     summary: Update an existing product subcategory
 *     description: Update the details of a specific subcategory by its ID.
 *     tags:
 *       - Product Subcategories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *               - image_url
 *     responses:
 *       200:
 *         description: Successfully updated the subcategory.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully updated subcategory"
 *                 subcategory:
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
 *         description: The specified subcategory was not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const getSubcategory = `
/**
 * @swagger
 * /products/categories/subcategories/{id}:
 *   get:
 *     summary: Retrieve a specific product subcategory by ID
 *     description: Get details of a specific subcategory.
 *     tags:
 *       - Product Subcategories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the subcategory.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved subcategory"
 *                 subcategory:
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
 *         description: The specified subcategory was not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const getSucategories = `
/**
 * @swagger
 * /products/categories/subcategories:
 *   get:
 *     summary: Retrieve a list of all product subcategories
 *     description: Get a paginated list of subcategories with optional filtering.
 *     tags:
 *       -  Product Subcategories
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter subcategories by name (partial matching).
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter subcategories by category ID.
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
 *         description: The number of subcategories to return per page.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of subcategories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved subcategories."
 *                 subcategories:
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
