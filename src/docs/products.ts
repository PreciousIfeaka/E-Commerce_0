export const addProduct = `
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with optional brand and mandatory subcategory.
 *     tags:
 *       - Products
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
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               subcategoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *               images_url:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - description
 *               - price
 *               - quantity
 *               - subcategoryId
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 product:
 *                   type: object
 *       404:
 *         description: Subcategory or brand not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const updateProduct = `
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update product details by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update.
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
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully updated product"
 *                 product:
 *                   type: object
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const deleteProduct = `
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted product"
 *                 product:
 *                   type: object
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const getAProduct = `
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Get product details by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Retrieved product successfully"
 *                 product:
 *                   type: object
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
`;

export const getAllProducts = `
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Get a paginated list of all products with optional filters.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter products by name.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category ID.
 *       - in: query
 *         name: subcategory
 *         schema:
 *           type: string
 *         description: Filter products by subcategory ID.
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter products by brand ID.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter products by minimum price.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter products by maximum price.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page.
 *     responses:
 *       200:
 *         description: Successfully retrieved the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved products"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                 total:
 *                   type: integer
 *                   example: 100
 *       500:
 *         description: Internal server error.
 */
`;
