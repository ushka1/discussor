import { logger } from '@/config/logger';
import { UserModel } from '@/models/User';
import { NextFunction, Request, Response } from 'express';
import { TokenPayload, verifyAccessToken } from './tokenUtils';

/**
 * Middleware to check if the user is authenticated.
 */
export async function securityMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    logger.error('No token provided.');
    return res.status(401).send('Authentication required.');
  }

  let payload: TokenPayload;
  try {
    payload = await verifyAccessToken(token);
  } catch {
    logger.error('Invalid token.');
    return res.status(401).send('Authentication required.');
  }

  const user = await UserModel.findById(payload.userId);
  if (!user) {
    logger.error('User not found.');
    return res.status(401).send('Authentication required.');
  }

  req.user = user;
  next();
}
