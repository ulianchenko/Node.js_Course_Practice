import  { Document, Model, Schema, model } from 'mongoose';

export interface IGenre extends Document {
  name: string;
}

const genreSchema: Schema = new Schema<IGenre>({
  name: {
    type: String,
    required: true
  }
});

const Genre: Model<IGenre> = model<IGenre>('Genre', genreSchema);

export default Genre;