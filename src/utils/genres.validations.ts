import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';

// Interfaces
interface GenreRequest extends Request {
  body: {
    name: string;
  };
}

interface GenreIdRequest extends Request {
  params: {
    id: string;
  };
}

// Schemas
const GenreSchema = Joi.object({
  name: Joi.string().min(3).max(20).required()
});

const GenreIdSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

// Validation functions
// Genre validation
const validateGenreData = (req: GenreRequest, res: Response, next: NextFunction): Response | void => {
  const { error } = GenreSchema.validate(req.body);
  if (error) {
    console.log('Validation genre error');
    return res.status(400).json({ error: (error as ValidationError).details[0].message });
  }
  next();
};

// Genre ID validation
const validateGenreId = (req: GenreIdRequest, res: Response, next: NextFunction): Response | void => {
  const { error } = GenreIdSchema.validate({ id: req.params.id });
  if (error) {
    console.log('Validation genre id error');
    return res.status(400).json({ error: (error as ValidationError).details[0].message });
  }
  next();
};

export {
  validateGenreData,
  validateGenreId
};