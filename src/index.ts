import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
// Database
import startDb from './db/start';
// Routes
import routes from './routes'
// Swagger
import swaggerSpec from './configs/swagerSpec'

const app = express();
const PORT: number = 3000;

startDb();

// Serve Swagger UI at /api-docs
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(express.json());

app.use(routes);

// Route for the root URL
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

// Middleware for handling 404 error
app.use((req: Request, res: Response): void => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware for handling 500 error
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
  next();
});

// Start server on port 3000
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;