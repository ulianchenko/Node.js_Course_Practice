import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';

// Interfaces
interface MovieRequest extends Request {
  body: {
    title: string;
    description: string;
    releaseDate: string;
    genre: string[];
  };
}

interface MovieIdRequest extends Request {
  params: {
    id: string;
  };
}

interface GenreRequest extends Request {
  params: {
    genreName: string;
  };
}

// Schemas
const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseDate: Joi.date().required(),
  genre: Joi.array().items(Joi.string()).required(),
});

const movieIdSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const genreSchema = Joi.object({
  genreName: Joi.string().min(3).max(20).required(),
});


// Validation functions
// Movie validation
const validateMovieData = (req: MovieRequest, res: Response, next: NextFunction): Response | void => {
  const { error } = movieSchema.validate(req.body);
  if (error) {
    console.log('Validation movie error');
    return res.status(400).json({ error: (error as ValidationError).details[0].message });
  }
  next();
};

// Movie ID validation
const validateMovieId = (req: MovieIdRequest, res: Response, next: NextFunction): Response | void => {
  const { error } = movieIdSchema.validate({ id: req.params.id });
  if (error) {
    console.log('Validation movie id error');
    return res.status(400).json({ error: (error as ValidationError).details[0].message });
  }
  next();
};

// Movie genre validation
const validateGenreName = (req: GenreRequest, res: Response, next: NextFunction): Response | void => {
  const { error } = genreSchema.validate({ genreName: req.params.genreName });
  if (error) {
    console.log('Validation movie genre error');
    return res.status(400).json({ error: (error as ValidationError).details[0].message });
  }
  next();
};

export {
  validateMovieData,
  validateMovieId,
  validateGenreName
};