import express, { Request, Response } from 'express';
import swaggerJsDoc, { Options as SwaggerOptions } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bp from 'body-parser';

const app = express();
const PORT: number = 3000;

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// Swagger options
const swaggerOptions: SwaggerOptions = {
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

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

interface Item {
  id: number;
  name: string;
}

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
app.get('/', (req: Request, res: Response): void => {
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
app.get('/health-check', (req: Request, res: Response): void => {
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
 app.get('/items', (req: Request, res: Response): void => {
  const items: Item[] = [
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
 app.post('/items', (req: Request, res: Response): void => {
  const newItem: Item = {
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
 app.delete('/items/:id', (req: Request, res: Response): void => {
  const itemId: number = parseInt(req.params.id);

  res.json({ message: `Item with ID ${itemId} was deleted successfully` });
});

// Middleware for handling 404 error
app.use((req: Request, res: Response): void => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware for handling 500 error
app.use((err: Error, req: Request, res: Response): void => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server on port 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});