import express, { NextFunction, Request, Response } from 'express';
import Movie, { IMovie } from '../models/Movie';
import { validateMovieData, validateMovieId, validateGenreName } from '../utils/movies.validations';

const router = express.Router();

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     description: Creates a new movie and returns the movie object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.post('/movies', validateMovieData, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newMovie: IMovie = await Movie.create(req.body);
    res.json(newMovie);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get a list of movies
 *     tags: [Movies]
 *     description: Returns a list of movies.
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/movies', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movies: IMovie[] = await Movie.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     description: Updates an existing movie and returns the updated movie object.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.put('/movies/:id', validateMovieData, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedMovie: IMovie | null = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     description: Deletes an existing movie.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.delete('/movies/:id', validateMovieId, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedMovie: IMovie | null = await Movie.findByIdAndRemove(req.params.id);
    res.json(deletedMovie);
  } catch (error) {
    // console.log('Error was occured');
    // res.status(500).json(error);
    next(error);
  }
});

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     summary: Search movies by genre
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: genreName
 *         required: true
 *         description: Name of the genre to search for
 *         schema:
 *           type: string
 *           default: Adventure
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/movies/genre/:genreName', validateGenreName, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const genreName: string = req.params.genreName;
    const movies: IMovie[] = await Movie.find({ genre: genreName });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

export default router;