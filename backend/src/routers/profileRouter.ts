import { profileHandler } from '@/controllers/profileController';
import { verifyToken } from '@/security/middleware';
import { Router } from 'express';

export const profileRouter = Router();

profileRouter.get('/profile', verifyToken, profileHandler);
