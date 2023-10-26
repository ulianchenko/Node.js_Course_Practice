import swaggerJsDoc, { Options as SwaggerOptions } from 'swagger-jsdoc';

// Swagger options
const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Node.js Course Practice API',
      description: 'API for the Node.js Course Practice project',
      version: '1.0.0',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Serhii Ulianchenko',
        email: 'ulianchenko@gmail.com',
      },
    },
    tags: [
      {
        name: 'Movies',
        description: 'Movies routes'
      },
      {
        name: 'Genres',
        description: 'Genres routes'
      },
      {
        name: 'Items',
        description: 'Items routes'
      }
    ],
    components: {
      schemas: {
        Item: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of item'
            }
          },
          example: {
            name: 'Best item'
          }
        },
        Movie: {
          type: 'object',
          properties: {
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            releaseDate: {
              type: 'string'
            },
            genre: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          },
          example: {
            title: 'Interstellar',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity`s survival.',
            releaseDate: '2014-11-07T12:00:00Z',
            genre: ['Adventure', 'Drama', 'Sci-Fi']
          }
        },
        Genre: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
          },
          example: {
            name: 'Adventure'
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;