import  { Document, Model, Schema, model } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
}

const movieSchema: Schema = new Schema<IMovie>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  genre: {
    type: [String],
    required: true
  }
});

const Movie: Model<IMovie> = model<IMovie>('Movie', movieSchema);

export default Movie;