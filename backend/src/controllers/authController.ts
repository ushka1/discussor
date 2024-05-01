import { UserModel } from '@/models/User';
import { LoginBody, RegisterBody } from '@/validation/authValidation';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export async function registerHandler(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body as RegisterBody;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function loginHandler(req: Request, res: Response) {
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

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
