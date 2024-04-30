import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { logger } from './logger';

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Discussor API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
  },
  apis: ['**/*.ts'],
});

export function setupSwagger(app: Express) {
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(specs, {
      customSiteTitle: 'Discussor API',
    }),
  );

  logger.info(
    `API docs available at http://localhost:${process.env.PORT}/api-docs`,
  );
}
