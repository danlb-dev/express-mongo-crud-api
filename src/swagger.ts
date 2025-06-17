import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'express-crud-api-demo',
      version: '1.0.0',
      description: 'A study project demonstrating the use of Node.js, Express, and TypeScript to build a RESTful API.',
    },
  },
  apis: ['src/routes/*.ts']
};

export const specs = swaggerJsDoc(options);