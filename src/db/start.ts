import mongoose from 'mongoose';
// Mock data
import moviesMockData from './mockData/movies.json';
import genresMockData from './mockData/genres.json';
// Models
import Movie from '../models/Movie';
import Genre from '../models/Genre';

const startDb = (): void => {
  // Connect to MongoDB
  mongoose.connect(
    'mongodb+srv://ulianchenko:a1b2c3d4e5@cluster0.nzybwy4.mongodb.net/dbEPAMNodeJsCourse?retryWrites=true&w=majority'
  )

  const db: mongoose.Connection = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error'));
  db.once('open', async function () {
    console.log('Connected successfully');
    const moviesCount: number = await Movie.estimatedDocumentCount();
    const genresCount: number = await Genre.estimatedDocumentCount();
    if (moviesCount === 0) {
      try {
        await Movie.insertMany(moviesMockData);
        console.log('Movies database was uploaded from mock data');
      } catch (err) {
        console.error('Error uploading movies database from mock data');
      }
    }

    if (genresCount === 0) {
      try {
        await Genre.insertMany(genresMockData);
        console.log('Genres database was uploaded from mock data');
      } catch (err) {
        console.error('Error uploading genres database from mock data');
      }
    }
  });
}

export default startDb;