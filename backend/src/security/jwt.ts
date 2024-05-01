import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
