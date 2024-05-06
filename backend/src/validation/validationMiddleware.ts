import { logger } from '@/config/logger';
import { RequestHandler } from 'express';
import Joi from 'joi';

/**
 * Middleware to validate request bodies using Joi schemas.
 */
export function validationMiddleware(schema: Joi.ObjectSchema): RequestHandler {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      logger.error('Validation error.', error.message);
      return res.status(400).json({
        message: error.message,
      });
    }

    req.body = value;
    next();
  };
}
