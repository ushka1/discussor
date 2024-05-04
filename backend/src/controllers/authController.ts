import { logger } from '@/config/logger';
import { UserModel } from '@/models/User';
import { generateAccessToken } from '@/security/jwt';
import { LoginBody, RegisterBody } from '@/validation/authValidation';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export async function registerHandler(req: Request, res: Response) {
  logger.info('register handler');

  try {
    const { username, email, password } = req.body as RegisterBody;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await generateAccessToken({ userId: user.id });
    res.status(200).json({ token });
  } catch (err) {
    logger.error(err);

    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function loginHandler(req: Request, res: Response) {
  logger.info('login handler');

  try {
    const { email, password } = req.body as LoginBody;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await generateAccessToken({ userId: user.id });
    res.status(200).json({ token });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
