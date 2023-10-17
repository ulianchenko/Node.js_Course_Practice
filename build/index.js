"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Swagger options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            title: 'Node.js Course Practice API',
            description: 'API for the Node.js Course Practice project',
            version: '1.0.0',
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Serhii Ulianchenko",
                email: "ulianchenko@gmail.com",
            },
        },
    },
    // API routes
    apis: ['./src/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve Swagger UI at /api-docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of item
 *       example:
 *         name: Best item
 */
// Route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Route for the health-check endpoint
/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check if the server is running
 *     description: Returns a JSON response indicating that the server is running.
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Server is running
 */
app.get('/health-check', (req, res) => {
    res.json({ status: 'Server is running' });
});
// Route for the items
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of items
 *     description: Returns a list of items.
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/items', (req, res) => {
    const items = [
        { id: 1, name: 'Book' },
        { id: 2, name: 'Phone' },
        { id: 2, name: 'Laptop' }
    ];
    res.json(items);
});
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Creates a new item and returns the item object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
app.post('/items', (req, res) => {
    const newItem = {
        id: Date.now(),
        name: req.body.name,
    };
    res.json(newItem);
});
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     description: Deletes item by the specified ID and returns a success message with the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *         schema:
 *           type: integer
 *           default: 333
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    res.json({ message: `Item with ID ${itemId} was deleted successfully` });
});
// Middleware for handling 404 error
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
// Middleware for handling 500 error
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start server on port 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
