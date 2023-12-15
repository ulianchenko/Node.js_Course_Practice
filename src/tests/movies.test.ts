import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Movies API Endpoints', () => {
  let movieId: string;

  it('should create a new movie', async () => {
    const response = await request.post('/movies').send({
      title: 'Some Movie',
      description: 'This movie was created for tests',
      releaseDate: '2023-11-12T12:00:00.000Z',
      genre: ['Action', 'Adventure']
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Some Movie');
    expect(response.body.description).toBe('This movie was created for tests');
    expect(response.body.releaseDate).toBe('2023-11-12T12:00:00.000Z');
    expect(response.body.genre).toEqual(['Action', 'Adventure']);

    // Store the movieId for later use in other tests
    movieId = response.body._id;
  });

  it('should get a list of movies',  async () => {
    const response = await request.get('/movies');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a movie', async () => {
    const response = await request.put(`/movies/${movieId}`).send({
      title: 'Updated Some Movie',
      description: 'Updated some movie description',
      releaseDate: '2023-11-12T12:00:00.000Z',
      genre: ['Action', 'Adventure', 'Sci-Fi']
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Some Movie');
  });

  it('should delete a movie', async () => {
    const response = await request.delete(`/movies/${movieId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(movieId);
  });

  it('should handle validation errors when creating a movie', async () => {
    const response = await request.post('/movies').send({
      // Missing required fields, the empty object was sent
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should handle validation error for movie ID', async () => {

    const response = await request.delete('/movies/333');

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

});


describe('Movies Error Handling', () => {

  it('should handle 404 error', async () => {
    const response = await request.get('/error-route-moviess');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

});


describe('Movies genre search', () => {

  it('should return movies for a valid genre', async () => {
    const response = await request.get('/movies/genre/Adventure');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return an empty array for a non-existent genre', async () => {
    const response = await request.get('/movies/genre/NonExistentGenre');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });

  it('should handle invalid genre name, because its length less then valid min length', async () => {
    const response = await request.get('/movies/genre/33');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should handle invalid genre name, because its length is longer then valid max length', async () => {
    const response = await request.get('/movies/genre/20aa20bb20cc20dd20ee2');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

});

