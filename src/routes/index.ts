import express from 'express';
import healthCheckRoutes from './healthCheck';
import itemsRoutes from './items';
import moviesRoutes from './movies';
import genresRoutes from './genres';

const router = express.Router();

router.use(healthCheckRoutes);
router.use(itemsRoutes);
router.use(moviesRoutes);
router.use(genresRoutes);

export default router;
