import express, { Request, Response } from 'express';

const router = express.Router();

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
 router.get('/health-check', (req: Request, res: Response): void => {
  res.json({ status: 'Server is running' });
});

export default router;