import express, { Request, Response } from 'express';

const router = express.Router();

interface Item {
  id: number;
  name: string;
}

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of items
 *     tags: [Items]
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
router.get('/items', (req: Request, res: Response): void => {
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
 *     tags: [Items]
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
router.post('/items', (req: Request, res: Response): void => {
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
 *     tags: [Items]
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
router.delete('/items/:id', (req: Request, res: Response): void => {
  const itemId: number = parseInt(req.params.id);

  res.json({ message: `Item with ID ${itemId} was deleted successfully` });
});

export default router;