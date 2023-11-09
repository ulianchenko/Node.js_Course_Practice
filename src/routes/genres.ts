import express, { NextFunction, Request, Response } from 'express';
import Genre, { IGenre } from '../models/Genre';
import { validateGenreData, validateGenreId } from '../utils/genres.validations';

const router = express.Router();

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     description: Creates a new genre and returns the genre object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 */
router.post('/genres', validateGenreData, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newGenre: IGenre = await Genre.create(req.body);
    res.json(newGenre);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get a list of genres
 *     tags: [Genres]
 *     description: Returns a list of genres.
 *     responses:
 *       200:
 *         description: List of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
router.get('/genres', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const genres: IGenre[] = await Genre.find();
    res.json(genres);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre
 *     tags: [Genres]
 *     description: Updates an existing gebre and returns the updated genre object.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the genre to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 */
router.put('/genres/:id', validateGenreData, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedGenre: IGenre | null = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGenre);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete a genre
 *     tags: [Genres]
 *     description: Deletes an existing genre.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the genre to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 */
router.delete('/genres/:id', validateGenreId, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedGenre: IGenre | null = await Genre.findByIdAndRemove(req.params.id);
    res.json(deletedGenre);
  } catch (error) {
    next(error);
  }
});

export default router;