import { Request, Response } from 'express';

export async function profileHandler(req: Request, res: Response) {
  const user = req.user!;

  return res.status(200).json({
    username: user.username,
    email: user.email,
  });
}
