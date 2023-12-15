import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Genres API Endpoints', () => {
  let genreId: string;

  it('should create a new genre', async () => {
    const response = await request.post('/genres').send({
      name: 'Some Genre',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Some Genre');

    // Store the genreId for later use in other tests
    genreId = response.body._id;
  });

  it('should get a list of genres', async () => {
    const response = await request.get('/genres');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a genre', async () => {
    const response = await request.put(`/genres/${genreId}`).send({
      name: 'Updated Some Genre',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Some Genre');
  });

  it('should delete a genre', async () => {
    const response = await request.delete(`/genres/${genreId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(genreId);
  });

  it('should handle validation errors when creating a genre', async () => {
    const response = await request.post('/genres').send({
      // Missing required fields, the empty object was sent
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should handle validation error for genre ID', async () => {

    const response = await request.delete('/genres/333');

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

});
