import { UserModel } from '@/models/User';
import { NextFunction, Request, Response } from 'express';
import { TokenPayload, verifyAccessToken } from './jwt';

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Authentication required.');
  }

  let payload: TokenPayload;
  try {
    payload = await verifyAccessToken(token);
  } catch {
    return res.status(401).send('Invalid token.');
  }

  const user = await UserModel.findById(payload.userId);
  if (!user) {
    return res.status(401).send('Invalid token.');
  }

  req.user = user;
  next();
}
